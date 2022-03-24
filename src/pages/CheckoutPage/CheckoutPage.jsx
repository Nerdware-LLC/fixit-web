import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { CheckoutContext } from "./CheckoutContext";
import { HeaderIcon } from "./HeaderIcon";
import { ExplainerText } from "./ExplainerText";
import { SubCostDetails } from "./SubCostDetails";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutStripeBadge } from "./CheckoutStripeBadge";
import { useWebViewContext } from "../../components";
import { storage, useQueryParams } from "../../utils";

export const CheckoutPage = () => {
  const { webViewPostMessage } = useWebViewContext();
  const { token, sub, promoCode } = useQueryParams();

  useEffect(() => {
    storage.setAuthToken(token);
  }, [token]);

  if (!token || !sub) webViewPostMessage({ error: "INVALID_QUERY_PARAMS" });

  return (
    <CheckoutContext.Provider
      value={{
        selectedSubscription: sub.toUpperCase(),
        promoCode,
        handlePostSubmit: webViewPostMessage
      }}
    >
      <StyledContentContainer>
        <HeaderIcon />
        <ExplainerText />
        <SubCostDetails />
        <CheckoutForm />
        <CheckoutStripeBadge />
      </StyledContentContainer>
    </CheckoutContext.Provider>
  );
};

const StyledContentContainer = styled.div`
  position: absolute;
  min-height: 80vh;
  width: 85vw;
  padding: 3.5rem 1.75rem 1.75rem 1.75rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid rgba(255, 255, 255, 0.35);
`;
