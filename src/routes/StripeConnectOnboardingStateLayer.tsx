import { useState, useLayoutEffect } from "react";
import { useSearchParams, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { Dialog } from "@/components/Dialog";
import { stripeService } from "@/services/stripeService.js";
import { isConnectOnboardingCompleteStore } from "@/stores/isConnectOnboardingCompleteStore.js";

/**
 * This component is responsible for managing the state of the user's Stripe
 * Connect onboarding process.
 *
 * During authentication, `isConnectOnboardingCompleteStore` will be initialized
 * using the `user.stripeConnectAccount.detailsSubmitted` property.
 *
 * If `isConnectOnboardingComplete` is false upon successful authentication, the
 * user is presented with an alert dialog notifying them of the need to complete
 * the Connect onboarding process.
 *
 * Once the Connect onboarding flow has begun, there are two possible actions
 * that need to be handled:
 *
 *    1. RETURN: Upon completion of Stripe Connect onboarding process, the user
 *       will be redirected to the Fixit route from which they originally began
 *       the onboarding flow, along with a URL search param of "?connect-return"
 *       (e.g., "/home/workorders?connect-return"), at which time the value of
 *       isConnectOnboardingComplete can be flipped to `true`.
 *
 *    2. REFRESH: If the user fails to complete the onboarding flow within the
 *       window of time allotted to the temporary portal, or if they try to
 *       refresh the portal page, they'll be redirected to the Fixit route from
 *       which they originally began the onboarding flow, along with a URL search
 *       param of "?connect-refresh" (e.g., "/home/workorders?connect-refresh").
 *       The user can complete the onboarding flow at any time in the future.
 */
export const StripeConnectOnboardingStateLayer = () => {
  const isConnectOnboardingComplete = isConnectOnboardingCompleteStore.useSubToStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useLayoutEffect(() => {
    (async () => {
      // Do nothing if isConnectOnboardingComplete is true
      if (!isConnectOnboardingComplete) {
        if (searchParams.has(STRIPE_CONNECT_URL_PARAMS.REFRESH)) {
          // Rm the query param and obtain new Stripe Connect onboarding portal link
          searchParams.delete(STRIPE_CONNECT_URL_PARAMS.REFRESH);
          // Update searchParams with 'REFRESH' query param removed
          setSearchParams(searchParams);
          // Get the onboarding link (run in bg without loading/error indicators)
          const { stripeLink } = await stripeService.getConnectOnboardingLink();
          if (stripeLink) window.open(stripeLink);
        } else if (searchParams.has(STRIPE_CONNECT_URL_PARAMS.RETURN)) {
          // Rm the query param and set isConnectOnboardingComplete to true
          searchParams.delete(STRIPE_CONNECT_URL_PARAMS.RETURN);
          // Update searchParams with 'RETURN' query param removed
          setSearchParams(searchParams);
          isConnectOnboardingCompleteStore.set(true);
        }
      }
    })();
  }, [isConnectOnboardingComplete, searchParams, setSearchParams]);

  // Local/internal Dialog state vars (init isDialogVisible set to !isConnectOnboardingComplete)
  const [hasAlertedUser, setHasAlertedUser] = useState(false);
  const { isDialogVisible, closeDialog } = Dialog.use(!isConnectOnboardingComplete);

  const handleDialogAccept = async () => {
    closeDialog();
    setHasAlertedUser(true);
    const { stripeLink } = await stripeService.getConnectOnboardingLink();
    if (stripeLink) window.open(stripeLink);
  };

  const handleDialogCancel = () => {
    closeDialog();
    setHasAlertedUser(true);
  };

  return (
    <>
      <Outlet />
      {!isConnectOnboardingComplete && !hasAlertedUser && (
        <Dialog
          isVisible={isDialogVisible}
          title="Start Getting Paid Today!"
          handleAccept={handleDialogAccept}
          handleCancel={handleDialogCancel}
          acceptLabel="Complete Setup"
          cancelLabel="I'll do this later"
        >
          <Text>
            Complete your account setup to start sending and receiving payments. If you'd like to do
            this later - no problem! You can always manage your payment settings in the account
            menu.
          </Text>
          <Box style={{ display: "flex" }}>
            <AnnouncementIcon style={{ marginRight: "0.5rem" }} />
            <Text>
              You won't be able to send or receive invoices until your account setup is complete.
            </Text>
          </Box>
        </Dialog>
      )}
    </>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = StripeConnectOnboardingStateLayer;

export const STRIPE_CONNECT_URL_PARAMS = {
  RETURN: "connect-return",
  REFRESH: "connect-refresh",
} as const;
