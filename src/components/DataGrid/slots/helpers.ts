import { UncapitalizedGridSlotsComponent } from "@mui/x-data-grid";

/** @internal */
export const _makeDataGridCustomSlotModuleExports = <
  SlotName extends keyof UncapitalizedGridSlotsComponent,
  SlotComponent extends React.JSXElementConstructor<any>,
  DefaultSlotComponentProps extends Readonly<
    Partial<React.ComponentPropsWithoutRef<SlotComponent>>
  >,
>({
  slotName,
  component,
  defaultSlotProps,
}: {
  slotName: SlotName;
  component: SlotComponent;
  defaultSlotProps?: DefaultSlotComponentProps; // optional param
}): {
  slotName: SlotName;
  component: SlotComponent;
  defaultSlotProps: DefaultSlotComponentProps;
} => ({
  slotName,
  component,
  defaultSlotProps: defaultSlotProps ?? ({} as DefaultSlotComponentProps),
});
