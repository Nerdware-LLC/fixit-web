import React, { useState } from "react";
import { useApolloClient } from "@apollo/client/react/hooks";
import { styled } from "@mui/material/styles";
import Button, { type ButtonProps } from "@mui/material/Button";
import { buttonGroupClasses } from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";
import FormLabel, { formLabelClasses } from "@mui/material/FormLabel";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Text, { typographyClasses } from "@mui/material/Typography";
import { ActionsButtonGroup } from "@components/Buttons/ActionsButtonGroup";
import { QUERIES } from "@graphql/queries";
import { MOCK_WORK_ORDERS, MOCK_INVOICES, MOCK_CONTACTS } from "@/__tests__/mockItems";

export const DevModeTools = ({
  children,
  label = "Open Dev Mode Tools",
  ...buttonProps
}: DevModeToolsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const client = useApolloClient();

  const handleManageCache = ({
    target,
    action,
  }: {
    action: (typeof HANDLE_MANAGE_CACHE_ACTIONS)[number];
    target: (typeof HANDLE_MANAGE_CACHE_TARGETS)[number];
  }) => {
    if (action === "Write") {
      if (target !== "ALL") client.writeQuery(MOCK_CACHE_CONFIGS[target].WRITE_QUERY_ARGS as any);
      else {
        // Write all queries to cache
        client.writeQuery(MOCK_CACHE_CONFIGS.WorkOrders.WRITE_QUERY_ARGS);
        client.writeQuery(MOCK_CACHE_CONFIGS.Invoices.WRITE_QUERY_ARGS);
        client.writeQuery(MOCK_CACHE_CONFIGS.Contacts.WRITE_QUERY_ARGS);
      }
    } else if (action === "Clear") {
      // id defaults to ROOT_QUERY; return DELETE sentinel object to remove the "field"
      client.cache.modify({
        broadcast: true,
        fields:
          target !== "ALL"
            ? { [MOCK_CACHE_CONFIGS[target].ROOT_QUERY_FIELD_NAME]: () => [] }
            : {
                [MOCK_CACHE_CONFIGS.WorkOrders.ROOT_QUERY_FIELD_NAME]: () => [],
                [MOCK_CACHE_CONFIGS.Invoices.ROOT_QUERY_FIELD_NAME]: () => [],
                [MOCK_CACHE_CONFIGS.Contacts.ROOT_QUERY_FIELD_NAME]: () => [],
              },
      });
      // Run garbage collection to remove the single-item cache refs
      client.cache.gc();
      client.refetchQueries({ include: "all" });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        id={ariaElementIDs.root}
        onClick={() => setIsModalOpen(true)}
        variant="outlined"
        size="small"
        {...buttonProps}
      >
        {children ?? label}
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby={ariaElementIDs.modalLabel}
      >
        <StyledPaper>
          <Text id={ariaElementIDs.modalLabel} variant="h4">
            {`✨ `} Dev Mode Tools {` ✨`}
          </Text>
          <Divider flexItem />
          <div className={classNames.contentRoot}>
            <div className={classNames.section}>
              <Text variant="h6">Manage Mocked Items in Cache:</Text>
              <div className={classNames.sectionContent}>
                {HANDLE_MANAGE_CACHE_ACTIONS.map((action) => (
                  <div key={action} className={classNames.actionBtnsGrpParentContainer}>
                    <FormLabel>{action} Mocks</FormLabel>
                    <ActionsButtonGroup
                      options={HANDLE_MANAGE_CACHE_TARGETS.map((target) => ({
                        label: target,
                        handleClick: () => handleManageCache({ action, target }),
                        isPrimary: target === "ALL",
                      }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StyledPaper>
      </Modal>
    </>
  );
};

// For lazy loading:
export default DevModeTools;

// prettier-ignore
const MOCK_CACHE_CONFIGS = {
  WorkOrders: {
    WRITE_QUERY_ARGS: { query: QUERIES.MY_WORK_ORDERS, data: MOCK_WORK_ORDERS },
    ROOT_QUERY_FIELD_NAME: "myWorkOrders",
  },
  Invoices: {
    WRITE_QUERY_ARGS: { query: QUERIES.MY_INVOICES, data: MOCK_INVOICES },
    ROOT_QUERY_FIELD_NAME: "myInvoices",
  },
  Contacts: {
    WRITE_QUERY_ARGS: { query: QUERIES.MY_CONTACTS, data: { myContacts: Object.values(MOCK_CONTACTS) }, },
    ROOT_QUERY_FIELD_NAME: "myContacts",
  },
} as const;

const HANDLE_MANAGE_CACHE_ACTIONS = ["Write", "Clear"] as const;
const HANDLE_MANAGE_CACHE_TARGETS = [
  "ALL",
  ...(Object.keys(MOCK_CACHE_CONFIGS) as Array<keyof typeof MOCK_CACHE_CONFIGS>),
] as const;

const ariaElementIDs = {
  root: "dev-mode-tools-root",
  modalLabel: "dev-mode-tools-modal-label",
};

const classNames = {
  contentRoot: "dev-mode-tools-content-root",
  section: "dev-mode-tools-section",
  sectionContent: "dev-mode-tools-section-content",
  actionBtnsGrpParentContainer: "dev-mode-tools-action-btns-grp-parent-container",
};

const StyledPaper = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "clamp(328px, 35vw, 26rem)",
  border: "2px solid #000",
  borderRadius: "0.35rem",
  padding: "1rem 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",

  // Text, all:
  [`& .${typographyClasses.root}`]: {
    marginBottom: "-3px",
    fontWeight: 300,
  },

  // Modal title:
  [`& > .${typographyClasses.root}`]: {
    fontSize: "1.65rem",
    whiteSpace: "pre",
  },

  // Divs, direct child div contains all "sections" of the modal:
  [`& > div.${classNames.contentRoot}`]: {
    width: "100%",
    display: "flex",
    gap: "1rem",
    margin: "auto 0",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 1rem",

    // Grand-child divs are "section" containers:
    [`& > div.${classNames.section}`]: {
      width: "100%",
      display: "flex",
      gap: "0.5rem",
      flexDirection: "column",

      // 1st section's content container:
      [`&:first-of-type > div.${classNames.sectionContent}`]: {
        width: "100%",
        display: "flex",
        gap: "1rem",
        justifyContent: "center",

        [`& > div.${classNames.actionBtnsGrpParentContainer}`]: {
          width: "100%",
          maxWidth: "10rem",
          display: "flex",
          flexDirection: "column",

          [`& > .${formLabelClasses.root}`]: { display: "block" },
          [`& > .${buttonGroupClasses.root}`]: {
            width: "100%",
            [`& > button:first-of-type`]: {
              minWidth: "5rem",
              width: "clamp(5rem, 100%, 10rem)",
              maxWidth: "10rem",
            },
          },
        },
      },
    },
  },
});

export type DevModeToolsProps = { label?: React.ReactNode } & Omit<ButtonProps, "id" | "onClick">;
