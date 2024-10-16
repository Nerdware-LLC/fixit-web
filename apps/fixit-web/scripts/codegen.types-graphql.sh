#!/usr/bin/env bash
###############################################################################
readonly script_name='Fixit GraphQL Types Codegen'
readonly script_filename="$(basename "${BASH_SOURCE[0]}")"

# Script constants:
readonly graph_name='fixit'
readonly default_variant='current'
readonly tmp_schema_file='schema.graphql' # no `mktemp`, gql-codegen looks in pwd

readonly script_help="
SCRIPT:	$script_name

	This script creates TypeScript types from the Fixit GraphQL schema.
	The '$default_variant' variant of the schema is used by default.

USAGE:  scripts/$script_filename [OPTIONS]

OPTIONS:
	--variant=     The graph variant to use when validating the schema. Must
	               be one of 'prod', 'staging', or 'current' (default: '$default_variant').
	--debug        Prevent removal of temporary files on exit (default: false).
	-h, --help     Display this help message and exit.
"
###############################################################################
# PARSE SCRIPT ARGS/OPTIONS

# If a 'help' flag was provided, log the help message and exit
[[ "${*}" =~ (-h|help) ]] && echo "$script_help" && exit 0

readonly debug="$([[ "${*}" == *--debug* ]] && echo true || echo false)"

readonly variant_arg="$(grep -oPm1 '(?<=--variant(=|\s))\S+' <<<"$*")"
readonly variant="${variant_arg:-$default_variant}"

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

function ensure_graph_ref_is_valid() {
	if [[ ! "$variant" =~ ^(prod|staging|current)$ ]]; then
		throw_error "Invalid --variant value. Must be one of 'prod', 'staging', or 'current'."
	fi

	# If variant is valid, set global var 'graph_ref'
	readonly graph_ref="$graph_name@$variant"
}

function ensure_npx_cmd_is_present() {
	if ! type npx 1>/dev/null; then
		# Try invoking `nvm` to make it available
		type nvm 1>/dev/null && nvm use 1>/dev/null
		# If `npx` is still not available, throw an error
		! type npx && throw_error 'Unable to fetch the GraphQL schema — npx command not found.'
	fi
}

function setup_tmp_trap() {
	# TRAP: on EXIT, remove tmp_schema_file unless --debug flag is present
	function rm_tmp_unless_debug() {
		if [ "$debug" == 'true' ]; then
			log_info "[DEBUG MODE]: Not removing temporary file \e[0m$tmp_schema_file"
		else
			rm "$tmp_schema_file"
		fi
	}

	trap rm_tmp_unless_debug EXIT
}

function fetch_graphql_schema() {
	log_info "Fetching GraphQL schema '\e[0m$graph_ref\e[96m' ..."

	# Fetch the schema (rover pipes the SDL to stdout, log output to stderr)
	npx rover graph fetch "$graph_ref" 1>"$tmp_schema_file" 2>/dev/null

	# Ensure the file exists as expected
	[ ! -f "$tmp_schema_file" ] && throw_error 'Failed to download the GraphQL schema.'

	log_info "GraphQL schema '\e[0m$graph_ref\e[96m' written to file: \e[0m$tmp_schema_file"
	log_info 'GraphQL schema fetched successfully! 🚀\n'
}

function generate_graphql_ts_types() {
	log_info 'Generating GraphQL TypeScript types ...'

	if npx graphql-codegen-esm --config codegen.ts; then
		log_info 'GraphQL TypeScript types generated successfully! 🚀'
	else
		throw_error 'Failed to generate GraphQL TypeScript types.'
	fi
}

###############################################################################
# SCRIPT EXECUTION

log_info "\n[Starting Script: $script_name]\n"

ensure_graph_ref_is_valid
ensure_npx_cmd_is_present
setup_tmp_trap
fetch_graphql_schema
generate_graphql_ts_types

###############################################################################
