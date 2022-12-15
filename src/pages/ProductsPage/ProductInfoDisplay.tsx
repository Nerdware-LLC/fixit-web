import { useNavigate } from "react-router-dom";
import PaperSurface from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { ProductFeaturesList } from "./ProductFeaturesList";
import { Button } from "@components";
import { oneOf } from "@types";

export const ProductInfoDisplay = ({
  label,
  onClick,
  isSelected
}: {
  label: "TRIAL" | "MONTHLY" | "ANNUAL";
  onClick: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  isSelected: boolean;
}) => {
  const { palette } = useTheme();
  const nav = useNavigate();

  const handleClickCheckout = () => nav("/checkout");

  return (
    <StyledProductInfoBox
      onClick={onClick}
      style={{ ...(isSelected && { borderColor: palette.secondary.main }) }}
    >
      <h1 style={{ margin: "0", padding: "0", whiteSpace: "nowrap" }}>
        {PRICE_INFO[label].HEADER}
      </h1>
      <StyledPriceInfoRowBox>
        <StylePriceLabel
          style={{ color: palette.mode === "dark" ? "#85BB65" : palette.text.primary }}
        >
          {PRICE_INFO[label].PRICE}
        </StylePriceLabel>
        <StyledTextSpan>
          <p
            style={{
              textAlign: label === "TRIAL" ? "center" : "left",
              fontWeight: "normal",
              lineHeight: "1rem"
            }}
          >
            {PRICE_INFO[label].DESCRIPTION}
          </p>
        </StyledTextSpan>
      </StyledPriceInfoRowBox>
      <ProductFeaturesList />
      <>
        {!isSelected ? (
          <Button label="SELECT" onClick={onClick} style={btnStyle} />
        ) : (
          <Button label="Checkout" onClick={handleClickCheckout} style={btnStyle} />
        )}
      </>
    </StyledProductInfoBox>
  );
};

const PRICE_INFO = {
  TRIAL: {
    HEADER: "Free Trial",
    PRICE: "FREE",
    DESCRIPTION: "Try it FREE\nfor 14 Days"
  },
  MONTHLY: {
    HEADER: "Monthly",
    PRICE: "$5.00",
    DESCRIPTION: "per\nmonth"
  },
  ANNUAL: {
    HEADER: "Annual",
    PRICE: "$50.00",
    DESCRIPTION: "per\nyear"
  }
};

const StyledProductInfoBox = styled(PaperSurface)`
  height: 45vh;
  width: 18vw;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-width: 4px;
  border-style: solid;
  &:hover {
    cursor: pointer;
  }
`;

const StylePriceLabel = styled.h1`
  font-size: 2.25rem;
  line-height: 2.25rem;
  margin: 0 0.35rem 0 0;
`;

const StyledTextSpan = styled.span`
  width: 100%;
  display: inline-block;
  white-space: pre;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledPriceInfoRowBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-line;
`;

const btnStyle = {
  height: "3rem",
  width: "100%",
  fontWeight: "bold"
};

ProductInfoDisplay.propTypes = {
  label: oneOf(["TRIAL", "MONTHLY", "ANNUAL"]).isRequired
};
