import { styled } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { LegalLinks, type LegalLinksProps } from "./LegalLinks.jsx";
import { navigationClassNames } from "./classNames.js";

export type LegalLinksFooterProps = LegalLinksProps;

export const LegalLinksFooter = ({ useLongLabels = true, ...divProps }: LegalLinksFooterProps) => (
  <StyledDiv className={navigationClassNames.legalLinksFooterRoot} {...divProps}>
    <LegalLinks useLongLabels={useLongLabels} />
    <Text
      variant="body2"
      sx={{
        fontSize: "0.9rem",
        "& > span": {
          whiteSpace: "nowrap",
        },
      }}
    >
      <span>Fixit is a product of</span> <span>Nerdware, LLC ©</span>
    </Text>
  </StyledDiv>
);

const StyledDiv = styled("div")(({ theme: { palette, breakpoints } }) => ({
  bottom: 0, // Positions are set for easier positioning when given `position:absolute`
  left: 0,
  right: 0,
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  gap: "1.5rem",
  padding: "2rem 0",
  borderTop: `1px solid ${palette.divider}`,
  boxShadow: `0 0 0.5rem ${palette.divider}`,

  // sm = 600px
  [breakpoints.down("sm")]: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 0,
    padding: "1.5rem 0",

    [`& > .${navigationClassNames.legalLinksRoot}`]: {
      fontSize: "0.9rem",
      flexDirection: "column",
      "& hr": { display: "none" },
    },

    // This causes the "Fixit is ..." text to wrap
    [`& > .${typographyClasses.root}`]: { width: "min-content" },
  },
}));
