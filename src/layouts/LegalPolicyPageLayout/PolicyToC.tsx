import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { THEMES } from "@/app/ThemeProvider/themes";
import { Anchor } from "@/components/Navigation/Anchor";

/**
 * Legal policy table of contents.
 */
export const PolicyToC = ({
  header = "TABLE OF CONTENTS",
  headerID = "toc",
  policySections,
}: PolicyToCProps) => {
  const policySectionEntries = Object.entries(policySections);

  return (
    <>
      <Text
        id={headerID}
        variant="h4"
        component="h3"
        style={{
          marginTop: "1rem",
          backgroundColor: THEMES.DARK.palette.background.paper, // dark bg "bar" behind text
          color: THEMES.DARK.palette.text.primary, // dark-mode text color for ToC header
          paddingLeft: "0.5rem", // inset text from left edge of the "bar"
          fontWeight: "lighter",
        }}
      >
        {header}
      </Text>
      <div>
        <StyledOL>
          {policySectionEntries.map(([header, { HREF, ID }]) => (
            <li key={`ToC:${ID ?? HREF.slice(1)}`}>
              <Anchor href={HREF}>{header}</Anchor>
            </li>
          ))}
        </StyledOL>
      </div>
    </>
  );
};

const StyledOL = styled("ol")(({ theme: { breakpoints } }) => ({
  width: "fit-content",

  columnGap: "2rem",
  // TWO columns when viewport-width > 600px
  [breakpoints.up("sm")]: { columnCount: 2 },
  // THREE columns when viewport-width > 1000px
  [breakpoints.up(1000)]: { columnCount: 3 },

  paddingInlineStart: "2rem",
  /* Note: `paddingInlineStart` is where the <li>'s CONTENT starts, which does not
  include the ::marker pseudo-el when `list-style-position` is "outside" (default).*/
  listStyleType: "square",

  "& > li > *": {
    verticalAlign: "top", // <-- ensures ::marker pseudo-els are aligned with <li> text
  },
}));

export type PolicyToCProps = {
  header?: string;
  headerID?: string;
  policySections: Record<string, { HREF: string; ID?: string }>;
};
