#!/usr/bin/env bash
###############################################################################
readonly script_name='Fixit OpenAPI Types Codegen'
readonly script_filename="$(basename "${BASH_SOURCE[0]}")"

# Script constants:
readonly remote_schema='Nerdware/Fixit'
readonly types_output='src/types/__codegen__/open-api.ts'

readonly script_help="
SCRIPT:	$script_name

	This script creates TypeScript types from the Fixit OpenAPI schema.
	The production version of the schema is used by default.

	Schema Input:  https://app.swaggerhub.com/apis/Nerdware/Fixit
	Types Output:  $types_output

USAGE:  scripts/$script_filename [OPTIONS]

OPTIONS:
	--version=     The OpenAPI schema version to use. If not provided, this
	               defaults to the version marked 'default' on SwaggerHub,
	               which is the production schema version. A list of schema
	               versions is available on SwaggerHub (link above).
	--debug	       Prevent removal of temporary files on exit (default: false).
	-h, --help     Display this help message and exit.
"
###############################################################################
# PARSE SCRIPT ARGS/OPTIONS

# If a 'help' flag was provided, log the help message and exit
[[ "${*}" =~ (-h|help) ]] && echo "$script_help" && exit 0

readonly debug="$([[ "${*}" == *--debug* ]] && echo true || echo false)"

readonly version_arg="$(grep -oPm1 '(?<=--version(=|\s))\S+' <<<"$*")"
readonly remote_schema_ref="$(
	[ -n "$version_arg" ] && echo "$remote_schema/$version_arg" || echo "$remote_schema"
)"

###############################################################################
# UTIL FUNCTIONS

# log_info: print args to stdout (ANSI: \e[96m is light-cyan text, \e[0m is reset)
function log_info() { printf '\e[96m%b\e[0m\n' "${@}"; }

# throw_error: print err-msg args to stdout+stderr and exit (ANSI: \e[31m is red text)
function throw_error() {
	printf >&2 '\e[31m%b\e[0m\n' "🚨 ERROR: $1" "${@:2}" '(EXIT 1)'
	exit 1
}

###############################################################################
# SCRIPT ACTION FUNCTIONS

function ensure_npx_cmd_is_present() {
	if ! type npx 1>/dev/null; then
		# Try invoking `nvm` to make it available
		type nvm 1>/dev/null && nvm use 1>/dev/null
		# If `npx` is still not available, throw an error
		! type npx && throw_error 'Unable to fetch the OpenAPI schema — npx command not found.'
	fi
}

function setup_tmp_dir() {
	# Global vars:
	readonly tmp_dir="$(basename "$(
		mktemp --tmpdir="$PWD" -d "tmp.${script_filename%.sh}.XXX" ||
			throw_error 'Failed to create temporary directory.'
	)")"

	# TRAP: on EXIT, remove the tmp dir unless --debug flag is present
	function rm_tmp_unless_debug() {
		if [ "$debug" == 'true' ]; then
			log_info "[DEBUG MODE]: Not removing temporary directory \e[0m$tmp_dir"
		else
			rm -rf "$tmp_dir"
		fi
	}

	trap rm_tmp_unless_debug EXIT
}

function fetch_openapi_schema() {
	log_info "Fetching OpenAPI schema '\e[0m$remote_schema_ref\e[96m' ..."

	# Global vars:
	readonly schema_file="$tmp_dir/open-api-schema.yaml"

	# Fetch the schema
	npx swaggerhub api:get "$remote_schema_ref" >"$schema_file"

	# Ensure the file exists as expected
	[ ! -f "$schema_file" ] && throw_error 'Failed to download the OpenAPI schema.'

	log_info "OpenAPI schema '\e[0m$remote_schema_ref\e[96m' written to file: \e[0m$schema_file"
	log_info 'OpenAPI schema fetched successfully! 🚀\n'
}

function generate_openapi_ts_types() {
	log_info 'Generating OpenAPI TypeScript types ...'

	local schema_file_version="$(grep -oPm1 '(?<=version:\s)[a-zA-Z0-9.-]+' "$schema_file")"

	# Update OpenAPI types using NodeJS API from openapi-typescript to fix `Date` types.
	# (Their CLI does not convert `format: date-time` values to `Date` types)

	node --input-type=module -e "
		import fs from 'node:fs';
		import ts from 'typescript';
		import openapiTS, { astToString } from 'openapi-typescript';

		const DATE = ts.factory.createIdentifier('Date');
		const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull());

		const ast = await openapiTS(
			new URL('file://$PWD/$schema_file'),
			{
				transform(schemaObject, metadata) {
					if (schemaObject.format === 'date-time') {
						return Array.isArray(schemaObject.type) && schemaObject.type.includes('null')
							? ts.factory.createUnionTypeNode([DATE, NULL])
							: DATE;
					}
				},
			}
		);

		const tsFileContents = \`\
		/**
		 * Fixit OpenAPI Schema Types
		 *
		 * DO NOT MAKE DIRECT CHANGES TO THIS FILE.
		 *
		 * This file was auto-generated using schema version: \\\`$schema_file_version\\\`
		 */

		\${astToString(ast)}
		\`.replaceAll(/^\t{0,2}/gm, ''); // <-- Removes leading tabs

		fs.writeFileSync('$types_output', tsFileContents);"

	[ $? != 0 ] && throw_error 'Failed to generate OpenAPI TypeScript types.'

	log_info 'OpenAPI TypeScript types generated successfully! 🚀'
}

###############################################################################
# SCRIPT EXECUTION

log_info "\n[Starting Script: $script_name]\n"

ensure_npx_cmd_is_present
setup_tmp_dir
fetch_openapi_schema
generate_openapi_ts_types

###############################################################################
