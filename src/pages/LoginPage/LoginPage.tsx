import Stack from "@mui/material/Stack";
import { svgIconClasses } from "@mui/material/SvgIcon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "@/components/Navigation";
import { AuthPageLayout } from "@/layouts/AuthPageLayout";
import { APP_PATHS } from "@/routes/appPaths.js";
import { LoginForm } from "./LoginForm.jsx";

/**
 * **LoginPage** - renders when path is "/login"
 */
export const LoginPage = () => (
  <AuthPageLayout pageTitle="User Login">
    <LoginForm />
    <Stack
      spacing={1}
      sx={{
        alignItems: "center",
        "& *": {
          color: "info.main",
          whiteSpace: "pre-line",
        },
        [`& .${svgIconClasses.root}`]: {
          transform: "translateY(1px)",
        },
      }}
    >
      <Link to={APP_PATHS.FORGOT_PASSWORD}>
        Forgot Password <ChevronRightIcon />
      </Link>
      <Link to={APP_PATHS.REGISTER}>
        Not an existing user? Sign up now <ChevronRightIcon />
      </Link>
    </Stack>
  </AuthPageLayout>
);

// Exported as "Component" for react-router-dom lazy loading
export const Component = LoginPage;
