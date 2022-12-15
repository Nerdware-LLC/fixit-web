import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { IntroText } from "./IntroText";
import { TitleLogo, Button } from "@components";

export const MobileLandingPage = () => {
  const nav = useNavigate();

  return (
    <StyledContentContainer>
      <TitleLogo styles={styles.titleLogo} />
      <IntroText />
      <Button
        label="Sign Up Now"
        onClick={() => nav("/products")}
        style={{
          fontWeight: "bold",
          lineHeight: "1.5rem"
        }}
      />
    </StyledContentContainer>
  );
};

const StyledContentContainer = styled.div`
  height: auto;
  overflow-y: auto;
  padding: 7.5vw 5vh;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: center;
`;

const styles = {
  titleLogo: {
    container: {
      height: "6rem",
      width: "50vw",
      justifyContent: "flex-start"
    },
    logo: { height: "5.5rem", marginRight: "0.75rem" },
    title: { fontSize: "3.25rem" }
  }
};
