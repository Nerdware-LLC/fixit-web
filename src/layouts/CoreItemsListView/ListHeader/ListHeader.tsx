import Text from "@mui/material/Typography";
import { ListHeaderContainer } from "./ListHeaderContainer";
import type { InboxListName } from "../ListViewHeaderToggleButtons";

export const ListHeader = ({ listName }: ListHeaderProps) => (
  <ListHeaderContainer>
    <Text
      variant="h6"
      component="h3"
      style={{
        marginLeft: "1rem",
      }}
    >
      {listName}
    </Text>
  </ListHeaderContainer>
);

export type ListHeaderProps = { listName: InboxListName };
