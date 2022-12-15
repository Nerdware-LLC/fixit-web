import Tooltip from "@mui/material/Tooltip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type {
  InboxListsVisibilityDict,
  HandleChangeListVisibilityFn
} from "./useInboxListVisToggleBtns";

export const InboxListVisToggleBtns = ({
  listVisibility,
  onChange,
  style = {}
}: {
  listVisibility: InboxListsVisibilityDict;
  onChange: HandleChangeListVisibilityFn;
  style?: React.CSSProperties;
}) => {
  const visibleListNames = [
    ...(listVisibility.isInboxVisible ? ["Inbox"] : []),
    ...(listVisibility.isSentVisible ? ["Sent"] : [])
  ];

  return (
    <ToggleButtonGroup
      value={visibleListNames}
      onChange={onChange}
      aria-label="list visibility toggle buttons"
      style={style}
    >
      {INBOX_LIST_NAMES.map((listName) => (
        <ToggleButton
          key={`ListVisToggleBtns:ToggleButton:${listName}`}
          value={listName}
          aria-label={listName}
          size="small"
          style={{ padding: "0.55rem 1rem 0.45rem 1rem" }}
        >
          <Tooltip
            arrow
            title={
              listVisibility[INBOX_LIST_VIS_KEY[listName]] === false
                ? "Show list"
                : visibleListNames.length === 2
                ? "Hide list"
                : "Switch lists"
            }
          >
            <span>{listName}</span>
          </Tooltip>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

const INBOX_LIST_NAMES = ["Inbox", "Sent"] as const;
const INBOX_LIST_VIS_KEY = {
  Inbox: "isInboxVisible",
  Sent: "isSentVisible"
} as const;
