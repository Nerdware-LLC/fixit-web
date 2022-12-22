import { ItemDataLabel } from "./ItemDataLabel";

/**
 * Aesthetic display for a single item field in `CoreItemView`
 */
export const ItemDataDisplay = ({
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
    <div style={{ display: "flex", flexDirection: "column", ...(styles?.container ?? {}) }}>
      <div style={styles?.labelContainer ?? {}}>
        <ItemDataLabel variant={labelVariant} style={styles?.label ?? {}}>
          {label}
        </ItemDataLabel>
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          ...(styles?.dataContainer ?? {})
        }}
      >
        {children}
      </div>
    </div>
  );
};
