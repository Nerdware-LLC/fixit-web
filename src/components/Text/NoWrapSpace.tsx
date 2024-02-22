/**
 * Use this component to add a non-breaking space that will not wrap to a new line.
 *
 * ```tsx
 * // Example:
 * <p>
 *   This text will wrap as needed, but the last word will "stick" to the HelpInfoIcon
 *   <NoWrapSpace />
 *   <HelpInfoIcon
 *     tooltip="This icon will never be orphaned onto its own line all alone - huzzah!🎉"
 *   />
 * </p>
 * ```
 */
export const NoWrapSpace = () => (
  <span
    style={{
      fontSize: "inherit",
      fontWeight: "inherit",
      lineHeight: "inherit",
      whiteSpace: "nowrap", // <-- Not necessary per se, but conveys intent in stylesheets.
    }}
  >
    {NON_BREAKING_SPACE_CHAR}
  </span>
);

/**
 * A non-breaking space character. @see https://www.ascii-code.com/character/nbsp
 */
export const NON_BREAKING_SPACE_CHAR = "\u00a0";
