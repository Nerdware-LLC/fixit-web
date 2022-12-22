import { styled } from "@mui/material/styles";
import { CoreListItemLayout } from "@layouts";
import { InvoiceStatusIcon, Link } from "@components";
import { formatNum } from "@utils";
import type { Invoice } from "@types";

export const InvoicesListItem = ({
  parentListName,
  item,
  onClick
}: {
  parentListName?: "Inbox" | "Sent";
  item?: Invoice;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  if (!parentListName || !item || !onClick) return null;

  const isInboxList = parentListName === "Inbox";

  const prettyCreatedAt = item.createdAt.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const handleClickDiv = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick(event);
  };

  const handleClickWorkOrderLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <CoreListItemLayout
      onClick={handleClickDiv}
      topRowComponents={
        <>
          <TopLeftGridBox>
            <span style={{ gridArea: "1 / 1", fontWeight: "bold" }}>
              {isInboxList ? "FROM:" : "TO:"}
            </span>
            <span style={{ gridArea: "1 / 2" }}>
              {isInboxList
                ? item.createdBy.profile.displayName
                : item?.assignedTo?.profile.displayName ?? ""}
            </span>
            <span style={{ gridArea: "2 / 1", fontWeight: "bold" }}>DATE:</span>
            <span style={{ gridArea: "2 / 2" }}>{prettyCreatedAt}</span>
          </TopLeftGridBox>
          <span style={{ paddingTop: "1px" }}>{item.status.replace(/_/g, " ")}</span>
          <InvoiceStatusIcon
            status={item.status as Invoice["status"]}
            style={{ marginLeft: "0.5rem" }}
          />
        </>
      }
      bottomRowComponents={
        <Box style={{ flexDirection: "row" }}>
          <>
            <span style={{ marginRight: "auto" }}>{formatNum.toCurrencyStr(item.amount)}</span>
            {"workOrderID" in item && (
              <Link
                to={`/home/workorders/${item.workOrderID}`}
                state={{ isItemOwnedByUser: isInboxList /* Invoice INBOX = WorkOrder SENT */ }}
                onClick={handleClickWorkOrderLink}
              >
                View Work Order
              </Link>
            )}
          </>
        </Box>
      }
    />
  );
};

const Box = styled("div")`
  width: 100%;
  display: flex;
`;

const TopLeftGridBox = styled("div")`
  margin-right: auto;
  display: grid;
  grid-template: auto auto / 3.5rem auto;
`;
