import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { IntroText } from "./IntroText";
import { TitleLogo, Button } from "@components";

export const DesktopLandingPage = () => {
  const nav = useNavigate();

  return (
    <StyledContentContainer>
      <StyledLeftSide>
        <IntroText />
      </StyledLeftSide>
      <StyledRightSide>
        <TitleLogo styles={{ title: { margin: "0 1.35rem" } }} />
        <StyledBtnsContainer>
          {BTNS.map(({ label, path }) => (
            <Button
              key={`DesktopLandingPage:Button:${label}`}
              label={label}
              onClick={() => nav(path)}
              style={{
                fontWeight: "bold",
                lineHeight: "1.5rem"
              }}
            />
          ))}
        </StyledBtnsContainer>
      </StyledRightSide>
    </StyledContentContainer>
  );
};

const BTNS = [
  { label: "Sign In", path: "/login" },
  { label: "Register", path: "/register" }
];

const StyledContentContainer = styled.div`
  height: 100%;
  width: 85vw;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-self: center;
`;

const StyledLeftSide = styled.div`
  height: 75%;
  width: 35vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
`;

const StyledRightSide = styled.div`
  height: 80%;
  width: 30vw;
  padding: 2rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledBtnsContainer = styled.div`
  height: 20vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-evenly;
  align-self: center;
  text-align: center;
`;
