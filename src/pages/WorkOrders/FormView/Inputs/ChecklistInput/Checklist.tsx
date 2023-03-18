import { useField } from "formik";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import ListIcon from "@mui/icons-material/List";
import { RemoveChecklistButton } from "./RemoveChecklistButton";
import { ChecklistItemInput } from "./ChecklistItemInput";
import { AddChecklistItemButton } from "./AddChecklistItemButton";
import type { WorkOrderFormChecklistItem } from "./types";

export const Checklist = () => {
  const [{ value: checklistFieldValue }] = useField("checklist");

  return (
    <StyledChecklistInputContainer>
      <div className="checklist-input-header">
        <ListIcon />
        <Text>CHECKLIST</Text>
        <RemoveChecklistButton />
      </div>
      <div className="checklist-input-scrollable-list-container">
        {checklistFieldValue.map((item: WorkOrderFormChecklistItem, index: number) => (
          <ChecklistItemInput
            key={`ChecklistItem:${index}]`}
            checklistItemIndex={index}
            autoFocus={index === checklistFieldValue.length - 1}
            enableDelete={checklistFieldValue.length >= 2}
          />
        ))}
      </div>
      <div className="checklist-input-footer">
        <AddChecklistItemButton />
      </div>
    </StyledChecklistInputContainer>
  );
};

// TODO Try to convert ChecklistInput to use ul/ol and li elements for a11y (currently all divs).

const StyledChecklistInputContainer = styled(Box)(({ theme }) => ({
  //////////////////////////////////////////////////
  // Outer container:

  height: "100%",
  ...(theme.variables.isMobilePageLayout && {
    maxHeight: "40vh"
  }),
  width: "100%",
  overflow: "hidden",
  borderRadius: "0.35rem",
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light" && {
    border: `1px solid ${theme.palette.divider}`
  }),

  //////////////////////////////////////////////////
  // Header container:

  "& > .checklist-input-header": {
    height: "3.5rem",
    width: "100%",
    padding: "1rem 0.75rem 1rem 1rem", // a little less m-r so the IconButton looks aligned w textfields
    color: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: "1px",
    borderRadius: "0.35rem 0.35rem 0 0",
    backgroundColor: `rgba(0,0,0, ${theme.palette.mode === "dark" ? "0.1" : "0.05"})`,
    "&:hover": {
      cursor: "pointer"
    },
    "& > .MuiTypography-root:first-of-type": {
      marginLeft: "0.35rem", // separates text from ListIcon
      marginTop: "2px" // nudges text down for better vertical alignment
    },
    "& > button:last-child": {
      marginLeft: "auto", // pushes the delete-btn right, and `ListIcon CHECKLIST` left
      "&:hover": {
        opacity: 0.6
      }
    }
  },

  //////////////////////////////////////////////////
  // Scrollable list container:

  "& > .checklist-input-scrollable-list-container": {
    height: "calc( 100% - 7rem )", // header & footer both have height: 3.5rem
    width: "100%",
    padding: "0.5rem 1rem 0 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflowX: "hidden",
    overflowY: "auto",
    borderWidth: "1px 0 1px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    // TODO see if we need after-content at bottom of scroll
    "&::-webkit-scrollbar": {
      // prevent hide on mobile:
      display: "block",
      appearance: "auto",
      width: theme.variables.isMobilePageLayout ? "0.75rem" : "1rem"
    },
    "&::-webkit-scrollbar-track": {
      // prevent hide on mobile:
      display: "block",
      appearance: "auto",
      backgroundColor: theme.palette.divider
    },
    "&::-webkit-scrollbar-thumb": {
      // prevent hide on mobile:
      display: "block",
      appearance: "auto",
      backgroundColor: theme.palette.divider
    }
  },

  //////////////////////////////////////////////////
  // Footer container:

  "& > .checklist-input-footer": {
    height: "3.5rem",
    width: "100%",
    padding: "0.5rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: `rgba(0,0,0, ${theme.palette.mode === "dark" ? "0.1" : "0.05"})`,
    borderRadius: "0 0 0.35rem 0.35rem"
  }
}));
