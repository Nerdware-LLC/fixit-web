import { useState } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { paperClasses } from "@mui/material/Paper";
import Text from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ThreePIcon from "@mui/icons-material/ThreeP";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext.js";
import { MobileCreateItemButton } from "@/components/Buttons/MobileCreateItemButton.jsx";
import { MobileModalContentBox } from "@/components/Modal/MobileModalContentBox.jsx";
import { InputRequirementsInfo, INPUT_INFO_TEXT } from "./InputRequirementsInfo.jsx";
import { SearchUsersForm } from "./SearchUsersForm.jsx";
import { ariaElementIDs, searchUsersInputClassNames as classNames } from "./classNames.js";

/**
 * This component renders a layout-dependant SearchUsersForm/Input.
 *
 * On ALL layouts:
 * - Renders a SearchUsersForm/Input.
 *
 * On MOBILE layouts:
 * - Renders a search-IconButton BEFORE the SearchUsersForm/Input which opens
 *   SearchUsersForm/Input in a large modal (may be preferable to interact with
 *   the input this way on some devices).
 *
 * @note ContactsListView sets the CoreContentViewLayout header to use flex-wrap,
 *   and doubles its height to accommodate the SearchUsersInput, which will appear
 *   below the top CCVL header row.
 */
export const SearchUsers = () => {
  const { isMobilePageLayout } = usePageLayoutContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isMobilePageLayout && (
        <>
          <MobileCreateItemButton onClick={() => setIsModalOpen(true)} />
          <StyledMobileModalContentBox
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby={ariaElementIDs.mobileModalHeader}
            aria-describedby={ariaElementIDs.mobileModalHeader}
          >
            <div>
              <PersonAddIcon />
              <Text id={ariaElementIDs.mobileModalHeader} variant="h6">
                Add & Invite Contacts
              </Text>
            </div>
            <SearchUsersForm />
            <Divider flexItem />
            <div>
              <div>
                <AccountCircleIcon />
                <Text variant="body2">{INPUT_INFO_TEXT.search.header}</Text>
              </div>
              <InputRequirementsInfo inputActionType="search" />
            </div>
            <div>
              <div>
                <ThreePIcon />
                <Text variant="body2">{INPUT_INFO_TEXT.invite.header}</Text>
              </div>
              <InputRequirementsInfo inputActionType="invite" />
            </div>
          </StyledMobileModalContentBox>
        </>
      )}
      <SearchUsersForm />
    </>
  );
};

const StyledMobileModalContentBox = styled(MobileModalContentBox)({
  // The Mui-Paper content-container:
  [`& > .${paperClasses.root}`]: {
    minHeight: "66dvh",
    padding: "1rem",
    gap: "1.5rem",

    // Modal header+description divs:
    [`& > div:not(.${classNames.root})`]: {
      width: "100%",
      display: "flex",

      // The header div:
      "&:first-of-type": {
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",

        [`& #${ariaElementIDs.mobileModalHeader}`]: {
          fontWeight: 300,
          marginBottom: "-0.2rem",
        },
      },

      // Input info divs:
      "&:not(:first-of-type)": {
        margin: "0.25rem 0 0.5rem 0",
        flexDirection: "column",
        opacity: 0.5,

        "& > div": {
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        },

        "& > *:not(div)": {
          marginLeft: "2rem !important",
          lineHeight: "1.2rem !important",
        },
      },
    },

    // Popper:
    [`& #${ariaElementIDs.popperRoot}`]: {
      minWidth: "unset",
      maxWidth: "calc(80dvw - 2.25rem)",
    },
  },
});
