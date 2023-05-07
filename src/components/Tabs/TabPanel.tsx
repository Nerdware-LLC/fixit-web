import Box, { type BoxProps } from "@mui/material/Box";

/**
 * TabPanel for Mui Tab content
 * - If `tab` prop is provided, it's used to set the `id` and `"aria-labelledby"`
 *   attributes using the convention established in the `getTabA11yProps` fn.
 *
 * @see https://mui.com/material-ui/react-tabs/#accessibility
 */
export const TabPanel = ({
  tab,
  id,
  "aria-labelledby": ariaLabelledBy,
  isActive,
  children,
  ...props
}: TabPanelProps) => {
  const tabNameNoSpaces = tab?.replace(/\s/g, "");

  return (
    <Box
      className={tabPabelClassNames.root}
      role="tabpanel"
      hidden={!isActive}
      sx={{
        // This allows TabPanels to use display flex if need be
        ...(!isActive && { display: "none !important" }),
      }}
      {...(tabNameNoSpaces
        ? {
            id: `${tabNameNoSpaces}-tabpanel`,
            "aria-labelledby": `${tabNameNoSpaces}-tab`,
          }
        : {
            id: id?.replace(/\s/g, ""),
            "aria-labelledby": ariaLabelledBy?.replace(/\s/g, ""),
          })}
      {...props}
    >
      {isActive && children}
    </Box>
  );
};

export const tabPabelClassNames = {
  root: "tab-panel",
};

export type TabPanelProps = {
  tab?: string;
  id?: string;
  "aria-labelledby"?: string;
  isActive: boolean;
} & BoxProps;
