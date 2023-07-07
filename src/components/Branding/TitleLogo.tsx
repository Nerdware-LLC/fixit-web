import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { Logo } from "./Logo";

export const TitleLogo = ({ onClick, ...containerProps }: TitleLogoProps) => (
  <StyledDiv
    className={`${titleLogoClassNames.root} ${titleLogoClassNames.container}`}
    onClick={onClick}
    {...containerProps}
  >
    <Logo className={titleLogoClassNames.logoImg} />
    <Text className={titleLogoClassNames.logoText} variant="h1">
      Fixit
    </Text>
  </StyledDiv>
);

export const titleLogoClassNames = {
  root: "title-logo",
  container: "title-logo-container",
  logoImg: "title-logo-img",
  logoText: "title-logo-text",
};

const StyledDiv = styled("div")(({ onClick }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  verticalAlign: "middle",

  [`& > .${titleLogoClassNames.logoText}`]: {
    margin: 0,
    fontSize: "3rem",
    lineHeight: "1.5rem",
  },

  ...(onClick && {
    "&:hover": {
      cursor: "pointer",
    },
  }),
}));

export type TitleLogoProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
} & React.ComponentProps<typeof StyledDiv>;
