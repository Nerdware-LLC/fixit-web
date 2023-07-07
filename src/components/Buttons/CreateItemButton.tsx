import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { MobileCreateItemButton } from "./MobileCreateItemButton";

/**
 * Layout-dependant CreateItemButton.
 */
export const CreateItemButton = ({ createItemFormPath, buttonText }: CreateItemButtonProps) => {
  const nav = useNavigate();
  const { isMobilePageLayout } = usePageLayoutContext();

  const handleClickCreateItem: React.MouseEventHandler<HTMLButtonElement> = () =>
    nav(createItemFormPath);

  return (
    <>
      {isMobilePageLayout ? (
        <MobileCreateItemButton onClick={handleClickCreateItem} />
      ) : (
        <Button
          onClick={handleClickCreateItem}
          startIcon={<AddCircleIcon style={{ marginBottom: "0.12rem" }} />}
          style={{
            height: "2rem",
            width: "14rem",
            paddingTop: "0.26rem",
            paddingBottom: "0.1rem",
            borderRadius: "1.5rem",
          }}
        >
          {buttonText}
        </Button>
      )}
    </>
  );
};

export type CreateItemButtonProps = {
  createItemFormPath: string;
  buttonText: string;
};
