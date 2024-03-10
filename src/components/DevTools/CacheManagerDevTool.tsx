import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import { apolloClient } from "@/app/ApolloProvider/apolloClient";
import { ActionsButtonGroup } from "@/components/Buttons/ActionsButtonGroup";
import { QUERIES } from "@/graphql/queries";
import { MOCK_WORK_ORDERS, MOCK_INVOICES, MOCK_CONTACTS } from "@/tests/mockItems";
import { DevToolContainer } from "./DevToolContainer";

export const CacheManagerDevTool = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  // Shared onClick handler for the ActionsButtonGroup options:
  const handleManageCache = async ({ target, action }: HandleManageCacheParams) => {
    if (action === "Write") {
      if (target !== "ALL") {
        apolloClient.writeQuery(MOCK_CACHE_CONFIGS[target].WRITE_QUERY_ARGS as any);
      } else {
        // Write all queries to cache
        apolloClient.writeQuery(MOCK_CACHE_CONFIGS.WorkOrders.WRITE_QUERY_ARGS);
        apolloClient.writeQuery(MOCK_CACHE_CONFIGS.Invoices.WRITE_QUERY_ARGS);
        apolloClient.writeQuery(MOCK_CACHE_CONFIGS.Contacts.WRITE_QUERY_ARGS);
      }
    } else if (action === "Clear") {
      // id defaults to ROOT_QUERY; return DELETE sentinel object to remove the "field"
      apolloClient.cache.modify({
        broadcast: true,
        fields:
          target !== "ALL"
            ? { [MOCK_CACHE_CONFIGS[target].ROOT_QUERY_FIELD_NAME]: (_, { DELETE }) => DELETE }
            : {
                [MOCK_CACHE_CONFIGS.WorkOrders.ROOT_QUERY_FIELD_NAME]: (_, { DELETE }) => DELETE,
                [MOCK_CACHE_CONFIGS.Invoices.ROOT_QUERY_FIELD_NAME]: (_, { DELETE }) => DELETE,
                [MOCK_CACHE_CONFIGS.Contacts.ROOT_QUERY_FIELD_NAME]: (_, { DELETE }) => DELETE,
              },
      });
      // Run garbage collection to remove the single-item cache refs
      apolloClient.cache.gc();
      await apolloClient.refetchQueries({ include: "all" });
    }
    handleCloseModal();
  };

  return (
    <DevToolContainer
      title="Manage Mocked Items in Apollo Cache"
      subtitle="Note: Mocked items are not persisted on the back-end."
    >
      {HANDLE_MANAGE_CACHE_ACTIONS.map((action) => (
        <Stack key={action} style={{ width: "10rem" }}>
          <FormLabel style={{ display: "block" }}>{action} Mocks</FormLabel>
          <ActionsButtonGroup
            options={HANDLE_MANAGE_CACHE_TARGETS.map((target) => ({
              label: target,
              handleClick: () => handleManageCache({ action, target }),
              isPrimary: target === "ALL",
            }))}
          />
        </Stack>
      ))}
    </DevToolContainer>
  );
};

const MOCK_CACHE_CONFIGS = {
  WorkOrders: {
    ROOT_QUERY_FIELD_NAME: "myWorkOrders",
    WRITE_QUERY_ARGS: {
      query: QUERIES.MY_WORK_ORDERS,
      data: MOCK_WORK_ORDERS,
    },
  },
  Invoices: {
    ROOT_QUERY_FIELD_NAME: "myInvoices",
    WRITE_QUERY_ARGS: {
      query: QUERIES.MY_INVOICES_WITH_WORKORDER_DATA,
      data: MOCK_INVOICES,
    },
  },
  Contacts: {
    ROOT_QUERY_FIELD_NAME: "myContacts",
    WRITE_QUERY_ARGS: {
      query: QUERIES.MY_CONTACTS,
      data: { myContacts: Object.values(MOCK_CONTACTS) },
    },
  },
} as const satisfies Record<
  string,
  {
    ROOT_QUERY_FIELD_NAME: string;
    WRITE_QUERY_ARGS: {
      query: object;
      data: Record<string, unknown>;
    };
  }
>;

const HANDLE_MANAGE_CACHE_ACTIONS = ["Write", "Clear"] as const;

const HANDLE_MANAGE_CACHE_TARGETS = [
  "ALL",
  ...(Object.keys(MOCK_CACHE_CONFIGS) as Array<keyof typeof MOCK_CACHE_CONFIGS>),
] as const;

export type CacheManagerOperationType = (typeof HANDLE_MANAGE_CACHE_ACTIONS)[number];
export type CacheManagerTarget = (typeof HANDLE_MANAGE_CACHE_TARGETS)[number];
export type HandleManageCacheParams = {
  action: CacheManagerOperationType;
  target: CacheManagerTarget;
};
