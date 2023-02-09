import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { AnchorLink } from "@components";

/**
 * Legal policy table of contents.
 */
export const PolicyToC = ({
  header = "TABLE OF CONTENTS",
  headerID = "toc",
  policySections
}: {
  header?: string;
  headerID?: string;
  policySections: Record<string, { HREF: string; ID?: string }>;
}) => {
  const policySectionEntries = Object.entries(policySections);

  return (
    <>
      <Text id={headerID} variant="h4" component="h3">
        {header}
      </Text>
      <div>
        <StyledOL listlength={policySectionEntries.length}>
          {policySectionEntries.map(([header, { HREF, ID }]) => (
            <li key={`ToC:${ID ?? HREF.slice(1)}`}>
              <AnchorLink href={HREF}>{header}</AnchorLink>
            </li>
          ))}
        </StyledOL>
      </div>
    </>
  );
};

const StyledOL = styled("ol")<{ listlength: number }>(({ listlength }) => ({
  ...(listlength >= 20 && {
    "@media (min-width: 800px)": { columnCount: 2 }
  }),
  ...(listlength >= 30 && {
    "@media (min-width: 1400px)": { columnCount: 3 }
  })
}));
