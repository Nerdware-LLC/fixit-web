import Box from "@mui/material/Box";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "@/components/Navigation";
import { AuthPageLayout, authPageLayoutClassNames } from "@/layouts/AuthPageLayout";
import { APP_PATHS } from "@/routes/appPaths";
import { LoginForm } from "./LoginForm";

/**
 * **LoginPage** - renders when path is "/login"
 */
export const LoginPage = () => (
  <AuthPageLayout
    pageTitle="User Login"
    sx={{
      [`&.${authPageLayoutClassNames.root}`]: {
        justifyContent: "center",
        gap: "1.5rem",
      },
    }}
  >
    <LoginForm />
    <Box
      style={{
        marginTop: "0.5rem",
        whiteSpace: "pre-line",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Link to={APP_PATHS.REGISTER}>Not an existing user? Sign up now </Link>
      <ChevronRightIcon color="info" style={{ transform: "translateY(1px)" }} />
    </Box>
  </AuthPageLayout>
);

// Exported as "Component" for react-router-dom lazy loading
export const Component = LoginPage;
