import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FlashyIconButton } from "./FlashyIconButton.jsx";

export const MobileCreateItemButton = ({
  "aria-label": ariaLabel = "Create item",
  ...props
}: MobileCreateItemButtonProps) => (
  <FlashyIconButton shouldInvertColors aria-label={ariaLabel} {...props}>
    <AddCircleIcon />
  </FlashyIconButton>
);

export type MobileCreateItemButtonProps = Omit<
  React.ComponentProps<typeof FlashyIconButton>,
  "shouldInvertColors"
>;
