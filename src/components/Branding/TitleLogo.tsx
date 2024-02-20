import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { Logo } from "./Logo";
import { brandingClassNames } from "./classNames";

export const TitleLogo = ({
  onClick,
  logoStyle = {},
  textStyle = {},
  ...divProps
}: TitleLogoProps) => (
  <StyledDiv onClick={onClick} className={brandingClassNames.titleLogoRoot} {...divProps}>
    <Logo className={brandingClassNames.titleLogoImg} style={logoStyle} />
    <Text variant="h1" className={brandingClassNames.titleLogoText} style={textStyle}>
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
  gap: "0.5rem",

  [`& > .${brandingClassNames.titleLogoText}`]: {
    margin: 0,
    fontSize: "3rem",
  },

  ...(onClick && {
    "&:hover": {
      cursor: "pointer",
    },
  }),
}));

export type TitleLogoProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  logoStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
} & Omit<React.ComponentProps<typeof StyledDiv>, "children" | "className">;
