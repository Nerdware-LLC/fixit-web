import { listClassNames } from "../classNames.js";

/**
 * This component is meant to be used by `VirtualizedList` as the `components.Footer` prop.
 *
 * This Footer simply adds a little spacing at the bottom of the list component to ensure
 * the last `<li>` isn't bordering the bottom of the viewport/window.
 */
export const ListFooter = ({ style = {}, ...props }: ListFooterProps) => (
  <div
    className={listClassNames.virtualizedList.footerComponent}
    style={{ minHeight: "1rem", width: "100%", ...style }}
    {...props}
  />
);

export type ListFooterProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "children"
>;
