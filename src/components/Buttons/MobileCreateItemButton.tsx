import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FlashyIconButton } from "./FlashyIconButton";

export const MobileCreateItemButton = (props: MobileCreateItemButtonProps) => (
  <FlashyIconButton shouldInvertColors {...props}>
    <AddCircleIcon />
  </FlashyIconButton>
);

export type MobileCreateItemButtonProps = Omit<
  React.ComponentProps<typeof FlashyIconButton>,
  "shouldInvertColors"
>;
