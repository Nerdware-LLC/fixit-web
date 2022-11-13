import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, UserAvatar } from "../Avatar";
import { useStripeService, useAuthService } from "../../hooks";
import { isActiveAccountStore, isConnectOnboardingNeededStore } from "../../app";

export const AppBarUserAvatar = () => {
  const isAccountActive = isActiveAccountStore.useSubToStore();
  const isConnectOnboardingNeeded = isConnectOnboardingNeededStore.useSubToStore();

  // prettier-ignore
  const { getCustomerPortalLink, getConnectOnboardingLink, getConnectDashboardLink,  } = useStripeService();
  const { logout } = useAuthService();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const nav = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const MENU_BTNS = {
    ...(isAccountActive !== true
      ? {
          "Select a Subscription": {
            onClick: async () => nav("/products")
          }
        }
      : {
          Account: {
            onClick: async () => {
              const { stripeLink } = await getCustomerPortalLink();
              window.open(stripeLink); // <-- open in new tab
            }
          },
          Profile: {
            onClick: () => nav("/home/profile")
          },
          ...(isConnectOnboardingNeeded === true
            ? {
                "Setup Stripe Payments": {
                  onClick: async () => {
                    const { stripeLink } = await getConnectOnboardingLink();
                    window.open(stripeLink); // <-- open in new tab
                  }
                }
              }
            : {
                "Stripe Connect Dashboard": {
                  onClick: async () => {
                    const { stripeLink } = await getConnectDashboardLink();
                    window.open(stripeLink); // <-- open in new tab
                  }
                }
              })
        }),
    Logout: {
      onClick: async () => await logout().then(() => nav("/"))
    }
  };

  return (
    <>
      <div id="AppBarUserAvatar-divClickTarget" onClick={handleClick}>
        {isAccountActive !== true ? <Avatar styles={styles} /> : <UserAvatar styles={styles} />}
      </div>
      <Menu
        id="AppBarUserAvatar-Menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "AppBarUserAvatar-divClickTarget" }}
      >
        {Object.entries(MENU_BTNS).map(([label, { onClick }]) => (
          <MenuItem key={`AppBarUserAvatar-MenuItem:${label}`} onClick={onClick}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const styles = {
  avatar: { marginRight: "1rem" }
};
