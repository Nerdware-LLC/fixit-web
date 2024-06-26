import { STATIC_MOCK_CONTACTS } from "./staticMockContacts.js";
import type { User, UserSubscription, UserStripeConnectAccount } from "@/types/graphql.js";
import type { AuthTokenPayload } from "@/types/open-api.js";
import type { OverrideProperties } from "type-fest";

/**
 * **STATIC Mock Users**
 * - This is useful for testing, as it provides a consistent set of data.
 *
 * | Name                                   | Description                                  |
 * | :------------------------------------- | :------------------------------------------- |
 * | Guy McPerson                           | Default auth'd user used during dev/testing  |
 * | Linda McContractorLongName-Jones-Smith | For testing layout with long hyphenated name |
 * | Aloy McInvoicer                        | Sends and receives WOs + INVs with Guy McP   |
 * | Walt McWorkOrder                       | Sends and receives WOs + INVs with Guy McP   |
 * | Astarion Ancunin                       | Sends and receives WOs + INVs with Guy McP   |
 */
export const STATIC_MOCK_USERS = {
  Guy_McPerson: {
    __typename: "User",
    id: "USER#0cfe2895-5455-4612-9b6b-9f6343056e71",
    handle: "@user_person",
    email: "person@user.com",
    phone: "4542471029",
    profile: {
      __typename: "Profile",
      displayName: "Guy McPerson",
      givenName: "Guy",
      familyName: "McPerson",
      businessName: "Human Services LLC",
      photoUrl: "https://freesvg.org/img/Linux-Avatar.png",
    },
    stripeCustomerID: "cus_j1DMkV2NG9Bz",
    stripeConnectAccount: {
      __typename: "UserStripeConnectAccount",
      id: "acct_W6ZEI0B9J4c4",
      detailsSubmitted: true,
      chargesEnabled: true,
      payoutsEnabled: true,
      updatedAt: new Date("2023-09-23T04:56:13.267Z"),
      createdAt: new Date("2022-11-30T16:21:55.897Z"),
    },
    subscription: {
      __typename: "UserSubscription",
      id: "sub_mkxULaUIO5rQ",
      currentPeriodEnd: new Date("2024-04-02T19:07:30.047Z"),
      productID: "prod_KfqbN8ZlobTO",
      priceID: "price_rYJPJlQ9JHzs",
      status: "incomplete_expired",
      updatedAt: new Date("2023-09-25T07:07:19.274Z"),
      createdAt: new Date("2022-11-30T16:25:50.897Z"),
    },
    updatedAt: new Date("2023-07-05T14:16:28.901Z"),
    createdAt: new Date("2022-11-30T16:21:50.897Z"),
  },
  Linda_McContractorLongName_Jones_Smith: {
    ...STATIC_MOCK_CONTACTS.Linda_McContractorLongName_Jones_Smith,
    __typename: "User",
    id: "USER#e011a9dc-6ef6-400f-9ade-7b932dffab6b",
    stripeCustomerID: "cus_nBpBPHPh7bDb",
    stripeConnectAccount: {
      __typename: "UserStripeConnectAccount",
      id: "acct_txkMdknntGJG",
      detailsSubmitted: true,
      chargesEnabled: true,
      payoutsEnabled: true,
      updatedAt: new Date("2021-12-06T11:25:30.921Z"),
      createdAt: new Date("2021-09-07T08:16:41.288Z"),
    },
    subscription: {
      __typename: "UserSubscription",
      id: "sub_abcULaUIOABC",
      currentPeriodEnd: new Date("2024-04-02T19:07:30.047Z"),
      productID: "prod_KfqbN8ZlobTO",
      priceID: "price_rYJPJlQ9JHzs",
      status: "active",
      updatedAt: new Date("2023-09-25T07:07:19.274Z"),
      createdAt: new Date("2022-11-30T16:25:50.897Z"),
    },
    updatedAt: new Date("2024-01-24T22:40:15.006Z"),
    createdAt: new Date("2021-09-07T08:16:41.288Z"),
  },
  Aloy_McInvoicer: {
    ...STATIC_MOCK_CONTACTS.Aloy_McInvoicer,
    __typename: "User",
    id: "USER#30022ae6-4cea-4de7-bd5d-d1953319c0a0",
    stripeCustomerID: "cus_xUxTKxUCmNq8",
    stripeConnectAccount: {
      __typename: "UserStripeConnectAccount",
      id: "acct_E9KZ4hhxId8U",
      detailsSubmitted: false,
      chargesEnabled: false,
      payoutsEnabled: true,
      updatedAt: new Date("2024-01-22T22:25:40.369Z"),
      createdAt: new Date("2023-12-26T10:55:02.243Z"),
    },
    subscription: {
      __typename: "UserSubscription",
      id: "sub_bWPntN1kwPEz",
      currentPeriodEnd: new Date("2024-06-04T17:40:21.005Z"),
      productID: "prod_XJh2S2atPirK",
      priceID: "price_uhzEsETX9GPx",
      status: "incomplete",
      updatedAt: new Date("2024-02-07T18:34:51.747Z"),
      createdAt: new Date("2023-12-26T10:55:02.243Z"),
    },
    updatedAt: new Date("2024-02-03T22:22:55.480Z"),
    createdAt: new Date("2023-12-26T10:55:02.243Z"),
  },
  Walt_McWorkOrder: {
    ...STATIC_MOCK_CONTACTS.Walt_McWorkOrder,
    __typename: "User",
    id: "USER#c152ce44-e95c-4332-bbdf-d82a0bc6d149",
    stripeCustomerID: "cus_pHdXVgZ6KOwu",
    stripeConnectAccount: {
      __typename: "UserStripeConnectAccount",
      id: "acct_qJRAqcwMeDCE",
      detailsSubmitted: true,
      chargesEnabled: true,
      payoutsEnabled: true,
      updatedAt: new Date("2022-06-30T21:46:52.706Z"),
      createdAt: new Date("2022-05-20T08:52:35.944Z"),
    },
    subscription: {
      __typename: "UserSubscription",
      id: "sub_CENJX4ezpBJs",
      currentPeriodEnd: new Date("2024-05-23T06:05:59.612Z"),
      productID: "prod_ceZQeHytj6Ae",
      priceID: "price_Pagb8P0JdOL7",
      status: "active",
      updatedAt: new Date("2023-06-25T06:57:46.862Z"),
      createdAt: new Date("2022-05-20T08:52:35.944Z"),
    },
    updatedAt: new Date("2023-02-24T18:55:01.886Z"),
    createdAt: new Date("2022-05-20T08:52:35.944Z"),
  },
  Astarion_Ancunin: {
    ...STATIC_MOCK_CONTACTS.Astarion_Ancunin,
    __typename: "User",
    id: "USER#3f17b361-cd21-4aab-86ce-f87bb645d352",
    stripeCustomerID: "cus_qD2Spa249Wgn",
    stripeConnectAccount: {
      __typename: "UserStripeConnectAccount",
      id: "acct_FfYfU0KzuKys",
      detailsSubmitted: true,
      chargesEnabled: true,
      payoutsEnabled: false,
      updatedAt: new Date("2023-04-16T23:18:07.089Z"),
      createdAt: new Date("2021-08-09T07:10:11.829Z"),
    },
    subscription: {
      __typename: "UserSubscription",
      id: "sub_jYtdMverBQkP",
      currentPeriodEnd: new Date("2024-03-07T12:40:07.775Z"),
      productID: "prod_kySblCRr6NSa",
      priceID: "price_SH9zROQrP8Im",
      status: "incomplete_expired",
      updatedAt: new Date("2023-01-28T06:51:17.807Z"),
      createdAt: new Date("2021-08-09T07:10:11.829Z"),
    },
    updatedAt: new Date("2022-01-18T00:58:22.908Z"),
    createdAt: new Date("2021-08-09T07:10:11.829Z"),
  },
} as const satisfies Record<
  string,
  User &
    OverrideProperties<
      AuthTokenPayload,
      {
        subscription: UserSubscription;
        stripeConnectAccount: UserStripeConnectAccount;
      }
    >
>;
