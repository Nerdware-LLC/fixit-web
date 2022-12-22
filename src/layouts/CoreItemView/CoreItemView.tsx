import Text from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const CoreItemView = ({
  headerLabel,
  headerLabelVariant = "h3",
  headerComponents,
  itemInfoComponents
}: {
  headerLabel: string;
  headerLabelVariant?: React.ComponentProps<typeof Text>["variant"];
  headerComponents?: React.ReactNode;
  itemInfoComponents: React.ReactNode;
}) => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <HeaderContainer>
        <Text
          variant={headerLabelVariant}
          style={{ flexGrow: 1, alignSelf: "center", whiteSpace: "nowrap" }}
        >
          {headerLabel}
        </Text>
        {headerComponents}
      </HeaderContainer>
      <ScrollableDetailsContainer>{itemInfoComponents}</ScrollableDetailsContainer>
    </div>
  );
};

const HeaderContainer = styled("div")(({ theme }) => ({
  height: "7rem",
  padding: "0.25rem 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  borderWidth: "0 0 1px 0",
  borderStyle: "solid",
  borderColor: theme.palette.divider
}));

const ScrollableDetailsContainer = styled("div")`
  overflow-y: auto;
  height: 100%;
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
