import Box, { type BoxProps } from "@mui/material/Box";
import { tabsClassNames } from "./classNames";
import type { SetRequired } from "type-fest";

/**
 * TabPanel for displaying Tab content in an a11y-friendly way.
 *
 * @see https://mui.com/material-ui/react-tabs/#accessibility
 */
export const TabPanel = ({
  id,
  "aria-labelledby": ariaLabelledBy,
  isActive,
  sx = {},
  children,
  ...boxProps
}: TabPanelProps) => {
  return (
    <Box
      id={id}
      aria-labelledby={ariaLabelledBy}
      role="tabpanel"
      className={tabsClassNames.tabPanel.root}
      hidden={!isActive}
      sx={{
        // This allows TabPanels to use display flex if need be
        ...(!isActive && { display: "none !important" }),
        ...sx,
      }}
      {...boxProps}
    >
      {isActive && children}
    </Box>
  );
};

export type TabPanelProps = {
  isActive: boolean;
} & Omit<
  SetRequired<BoxProps, "id" | "aria-labelledby">, // require tabs-a11y-related props
  "role" | "hidden" | "className" // omit hard-coded props which should not be overridden
>;
