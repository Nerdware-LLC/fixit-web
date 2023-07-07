import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { TitleLogo, titleLogoClassNames } from "@components/Branding/TitleLogo";
import { FetchStateContextWrapper } from "@components/Indicators/FetchStateContextWrapper";
import { authPageLayoutClassNames as classNames } from "./classNames";

/**
 * Layout used by `RegisterPage` and `LoginPage`.
 */
export const AuthPageLayout = ({
  pageTitle,
  children,
  ...containerProps // rest props go to AuthPageLayoutContainer
}: AuthPageLayoutProps) => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <FetchStateContextWrapper>
      <StyledDiv className={classNames.root} {...containerProps}>
        <div className={classNames.header}>
          {!isMobilePageLayout && <TitleLogo />}
          <Text variant="h1" className={classNames.headerTitle}>
            {pageTitle}
          </Text>
        </div>
        <div className={classNames.childrenContainer}>{children}</div>
      </StyledDiv>
    </FetchStateContextWrapper>
  );
};

const StyledDiv = styled("div")({
  height: "100%",
  width: "100%",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",

  [`& > .${classNames.header}`]: {
    margin: "clamp(2rem, 10%, 5rem) 0",

    [`& > .${titleLogoClassNames.container}`]: {
      justifyContent: "center",
      marginBottom: "1.5rem",
      [`& > .${titleLogoClassNames.logoImg}`]: {
        width: "7.5rem",
        marginRight: "1rem",
        background: "white",
        clipPath: "circle(49%)",
      },
      [`& > .${titleLogoClassNames.logoText}`]: {
        fontSize: "3.5rem",
      },
    },

    [`& > .${classNames.headerTitle}`]: {
      fontSize: "2.25rem",
      fontWeight: 500,
    },
  },

  [`& > .${classNames.childrenContainer}`]: {
    width: "clamp(18rem, 35vw, 26rem)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",

    "& button": {
      borderRadius: "1.5rem",
    },
  },
});

export type AuthPageLayoutProps = { pageTitle: string } & React.ComponentProps<typeof StyledDiv>;
