import { isConnectOnboardingNeededStore } from "@cache";
import { useStripeService } from "@hooks";
import { StripeIcon } from "@components";
import { HomePageDrawerBtn } from "./HomePageDrawerBtn";

export const ConnectDrawerBtn = () => {
  const isConnectOnboardingNeeded = isConnectOnboardingNeededStore.useSubToStore();
  const { getConnectOnboardingLink, getConnectDashboardLink } = useStripeService();

  const handleClick = async () => {
    if (isConnectOnboardingNeeded) await getConnectOnboardingLink();
    else await getConnectDashboardLink();
  };

  const sharedProps = {
    icon: <StripeIcon />,
    onClick: handleClick
  };

  return isConnectOnboardingNeeded ? (
    <HomePageDrawerBtn label="Setup Payments" {...sharedProps} />
  ) : (
    <HomePageDrawerBtn label="Stripe Connect Dashboard" {...sharedProps} />
  );
};
