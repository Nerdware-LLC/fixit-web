import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Title } from "../../components";

export const DevNavMenu = () => (
  <StyledDevNavMenuLayout>
    <Title>Dev Nav Menu - Links to All Pages</Title>
    <Link to="/checkout">
      {/* NOTE: this will error, bc query params "token", "sub", and "promoCode" are not set */}
      Checkout Page
    </Link>
    <Link to="/connect/return">Stripe Connect Onboarding Bridge (RETURN)</Link>
    <Link to="/connect/return">Stripe Connect Onboarding Bridge (REFRESH)</Link>
    <Link to="/customer-portal">Stripe Customer Portal Bridge</Link>
    <Link to="/page-not-found">"Page Not Found" Page</Link>
  </StyledDevNavMenuLayout>
);

const StyledDevNavMenuLayout = styled.div`
  box-sizing: border-box;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 30vh 15vw;
  align-items: center;
  justify-content: space-around;
`;
