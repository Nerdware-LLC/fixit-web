import { styled } from "@mui/material/styles";
import { ItemDataLabel } from "./ItemDataLabel";

/**
 * Outlined box for displaying one or more item fields in `CoreItemView`
 */
export const ItemDetailsBox = ({
  label,
  labelVariant,
  children,
  styles = {}
}: {
  label: React.ReactNode;
  labelVariant?: React.ComponentProps<typeof ItemDataLabel>["variant"];
  children: React.ReactNode;
  style?: React.CSSProperties;
  styles?: {
    container?: React.CSSProperties;
    labelContainer?: React.CSSProperties;
    label?: React.CSSProperties;
    dataContainer?: React.CSSProperties;
  };
}) => {
  return (
    <OuterContainer style={styles?.container ?? {}}>
      <LabelContainer style={styles?.labelContainer ?? {}}>
        {typeof label === "string" ? (
          <ItemDataLabel variant={labelVariant} style={styles?.label ?? {}}>
            {label}
          </ItemDataLabel>
        ) : (
          label
        )}
      </LabelContainer>
      <ChildrenContainer style={styles?.dataContainer ?? {}}>{children}</ChildrenContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: "0.35rem",
  overflow: "auto"
}));

const LabelContainer = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "1rem",
  display: "flex",
  height: "3.25rem",
  flexDirection: "row",
  alignItems: "center",
  borderWidth: "0 0 2px 0",
  borderStyle: "solid",
  borderColor: theme.palette.divider
}));

const ChildrenContainer = styled("div")(() => ({
  padding: "1rem",
  flexGrow: 1,
  display: "flex",
  flexDirection: "row"
}));
