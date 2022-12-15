import AccountIcon from "@mui/icons-material/AccountCircle";
import { useStripeService } from "@hooks";
import { HomePageDrawerBtn } from "./HomePageDrawerBtn";

export const AccountDrawerBtn = ({ label }: { label: string }) => {
  const { getCustomerPortalLink } = useStripeService();

  const handleClick = async () => await getCustomerPortalLink();

  return <HomePageDrawerBtn label={label} icon={<AccountIcon />} onClick={handleClick} />;
};
