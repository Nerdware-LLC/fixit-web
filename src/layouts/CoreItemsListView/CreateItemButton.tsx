import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import type { ListViewHeader } from "./types";

export const CreateItemButton = ({
  handleClickCreateItem,
  viewHeader,
  isMobilePageLayout
}: {
  handleClickCreateItem: React.MouseEventHandler<HTMLButtonElement>;
  viewHeader: ListViewHeader;
  isMobilePageLayout: boolean;
}) => {
  return (
    <>
      {isMobilePageLayout ? (
        <IconButton
          className="list-view-create-item-button"
          onClick={handleClickCreateItem}
          sx={({ palette }) => ({
            height: "2rem",
            width: "2rem",
            color: palette.primary.main,
            position: "relative",
            zIndex: 2,

            "&::before": {
              content: '""',
              position: "absolute",
              height: "2.25rem",
              width: "2.25rem",
              background: `conic-gradient(${palette.primary.dark} 75%, ${palette.primary.main}, ${palette.primary.dark})`,
              borderRadius: "50%",
              zIndex: -1,
              animation: "rotate 1.5s cubic-bezier(.14,.36,.94,.71) infinite",

              "@keyframes rotate": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" }
              }
            },

            "& svg": {
              fontSize: "2rem",
              backgroundColor: palette.background.default,
              border: "none",
              borderRadius: "50%"
            }
          })}
        >
          <AddCircleIcon />
        </IconButton>
      ) : (
        <Button
          className="list-view-create-item-button"
          onClick={handleClickCreateItem}
          startIcon={<AddCircleIcon style={{ marginBottom: "0.12rem" }} />}
          style={{
            height: "2rem",
            width: "14rem",
            paddingTop: "0.26rem",
            paddingBottom: "0.1rem",
            borderRadius: "1.5rem"
          }}
        >
          {`Create ${viewHeader.slice(0, -1)}`}
        </Button>
      )}
    </>
  );
};
