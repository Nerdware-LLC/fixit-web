import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { isConnectOnboardingNeededStore } from "@cache";
import { useStripeService } from "@hooks";
import { Dialog } from "@components";

/**
 * During the authentication process, `isConnectOnboardingNeededStore` will
 * be initialized using the `user.stripeConnectAccount.detailsSubmitted`
 * property; if `detailsSubmitted` is `false`, `isConnectOnboardingNeeded`
 * will be true, and vice versa.
 *
 * If `isConnectOnboardingNeeded` is true upon successful authentication, the
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
 *       isConnectOnboardingNeeded can be flipped to false.
 *
 *    2. REFRESH: If the user fails to complete the onboarding flow within the
 *       window of time allotted to the temporary portal, or if they try to
 *       refresh the portal page, they'll be redirected to the Fixit route from
 *       which they originally began the onboarding flow, along with a URL search
 *       param of "?connect-refresh" (e.g., "/home/workorders?connect-refresh"),
 *       at which time a new link must be obtained from the Fixit API.
 */
export const StripeConnectOnboardingStateLayer = ({ children }: { children: React.ReactNode }) => {
  const isConnectOnboardingNeeded = isConnectOnboardingNeededStore.useSubToStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getConnectOnboardingLink } = useStripeService();

  useEffect(() => {
    (async () => {
      // Do nothing if isConnectOnboardingNeeded is false
      if (isConnectOnboardingNeeded) {
        if (searchParams.has("connect-refresh")) {
          // Rm the query param and obtain new Stripe Connect onboarding portal link
          searchParams.delete("connect-refresh");
          setSearchParams(searchParams);
          await getConnectOnboardingLink();
        } else if (searchParams.has("connect-return")) {
          // Rm the query param and set isConnectOnboardingNeeded to false
          searchParams.delete("connect-return");
          setSearchParams(searchParams);
          isConnectOnboardingNeededStore.set(false);
        }
      }
    })();
  }, [isConnectOnboardingNeeded, searchParams, setSearchParams, getConnectOnboardingLink]);

  // Local/internal Dialog state vars (init isDialogVisible set to isConnectOnboardingNeeded)
  const [hasAlertedUser, setHasAlertedUser] = useState(false);
  const { isDialogVisible, closeDialog } = Dialog.use(isConnectOnboardingNeeded);

  const handleDialogAccept = async () => {
    closeDialog();
    setHasAlertedUser(true);
    await getConnectOnboardingLink();
  };

  const handleDialogCancel = () => {
    closeDialog();
    setHasAlertedUser(true);
  };

  return (
    <>
      {children}
      {isConnectOnboardingNeeded && !hasAlertedUser && (
        <Dialog
          isVisible={isDialogVisible}
          title="Start Getting Paid Today!"
          handleAccept={handleDialogAccept}
          handleCancel={handleDialogCancel}
          acceptLabel="Complete Setup"
          cancelLabel="I'll do this later"
        >
          <Box
            sx={{
              "& .MuiTypography-root": {
                lineHeight: "1.35rem"
              },
              "& > div": {
                marginTop: "1rem",
                display: "flex",
                "& > svg": {
                  marginRight: "0.5rem"
                }
              }
            }}
          >
            <Text>
              Complete your account setup to start sending and receiving payments. If you'd like to
              do this later - no problem! You can always manage your payment settings in the account
              menu.
            </Text>
            <div>
              <AnnouncementIcon />
              <Text>
                You won't be able to send or receive invoices until your account setup is complete.
              </Text>
            </div>
          </Box>
        </Dialog>
      )}
    </>
  );
};
