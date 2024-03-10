import Text from "@mui/material/Typography";
import { ListHeaderContainer } from "./ListHeaderContainer";
import type { ListViewListName } from "../types";

export const ListHeader = ({ listName }: ListHeaderProps) => (
  <ListHeaderContainer>
    <Text variant="h6" component="h3" style={{ paddingLeft: "0.75rem" }}>
      {listName}
    </Text>
  </ListHeaderContainer>
);

export type ListHeaderProps = { listName: ListViewListName };
