/**
 * Converts a stringified SVG into a UTF-8 data URL that can be used as a CSS background-image.
 *
 * @param stringifiedSVG A string representation of a valid SVG
 * @returns A data URL that can be used as a CSS background-image
 *
 * @example
 * ```ts
 * // EXAMPLE USAGE:
 * import { styled } from "@mui/material/styles";
 * // This styled div will have a white circle as its background:
 * const StyledDiv = styled("div")({
 *   backgroundImage: getInlineSvgDataUrl(
 *     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
 *        <circle cx="5" cy="5" r="5" fill="white" />
 *      </svg>`
 *   );
 * });
 * ```
 */
export const getInlineSvgDataUrl = (stringifiedSVG: string): string => {
  return `url(data:image/svg+xml;utf8,${encodeURIComponent(stringifiedSVG)})`;
};
