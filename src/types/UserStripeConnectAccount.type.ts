export interface UserStripeConnectAccount {
  id: string;
  detailsSubmitted: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
