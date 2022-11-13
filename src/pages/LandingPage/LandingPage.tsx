import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { TitleLogo, Text, Button } from "../../components";

/**
 * **LandingPage**
 * - `Outlet` of `LandingAndAuthPagesLayout`
 * - Renders when path is "/"
 */
export const LandingPage = () => {
  const nav = useNavigate();

  return (
    <StyledContentContainer>
      <StyledLeftSide>
        <StyledLargeTagline variant="secondary">
          Work Order Management Made Easy.
        </StyledLargeTagline>
        <StyledText>
          People who need to get things done use <span style={{ color: "#f78103" }}>Fixit</span> to
          keep in touch with contractors and customers, create work orders, submit invoices, and
          manage payments - all in one place!
        </StyledText>
        <StyledText>
          Whether you&apos;re a homeowner planning your next kitchen renovation, or a general
          contractor looking for a better way to submit invoices and get paid for your work,{" "}
          <span style={{ color: "#f78103" }}>Fixit</span> makes it easy.
        </StyledText>
      </StyledLeftSide>
      <StyledRightSide>
        <TitleLogo />
        <StyledBtnsContainer>
          <Button label="Sign In" onClick={() => nav("/login")} style={styles.btns} />
          <Button label="Register" onClick={() => nav("/register")} style={styles.btns} />
        </StyledBtnsContainer>
      </StyledRightSide>
    </StyledContentContainer>
  );
};

const StyledContentContainer = styled.div`
  height: 100%;
  width: 85vw;
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
  justify-content: space-evenly;
  border-radius: 0.5rem;
  text-align: left;
`;

const StyledRightSide = styled.div`
  height: 80%;
  width: 30vw;
  padding: 2rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledLargeTagline = styled(Text)`
  font-size: 3rem;
  font-weight: bold;
  line-height: 3rem;
`;

const StyledText = styled(Text)`
  font-size: 1.5rem;
  line-height: 2.2rem;
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

const styles = {
  btns: {
    fontWeight: "bold",
    lineHeight: "1.5rem"
  }
};
