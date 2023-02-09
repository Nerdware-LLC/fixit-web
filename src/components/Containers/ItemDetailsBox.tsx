import { styled } from "@mui/material/styles";
import { ItemDataLabel } from "./ItemDataLabel";

/**
 * Outlined box for displaying one or more item fields
 */
export const ItemDetailsBox = ({
  label,
  labelVariant,
  icon: labelIcon,
  children,
  ...containerProps // any remaining props are passed to the containing div
}: {
  label?: React.ReactNode;
  labelVariant?: React.ComponentProps<typeof ItemDataLabel>["variant"];
  icon?: React.ComponentProps<typeof ItemDataLabel>["icon"];
  children?: React.ReactNode;
} & React.ComponentProps<typeof ItemDetailsBoxContainer>) => (
  <ItemDetailsBoxContainer
    className="item-details-box item-details-box-container"
    {...containerProps}
  >
    <div className="item-details-box-label-container">
      {typeof label === "string" ? (
        <ItemDataLabel className="item-details-box-label" variant={labelVariant} icon={labelIcon}>
          {label}
        </ItemDataLabel>
      ) : (
        label
      )}
    </div>
    {children && <div className="item-details-box-content-container">{children}</div>}
  </ItemDetailsBoxContainer>
);

const ItemDetailsBoxContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: "0.35rem",
  overflow: "auto",

  "& > div.item-details-box-label-container": {
    height: "3.25rem",
    width: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: "0 0 2px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    "& > svg:first-of-type": {
      marginRight: "0.75rem"
    }
  },

  "& > div.item-details-box-content-container": {
    padding: "1rem",
    flexGrow: 1,
    display: "flex",
    flexDirection: "row"
  }
}));
