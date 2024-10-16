/**
 * This function uses a `tabLabel` to create `id` prop values for `Tab` and
 * `TabPanel` components for [a11y purposes][tabs-a11y].
 *
 * - `Tab`:
 *   - `id` is set to `"${tabLabel}-tab"`
 *   - `TabPanel`s must have an `aria-labelledby` prop set to the `id` of the corresponding `Tab`.
 *
 * - `TabPanel`:
 *   - `id` is set to `"${tabLabel}-tabpanel"`
 *   - `Tab`s must have an `aria-controls` prop set to the `id` of the corresponding `TabPanel`.
 *
 * [tabs-a11y]: https://mui.com/material-ui/react-tabs/#accessibility
 */
export const getTabComponentIDs = (tabLabel: string) => {
  const tabLabelNoSpaces = tabLabel.replace(/\s/g, "").toLowerCase();
  return {
    tabID: `${tabLabelNoSpaces}-tab`,
    tabPanelID: `${tabLabelNoSpaces}-tabpanel`,
  };
};

export const getTabA11yProps = (tabLabel: string) => {
  const { tabID, tabPanelID } = getTabComponentIDs(tabLabel);
  return {
    id: tabID,
    "aria-controls": tabPanelID,
  };
};

export const getTabPanelA11yProps = (tabLabel: string) => {
  const { tabID, tabPanelID } = getTabComponentIDs(tabLabel);
  return {
    id: tabPanelID,
    "aria-labelledby": tabID,
    role: "tabpanel",
  };
};
