import React from "react";
import styled from "@emotion/styled";
import { StripeBadge } from "../../components";

export const CheckoutStripeBadge = () => <StyledStripeBadge />;

const StyledStripeBadge = styled(StripeBadge)`
  position: absolute;
  bottom: -3.75rem;
  align-self: center;
`;