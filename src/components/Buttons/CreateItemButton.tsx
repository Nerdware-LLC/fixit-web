import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button, { type ButtonProps } from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext.js";
import { MobileCreateItemButton } from "./MobileCreateItemButton.jsx";

/**
 * Layout-dependant CreateItemButton.
 */
export const CreateItemButton = ({
  createItemFormPath,
  buttonText,
  ...buttonProps
}: CreateItemButtonProps) => {
  const nav = useNavigate();
  const { isMobilePageLayout } = usePageLayoutContext();

  const handleClickCreateItem = () => nav(createItemFormPath);

  return (
    <>
      {isMobilePageLayout ? (
        <MobileCreateItemButton onClick={handleClickCreateItem} {...buttonProps} />
      ) : (
        <StyledButton
          onClick={handleClickCreateItem}
          startIcon={<AddCircleIcon />}
          {...buttonProps}
        >
          {buttonText}
        </StyledButton>
      )}
    </>
  );
};

const StyledButton = styled(Button)(({ theme: { breakpoints } }) => ({
  height: "2rem",
  minWidth: "min-content",
  borderRadius: "1.5rem",
  whiteSpace: "nowrap",
  /* On screens under 900px, shrink font to ensure this button isn't too large.
  While most viewports under 900px are likely to use the MobileCreateItemButton,
  this shrinkage prevents the layout from breaking in edge cases. */
  [breakpoints.down("md")]: {
    fontSize: "0.85rem",
  },
}));

export type CreateItemButtonProps = {
  createItemFormPath: string;
  buttonText: string;
} & Pick<ButtonProps, "style" | "sx">;
