import { RegisterForm } from "./RegisterForm";
import { FetchStateContextWrapper, TitleLogo } from "../../components";

/**
 * **RegisterPage**
 * - `Outlet` of `LandingAndAuthPagesLayout`
 * - Renders when path is "/register"
 */
export const RegisterPage = () => (
  <FetchStateContextWrapper>
    <div>
      <TitleLogo />
      <h1>User Registration</h1>
    </div>
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          justifyItems: "space-evenly",
          placeSelf: "center",
          height: "35vh",
          width: "25vw",
          margin: "auto"
        }}
      >
        <RegisterForm />
      </div>
    </div>
  </FetchStateContextWrapper>
);
