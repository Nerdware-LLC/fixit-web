import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { usePageLayoutContext } from "@app";
import { FetchStateContextWrapper, TitleLogo } from "@components";

/**
 * Layout used by `RegisterPage` and `LoginPage`.
 *
 * HTML Classes:
 * - `"auth-page-layout-container"`
 * - `"auth-page-header"`
 * - `"auth-page-header-title"`
 * - `"auth-page-content-container"`
 */
export const AuthPageLayout = ({
  pageTitle,
  children,
  ...containerProps // rest props go to AuthPageLayoutContainer
}: {
  pageTitle: string;
} & React.ComponentProps<typeof AuthPageLayoutContainer>) => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <FetchStateContextWrapper>
      <AuthPageLayoutContainer className="auth-page-layout-container" {...containerProps}>
        <div className="auth-page-header">
          {!isMobilePageLayout && <TitleLogo />}
          <Text variant="h1" className="auth-page-header-title">
            {pageTitle}
          </Text>
        </div>
        <div className="auth-page-content-container">{children}</div>
      </AuthPageLayoutContainer>
    </FetchStateContextWrapper>
  );
};

const AuthPageLayoutContainer = styled("div")({
  height: "100%",
  width: "100%",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",

  "& > div.auth-page-header": {
    margin: "clamp(2rem, 10%, 5rem) 0",

    "& > div.title-logo-container": {
      justifyContent: "center",
      marginBottom: "1.5rem",
      "& > .title-logo-img": {
        width: "7.5rem",
        marginRight: "1rem",
        background: "white",
        clipPath: "circle(49%)"
      },
      "& > .title-logo-text": {
        fontSize: "3.5rem"
      }
    },

    "& > .auth-page-header-title": {
      fontSize: "2.25rem",
      fontWeight: 500
    }
  },

  "& > div.auth-page-content-container": {
    width: "clamp(18rem, 35vw, 26rem)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",

    "& button": {
      borderRadius: "1.5rem"
    }
  }
});
