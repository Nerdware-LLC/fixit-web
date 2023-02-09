import Text from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Logo } from "./Logo";

export const TitleLogo = ({
  onClick,
  ...containerProps
}: {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
} & React.ComponentProps<typeof TitleLogoContainer>) => (
  <TitleLogoContainer
    className="title-logo title-logo-container"
    onClick={onClick}
    {...containerProps}
  >
    <Logo className="title-logo-img" />
    <Text className="title-logo-text" variant="h1">
      Fixit
    </Text>
  </TitleLogoContainer>
);

const TitleLogoContainer = styled("div")(({ onClick }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  verticalAlign: "middle",
  ...(onClick && {
    "&:hover": {
      cursor: "pointer"
    }
  }),
  "& > .title-logo-text": {
    margin: 0,
    fontSize: "3rem",
    lineHeight: "1.5rem"
  }
}));
