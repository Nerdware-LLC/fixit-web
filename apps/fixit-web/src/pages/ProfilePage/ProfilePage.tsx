import { ProfileViewLayout } from "@/layouts/ProfileViewLayout";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";

/**
 * // IDEA Add to ProfilePage:
 * - Button/form to update DisplayName
 * - Button/form to update profile pic
 */
export const ProfilePage = () => {
  // The user must be authenticated here, hence the as cast.
  const authenticatedUser = authenticatedUserStore.useSubToStore()!;

  return <ProfileViewLayout {...authenticatedUser} />;
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = ProfilePage;
