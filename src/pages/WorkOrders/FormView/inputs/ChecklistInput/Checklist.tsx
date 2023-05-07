import { useField } from "formik";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import ListIcon from "@mui/icons-material/List";
import { globalClassNames } from "@app/GlobalStyles/classNames";
import { AddChecklistItemButton } from "./AddChecklistItemButton";
import { ChecklistItemInput } from "./ChecklistItemInput";
import { RemoveChecklistButton } from "./RemoveChecklistButton";
import { checklistInputClassNames as classNames } from "./classNames";
import type { WorkOrderFormChecklistItem } from "./types";

export const Checklist = () => {
  const [{ value: checklistFieldValue }] = useField("checklist");

  return (
    <StyledBox>
      <div className={classNames.header}>
        <ListIcon className={classNames.headerIcon} />
        <Text className={classNames.headerTitle}>Checklist</Text>
        <RemoveChecklistButton />
      </div>
      <ul
        className={[
          classNames.scrollableListContainer,
          globalClassNames.scrollbarForceShowPaperBG,
        ].join(" ")}
      >
        {checklistFieldValue.map((item: WorkOrderFormChecklistItem, index: number) => (
          <ChecklistItemInput
            key={`ChecklistItem:${index}]`}
            checklistItemIndex={index}
            autoFocus={index === checklistFieldValue.length - 1}
            enableDelete={checklistFieldValue.length >= 2}
          />
        ))}
      </ul>
      <div className={classNames.footer}>
        <AddChecklistItemButton />
      </div>
    </StyledBox>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  ////////////////////////////////////////////////////////////
  // Outer container:

  height: "100%",
  ...(theme.variables.isMobilePageLayout && {
    maxHeight: "40vh",
  }),
  width: "100%",
  overflow: "hidden",
  borderRadius: "0.35rem",
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light" && {
    border: `1px solid ${theme.palette.divider}`,
  }),

  ////////////////////////////////////////////////////////////
  // Header container:

  [`& > .${classNames.header}`]: {
    height: "3.5rem",
    width: "100%",
    padding: "1rem 0.75rem 1rem 1rem", // a little less m-r so the IconButton looks aligned w textfields
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: "1px",
    borderRadius: "0.35rem 0.35rem 0 0",
    backgroundColor: `rgba(0,0,0, ${theme.palette.mode === "dark" ? "0.1" : "0.05"})`,
    "&:hover": {
      cursor: "pointer",
    },
    [`& > .${classNames.headerTitle}`]: {
      marginLeft: "0.35rem", // separates text from ListIcon
      marginTop: "2px", // nudges text down for better vertical alignment
    },
    [`& > .${classNames.removeChecklistButton}`]: {
      marginLeft: "auto", // pushes the delete-btn right, and `ListIcon CHECKLIST` left
      transform: "translateX(4px)",
      color: theme.palette.primary.dark,
      "&:hover": {
        opacity: 0.6,
      },
    },
  },

  ////////////////////////////////////////////////////////////
  // Scrollable list container:

  [`& > .${classNames.scrollableListContainer}`]: {
    height: "calc( 100% - 7rem )", // header & footer both have height: 3.5rem
    width: "100%",
    listStyle: "none", // override ul default
    margin: 0, //         override ul default
    padding: "0.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflowX: "hidden",
    overflowY: "auto",
    borderWidth: "1px 0 1px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },

  ////////////////////////////////////////////////////////////
  // Footer container:

  [`& > .${classNames.footer}`]: {
    height: "3.5rem",
    width: "100%",
    padding: "0.5rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: `rgba(0,0,0, ${theme.palette.mode === "dark" ? "0.1" : "0.05"})`,
    borderRadius: "0 0 0.35rem 0.35rem",
  },

  ////////////////////////////////////////////////////////////
}));
