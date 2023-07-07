export type TabLabels = Array<string> | ReadonlyArray<string>;

/**
 * A11y Props for Tab components like `@mui/material/Tab`
 *
 * @see https://mui.com/material-ui/react-tabs/#accessibility
 */
export type TabA11yProps<TabLabel extends string> = {
  id: `${TabLabel}-tab`;
  "aria-controls": `${TabLabel}-tabpanel`;
};

/**
 * A11y Props for TabPanel components
 *
 * @see https://mui.com/material-ui/react-tabs/#accessibility
 */
export type TabPanelA11yProps<TabLabel extends string> = {
  id: `${TabLabel}-tabpanel`;
  "aria-labelledby": `${TabLabel}-tab`;
  role: "tabpanel";
};

/**
 * A11y Props for Tabs wrapper components like `@mui/material/Tabs`
 *
 * @see https://mui.com/material-ui/react-tabs/#accessibility
 */
export type TabsWrapperA11yProps = Record<"aria-label", string>;

type GetTabA11yPropsFnReturnType<T extends TabLabels> = {
  tabProps: {
    [TabLabel in T[number]]: TabA11yProps<TabLabel>;
  };
  tabPanelProps: {
    [TabLabel in T[number]]: TabPanelA11yProps<TabLabel>;
  };
  tabsWrapperProps: TabsWrapperA11yProps;
};

export const getTabA11yProps = <T extends TabLabels>({
  tabLabels,
  tabsWrapperLabel,
}: {
  tabLabels: T;
  tabsWrapperLabel: string;
}): GetTabA11yPropsFnReturnType<T> => ({
  // tabLabels may be readonly, so TS compiler requires a shallow copy here
  ...[...tabLabels].reduce(
    (accum, tabLabel: T[number]) => {
      const tabLabelNoSpaces = tabLabel.replace(/\s/g, "");
      return {
        tabProps: {
          ...accum.tabProps,
          [tabLabel]: {
            id: `${tabLabelNoSpaces}-tab`,
            "aria-controls": `${tabLabelNoSpaces}-tabpanel`,
          },
        },
        tabPanelProps: {
          ...accum.tabPanelProps,
          [tabLabel]: {
            id: `${tabLabelNoSpaces}-tabpanel`,
            "aria-labelledby": `${tabLabelNoSpaces}-tab`,
            role: "tabpanel",
          },
        },
      };
    },
    {
      tabProps: {},
      tabPanelProps: {},
    } as Pick<GetTabA11yPropsFnReturnType<T>, "tabProps" | "tabPanelProps">
  ),
  tabsWrapperProps: {
    "aria-label": tabsWrapperLabel,
  },
});
