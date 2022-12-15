import { RegisterForm } from "./RegisterForm";
import { FetchStateContextWrapper, TitleLogo } from "@components";

// TODO Adjust RegisterPage layout for mobile

/**
 * **RegisterPage**
 * - `Outlet` of `LandingAndAuthPagesLayout`
 * - Renders when path is "/register"
 */
export const RegisterPage = () => (
  <FetchStateContextWrapper>
    <div
      style={{
        height: "100%",
        width: "25vw",
        display: "flex",
        padding: "10vh 0",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <TitleLogo
          styles={{
            logo: { width: "8vw", marginRight: "1rem" },
            container: { justifyContent: "center" }
          }}
        />
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
    </div>
  </FetchStateContextWrapper>
);
