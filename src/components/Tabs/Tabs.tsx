import { useState, useMemo, type SyntheticEvent } from "react";
import { styled } from "@mui/material/styles";
import MuiTab from "@mui/material/Tab";
import MuiTabs, { type TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import { TabPanel, type TabPanelProps } from "./TabPanel.jsx";
import { tabsClassNames } from "./classNames.js";
import { getTabComponentIDs } from "./helpers.js";
import type { SetRequired } from "type-fest";

/**
 * A11y-friendly Tabs built with Mui `Tabs` and `Tab` components. Each tab has its associated
 * content rendered within a `TabPanel` component.
 *
 * @see https://mui.com/material-ui/react-tabs/#accessibility
 */
export const Tabs = ({
  tabsContentMap,
  initialTabIndex = 0,
  "aria-label": tabsAriaLabel,
  tabPanelProps = {},
  ...muiTabsProps
}: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(initialTabIndex);

  const tabConfigs = useMemo(
    () =>
      Object.entries(tabsContentMap).map(([tabLabel, tabContent], tabIndex) => ({
        tabLabel,
        tabContent,
        tabIndex,
        ...getTabComponentIDs(tabLabel),
      })),
    [tabsContentMap]
  );

  const handleChangeActiveTabIndex = (_event: SyntheticEvent, newActiveTabIndex: number) => {
    setActiveTabIndex(newActiveTabIndex);
  };

  return (
    <>
      <StyledMuiTabs
        value={activeTabIndex}
        onChange={handleChangeActiveTabIndex}
        aria-label={tabsAriaLabel}
        {...muiTabsProps}
      >
        {tabConfigs.map(({ tabLabel, tabID, tabPanelID }) => (
          <MuiTab
            key={`Tab:${tabID}`}
            label={tabLabel}
            id={tabID} //                 matches TabPanel's aria-labelledby
            aria-controls={tabPanelID} // matches TabPanel's id
          />
        ))}
      </StyledMuiTabs>
      {tabConfigs.map(({ tabPanelID, tabID, tabContent, tabIndex }) => (
        <TabPanel
          key={`TabPanel:${tabPanelID}`}
          id={tabPanelID} //         matches Tab's aria-controls
          aria-labelledby={tabID} // matches Tab's id
          isActive={tabIndex === activeTabIndex}
          {...tabPanelProps}
        >
          {tabContent}
        </TabPanel>
      ))}
    </>
  );
};

const StyledMuiTabs = styled(MuiTabs)(({ theme: { palette, variables } }) => ({
  borderWidth: "0 0 1px 0",
  borderStyle: "solid",
  borderColor: palette.divider,

  padding: "0 0.5rem",
  /* The above padding ensures the active tab's bottom highlight doesn't touch
  the side, so a little gray border-bottom will always show on Tabs L and R. */

  [`& .${tabsClassNames.muiTabs.flexContainer}`]: {
    gap: "0.5rem",
    justifyContent: "flex-start",

    ...(variables.isMobilePageLayout && {
      justifyContent: "space-around",

      [`& > .${tabsClassNames.muiTab.root}`]: {
        flexGrow: 1,
        maxWidth: "45%",
        padding: "0.3rem 0 0 0",
      },
    }),
  },
}));

export type TabsProps = {
  tabsContentMap: Record<string, React.ReactNode>;
  initialTabIndex?: number;
} & SetRequired<MuiTabsProps, "aria-label"> & {
    /**
     * Props passed to each `TabPanel` component (e.g., shared `style` settings).
     *
     * > a11y-related props like `id` and `aria-labelledby` are set by this component and
     *   therefore this component does not support user-provided values for these props.
     */
    tabPanelProps?: Omit<TabPanelProps, "id" | "aria-labelledby" | "isActive">;
  };
