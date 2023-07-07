import { authenticatedUserStore } from "@cache/authenticatedUserStore";
import { ProfileViewLayout } from "@layouts/ProfileViewLayout";

/**
 * // IDEA Add to ProfilePage:
 * - Button/form to update DisplayName
 * - Button/form to update profile pic
 */
export const ProfilePage = () => {
  const user = authenticatedUserStore.useSubToStore();

  return <ProfileViewLayout {...user} />;
};
