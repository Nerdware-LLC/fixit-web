import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { CheckoutContextProvider } from "./CheckoutContextProvider";
import { ExplainerText } from "./ExplainerText";
import { SubCostDetails } from "./SubCostDetails";
import { CheckoutForm } from "./CheckoutForm";
import { PageContainer, AppBar, TitleLogo, StripeBadge } from "../../components";

export const CheckoutPage = () => {
  const { palette } = useTheme();

  return (
    <CheckoutContextProvider>
      <PageContainer style={{ height: "100vh", overflowY: "hidden" }}>
        <AppBar />
        <StyledContentContainer>
          <StyledCheckoutContainer style={{ backgroundColor: palette.background.paper }}>
            <StyledCheckoutLeftSide>
              <TitleLogo styles={styles.titleLogo} />
              <ExplainerText />
              <SubCostDetails />
            </StyledCheckoutLeftSide>
            <StyledCheckoutRightSide>
              {/* TODO Add "Promo Code" TextInput here (see Stripe example) */}
              <CheckoutForm />
            </StyledCheckoutRightSide>
          </StyledCheckoutContainer>
          <StripeBadge style={{ width: "10vw" }} />
        </StyledContentContainer>
      </PageContainer>
    </CheckoutContextProvider>
  );
};

// The whole page, less the AppBar
const StyledContentContainer = styled.div`
  height: 100%;
  width: 100vw;
  padding: 2.5vh 10vw 8vh 10vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

// Surface
const StyledCheckoutContainer = styled.div`
  height: 85%;
  width: 85%;
  padding: 5vh 5vw;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 10px;
`;

const StyledCheckoutLeftSide = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

  background-color: red;
`;

const StyledCheckoutRightSide = styled.div`
  height: 100%;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

  /* background-color: blue; */
`;

const styles = {
  titleLogo: {
    container: { height: "8vh" },
    logo: { height: "8vh", marginRight: "0" },
    title: { fontSize: "3rem" }
  }
};
