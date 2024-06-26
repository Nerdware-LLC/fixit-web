import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { Logo } from "./Logo.jsx";
import { brandingClassNames } from "./classNames.js";

export const TitleLogo = ({
  size = "3rem",
  onClick,
  style: containerStyle = {},
  logoStyle = {},
  textStyle = {},
  ...divProps
}: TitleLogoProps) => (
  <StyledDiv
    onClick={onClick}
    className={brandingClassNames.titleLogoRoot}
    style={{ fontSize: size, ...containerStyle }}
    {...divProps}
  >
    <Logo style={logoStyle} className={brandingClassNames.titleLogoImg} />
    <Text
      variant="h1"
      style={{ fontSize: size, ...textStyle }}
      className={brandingClassNames.titleLogoText}
    >
      Fixit
    </Text>
  </StyledDiv>
);

const StyledDiv = styled("div")(({ onClick }) => ({
  width: "min-content",
  height: "5.5rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",

  // gap uses 'ch' units in order to scale relative to fontSize in this div
  gap: "0.5ch",
  fontSize: "3rem",

  [`& > .${brandingClassNames.titleLogoText}`]: {
    fontSize: "inherit !important", // For proper scaling, this must be set to 'inherit'
    margin: 0,
  },

  ...(onClick && {
    "&:hover": {
      cursor: "pointer",
    },
  }),
}));

export type TitleLogoProps = {
  size?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  logoStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
} & Omit<React.ComponentProps<typeof StyledDiv>, "children" | "className">;
