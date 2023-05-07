import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { Anchor } from "@components/Navigation/Anchor";

/**
 * Legal policy table of contents.
 */
export const PolicyToC = ({
  header = "TABLE OF CONTENTS",
  headerID = "toc",
  policySections,
}: {
  header?: string;
  headerID?: string;
  policySections: Record<string, { HREF: string; ID?: string }>;
}) => {
  const policySectionEntries = Object.entries(policySections);

  return (
    <>
      <Text id={headerID} variant="h4" component="h3" style={{ marginTop: "1rem" }}>
        {header}
      </Text>
      <div>
        <StyledOL listlength={policySectionEntries.length}>
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

const StyledOL = styled("ol", {
  shouldForwardProp: (propName) => propName !== "listlength",
})<{ listlength: number }>(({ listlength }) => ({
  ...(listlength >= 20 && {
    "@media (min-width: 800px)": { columnCount: 2 },
  }),
  ...(listlength >= 30 && {
    "@media (min-width: 1400px)": { columnCount: 3 },
  }),

  lineHeight: "1.75rem",

  // The below style ensures ::marker pseudo-elements are aligned with first line of <li> text
  "& li > *": {
    verticalAlign: "top",
  },
}));
