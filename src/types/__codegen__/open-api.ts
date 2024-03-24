/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/admin/csp-violation": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Logs CSP violation reports */
        post: operations["CspViolation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/healthcheck": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Responds to load balancer healthchecks */
        post: operations["Healthcheck"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Authenticates a user via login credentials */
        post: operations["Login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Registers a new user */
        post: operations["Register"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Refreshes a user's auth token */
        post: operations["RefreshToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/google-token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Processes JSON JWT payloads from GoogleID services (existing users only) */
        post: operations["GoogleToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/connect/account-link": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Provides a link to the Stripe Connect Account onboarding portal */
        post: operations["ConnectAccountLink"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/connect/dashboard-link": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Provides a link to the Stripe Connect Account dashboard portal */
        get: operations["ConnectDashboardLink"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/subscriptions/check-promo-code": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Checks promo code validity */
        post: operations["CheckPromoCode"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/subscriptions/customer-portal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Provides a link to the Stripe Customer portal */
        post: operations["SubscriptionsCustomerPortal"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/subscriptions/submit-payment": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Processes checkout payment information */
        post: operations["SubscriptionsSubmitPayment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        UserRegistrationParams: components["schemas"]["LoginCredentials"] & components["schemas"]["ExpoPushTokenParam"] & {
            handle: components["schemas"]["Handle"];
            email: components["schemas"]["Email"];
            phone?: components["schemas"]["Phone"];
            profile?: components["schemas"]["UserProfileParams"];
        };
        LoginParams: components["schemas"]["LoginCredentials"] & components["schemas"]["ExpoPushTokenParam"];
        LoginCredentials: components["schemas"]["LocalLoginCredentials"] | components["schemas"]["GoogleOAuthLoginCredentials"];
        /** @description The user's login credentials for local authentication */
        LocalLoginCredentials: {
            email: components["schemas"]["Email"];
            password: components["schemas"]["Password"];
        };
        /** @description The user's login credentials for google-oauth authentication */
        GoogleOAuthLoginCredentials: {
            email: components["schemas"]["Email"];
            googleIDToken: components["schemas"]["GoogleIDToken"];
        };
        /** @description An object which contains a base64-encoded JSON JWT from GoogleID services
         *     under the key "googleIDToken".
         *      */
        GoogleIDTokenField: {
            googleIDToken: components["schemas"]["GoogleIDToken"];
        };
        /** @description Parameters for a user's profile. */
        UserProfileParams: {
            /** @description The user's display name. */
            displayName?: string;
            /** @description The user's family name. */
            familyName?: string;
            /** @description The user's given name. */
            givenName?: string;
            /** @description The user's business name. */
            businessName?: string;
            /** @description The user's profile picture URL. */
            photoUrl?: string;
        };
        /** @description A user's Expo push token, which is used to send push notifications to the user's mobile device. This is an optional parameter which is only sent from mobile clients.
         *      */
        ExpoPushTokenParam: {
            /** @description A user's Expo push token (only available on mobile clients). */
            expoPushToken?: string;
        };
        /** @description An object which contains an encoded and stringified auth token. */
        AuthTokenResponseField: {
            /** @description An encoded and stringified auth token. */
            token: string;
        };
        /** @description An object which contains pre-fetched user items under the key `userItems`.
         *      */
        PreFetchedUserItemsResponseField: {
            userItems?: components["schemas"]["PreFetchedUserItems"];
        };
        /** @description A User's pre-fetched WorkOrders, Invoices, and Contacts (used on logins). When fetched
         *     by the `queryUserItems` middleware (see `src/middleware/auth/queryUserItems.ts`), these
         *     objects are made available on Express `res.locals` objects under the key `userItems`.
         *
         *     Note: the middleware converts workOrders' and invoices' internal `createdByUserID` and
         *     `assignedToUserID` fields into `createdBy` and `assignedTo` objects to match the GQL
         *     schema, but only the `"id"` field can be provided on the createdBy/assignedTo objects
         *     without fetching additional data on the associated users/contacts from either the db or
         *     usersCache. The middleware forgoes fetching the data since the client-side Apollo cache
         *     already handles fetching additional data as needed (_if_ it's needed), and fetching it
         *     there can delay auth request response times, especially if the authenticating user has
         *     a large number of items.
         *      */
        PreFetchedUserItems: {
            /** @description The user's work orders. */
            workOrders?: components["schemas"]["WorkOrder"][];
            /** @description The user's invoices. */
            invoices?: components["schemas"]["Invoice"][];
            /** @description The user's contacts. */
            contacts?: components["schemas"]["Contact"][];
        };
        /** @description A pre-fetched Contact object returned from a REST endpoint. */
        Contact: {
            /** @description The contact's ID */
            id: string;
            handle: components["schemas"]["Handle"];
            email: components["schemas"]["Email"];
            phone: components["schemas"]["Phone"];
            profile: components["schemas"]["UserProfile"];
            createdAt: components["schemas"]["CreatedAt"];
            updatedAt: components["schemas"]["UpdatedAt"];
        };
        /** @description A pre-fetched Invoice object returned from a Fixit REST endpoint. */
        Invoice: {
            /** @description The invoice's ID. */
            id: string;
            /** @description The user or contact who created the invoice. */
            createdBy: {
                /** @description The ID of the user or contact who created the invoice. */
                id: string;
            };
            /** @description The user or contact to whom the invoice is assigned. */
            assignedTo: {
                /** @description The ID of the user or contact to whom the invoice is assigned. */
                id: string;
            };
            /** @description The Invoice amount, represented as an integer which reflects USD centage
             *     (i.e., an 'amount' of 1 = $0.01 USD).
             *      */
            amount: number;
            /**
             * @description The invoice's status.
             * @enum {string}
             */
            status: "OPEN" | "CLOSED" | "DISPUTED";
            /** @description The ID of the most recent successful paymentIntent applied to the Invoice, if any.
             *      */
            stripePaymentIntentID?: string | null;
            /** @description The work order associated with the invoice. */
            workOrder?: {
                /** @description The ID of the work order associated with the invoice. */
                id: string;
            } | null;
            createdAt: components["schemas"]["CreatedAt"];
            updatedAt: components["schemas"]["UpdatedAt"];
        };
        /** @description A pre-fetched WorkOrder object returned from a REST endpoint. */
        WorkOrder: {
            /** @description The work order's ID. */
            id: string;
            /** @description The user or contact who created the work order. */
            createdBy: {
                /** @description The ID of the user or contact who created the work order. */
                id: string;
            };
            /** @description The user or contact to whom the work order is assigned. */
            assignedTo?: {
                /** @description The ID of the user or contact to whom the work order is assigned. */
                id: string;
            } | null;
            /**
             * @description The work order's status.
             * @enum {string}
             */
            status: "UNASSIGNED" | "ASSIGNED" | "IN_PROGRESS" | "DEFERRED" | "CANCELLED" | "COMPLETE";
            /**
             * @description The work order's priority.
             * @enum {string}
             */
            priority: "LOW" | "NORMAL" | "HIGH";
            location: components["schemas"]["Location"];
            /**
             * @description The work order's category.
             * @enum {string|null}
             */
            category?: null | "DRYWALL" | "ELECTRICAL" | "FLOORING" | "GENERAL" | "HVAC" | "LANDSCAPING" | "MASONRY" | "PAINTING" | "PAVING" | "PEST" | "PLUMBING" | "ROOFING" | "TRASH" | "TURNOVER" | "WINDOWS";
            /** @description The work order's description. */
            description?: string | null;
            /** @description The work order's checklist. */
            checklist?: {
                /** @description The ID of the checklist item. */
                id: string;
                /** @description The description of the checklist item. */
                description: string;
                /** @description Whether the checklist item is completed. */
                isCompleted: boolean;
            }[] | null;
            /**
             * Format: date-time
             * @description Timestamp of the WorkOrder's due date.
             */
            dueDate?: Date | null;
            /**
             * Format: date-time
             * @description Timestamp of the WorkOrder's scheduled completion.
             */
            scheduledDateTime?: Date | null;
            /** @description The name of the work order's entry contact, if any. */
            entryContact?: string | null;
            /** @description The phone number of the work order's entry contact, if any. */
            entryContactPhone?: string | null;
            /** @description Notes from the WorkOrder's recipient. */
            contractorNotes?: string | null;
            createdAt: components["schemas"]["CreatedAt"];
            updatedAt: components["schemas"]["UpdatedAt"];
        };
        /** @description An object which contains `promoCode` info under the key `promoCodeInfo`.
         *      */
        PromoCodeInfoResponseField: {
            promoCodeInfo: components["schemas"]["PromoCodeInfo"];
        };
        /** @description An object which contains information about whether a user-provided `promoCode`
         *     is valid, and if so, what percentage discount should be applied at checkout.
         *      */
        PromoCodeInfo: {
            /** @description The original value provided by the user. */
            value: string;
            /** @description Whether the user-provided `promoCode` is valid. */
            isValidPromoCode: boolean;
            /** @description The percentage discount to apply to the total price of the selected
             *     subscription. The returned number reflects a percentage, so a value of
             *     `10` would be a 10% discount. This field is only included in the response
             *     if the user-provided `promoCode` is valid.
             *      */
            discountPercentage?: number;
        };
        /** @description An object which contains data used for completing checkout/payment flows.
         *      */
        CheckoutCompletionInfoResponseField: {
            checkoutCompletionInfo: components["schemas"]["CheckoutCompletionInfo"];
        };
        /** @description An object containing data regarding the status of the user's checkout-flow. In
         *     the event that additional user input is required to complete the transaction,
         *     this object will also contain the Stripe-provided client secret needed for the
         *     front-end to invoke `stripe.handleNextAction`.
         *      */
        CheckoutCompletionInfo: {
            /** @description A boolean indicating whether the checkout-flow is complete. A value of
             *     `true` indicates one of the following success conditions:
             *     - The user/customer owed a non-zero amount which was successfully paid.
             *     - The user/customer initiated a `TRIAL`, and the setup for payments after
             *       the end of the trial-period has been successfully completed.
             *     - The user/customer provided a 100% discount `PROMO_CODE`, and the setup
             *       for payments after the end of the discount-period has been successfully
             *       completed.
             *      */
            isCheckoutComplete: boolean;
            /** @description If additional user input is required to complete the transaction, such as
             *     authenticating with 3D Secure or redirecting to a different site, this
             *     property will contain the Stripe-provided client secret needed for the
             *     front-end to invoke `stripe.handleNextAction`.
             *      */
            clientSecret?: string;
        };
        /** @description An object which contains a link to a Stripe-provided portal. */
        StripeLinkResponseField: {
            /** @description A link to a Stripe-provided portal. */
            stripeLink: string;
        };
        /** @description A Content Security Policy (CSP) violation report. */
        CspViolationReport: {
            "csp-report"?: {
                /** @description The URI of the protected resource that was violated.
                 *      */
                "document-uri"?: string;
                /** @description The URI of the resource that was blocked from loading.
                 *      */
                "blocked-uri"?: string;
                /** @description The HTTP status code of the resource that was blocked from loading.
                 *      */
                "status-code"?: number;
                /** @description The referrer of the protected resource that was violated.
                 *      */
                referrer?: string;
                /** @description The first 40 characters of the inline script, event handler, or style
                 *     that caused the violation.
                 *      */
                "script-sample"?: string;
                /** @description The original policy as specified by the Content-Security-Policy header.
                 *      */
                "original-policy"?: string;
                /**
                 * @description Either "enforce" or "report" depending on whether the Content-Security-Policy
                 *     header or the Content-Security-Policy-Report-Only header is used.
                 *
                 * @enum {string}
                 */
                disposition?: "enforce" | "report";
                /** @description The directive whose enforcement was violated (e.g. "default-src 'self'").
                 *      */
                "violated-directive"?: string;
                /** @description The effective directive that was violated (e.g. 'img-src').
                 *      */
                "effective-directive"?: string;
                /** @description The URI of the resource where the violation occurred.
                 *      */
                "source-file"?: string;
                /** @description The line number in the resource where the violation occurred.
                 *      */
                "line-number"?: number;
                /** @description The column number in the resource where the violation occurred.
                 *      */
                "column-number"?: number;
            };
        };
        /** @description An error response object. */
        Error: {
            error?: string;
        };
        /** @description An object containing the components of an address. */
        Location: {
            /** @description The first line of the location's street address. */
            streetLine1: string;
            /** @description The second line of the location's street address. */
            streetLine2?: string | null;
            /** @description The location's city. */
            city: string;
            /** @description The location's region. */
            region: string;
            /**
             * @description The location's country.
             * @default USA
             */
            country: string;
        };
        /**
         * @description A Fixit subscription price name — this value corresponds to the [Stripe Price
         *     "nickname" field](https://stripe.com/docs/api/prices/object#price_object-nickname).
         *
         * @enum {string}
         */
        SubscriptionPriceName: "ANNUAL" | "MONTHLY" | "TRIAL";
        /** @description Parameters for a user's profile. */
        UserProfile: {
            /** @description The user's display name. */
            displayName: string;
            /** @description The user's family name. */
            familyName?: string | null;
            /** @description The user's given name. */
            givenName?: string | null;
            /** @description The user's business name. */
            businessName?: string | null;
            /** @description The user's profile picture URL. */
            photoUrl?: string | null;
        };
        /**
         * Format: date-time
         * @description The timestamp which indicates when the resource was created.
         */
        CreatedAt: Date;
        /**
         * Format: email
         * @description A user's email address.
         */
        Email: string;
        /** @description A base64-encoded JSON JWT from GoogleID services (auth: google-oauth). */
        GoogleIDToken: string;
        /** @description A user's Fixit handle. */
        Handle: string;
        /**
         * Format: password
         * @description The user's password (auth: local). In order to be valid, a password must meet
         *     all of the following criteria:
         *       - Contains at least one lowercase letter.
         *       - Contains at least one uppercase letter.
         *       - Contains at least one number.
         *       - Contains at least one of `!`, `@`, `#`, `$`, `%`, `^`, `&`, and/or `*`.
         *       - Is at least 6 characters long, and no more than 250 characters long.
         *
         */
        Password: string;
        /** @description The Stripe PaymentMethod ID of the user's chosen payment method. */
        PaymentMethodID: string;
        /** @description A user's phone number. Currently this API only supports US phone numbers. All
         *     whitespace, non-numeric characters, and country/calling code prefixes will be
         *     stripped from the phone number upon receipt, so "+1 (555) 555-5555" will be
         *     treated the same as "5555555555".
         *      */
        Phone: string | null;
        /** @description A user-provided promo code to apply a discount at checkout. */
        PromoCode: string;
        /**
         * Format: uri
         * @description The URL Stripe should redirect the user to upon exiting the Stripe portal.
         *
         */
        ReturnURL: string;
        /**
         * Format: date-time
         * @description The timestamp which indicates when the resource was last updated.
         */
        UpdatedAt: Date;
    };
    responses: {
        /** @description OK */
        "200AuthToken": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["AuthTokenResponseField"];
            };
        };
        /** @description OK */
        "200AuthTokenAndPreFetchedUserItems": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["AuthTokenResponseField"] & components["schemas"]["PreFetchedUserItemsResponseField"];
            };
        };
        /** @description OK */
        "200AuthTokenAndCheckoutCompletionInfo": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["AuthTokenResponseField"] & components["schemas"]["CheckoutCompletionInfoResponseField"];
            };
        };
        /** @description OK */
        "200CheckPromoCode": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["PromoCodeInfoResponseField"];
            };
        };
        /** @description OK */
        "200StripeLink": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["StripeLinkResponseField"];
            };
        };
        /** @description (400) Invalid user input */
        "400InvalidUserInput": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description (401) Authentication required */
        "401AuthenticationRequired": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description (402) Payment required */
        "402PaymentRequired": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description (403) Forbidden — the requesting user is not authorized to perform this action
         *      */
        "403Forbidden": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description (404) Requested resource not found */
        "404ResourceNotFound": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description (5XX) Internal server error */
        "5xxInternalServerError": {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Unexpected response */
        UnexpectedResponse: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
    };
    parameters: never;
    requestBodies: {
        CheckPromoCodeRequest: {
            content: {
                "application/json": {
                    promoCode: components["schemas"]["PromoCode"];
                };
            };
        };
        GoogleTokenRequest: {
            content: {
                "application/json": components["schemas"]["GoogleIDTokenField"];
            };
        };
        LoginRequest: {
            content: {
                "application/json": components["schemas"]["LoginParams"];
            };
        };
        RefreshAuthTokenRequest: {
            content: {
                "application/json": components["schemas"]["ExpoPushTokenParam"];
            };
        };
        StripeLinkRequest: {
            content: {
                "application/json": {
                    returnURL: components["schemas"]["ReturnURL"];
                };
            };
        };
        UserRegistrationRequest: {
            content: {
                "application/json": components["schemas"]["UserRegistrationParams"];
            };
        };
    };
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    CspViolation: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/csp-report": components["schemas"]["CspViolationReport"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            "4XX": components["responses"]["UnexpectedResponse"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    Healthcheck: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /**
                         * @description The string constant "SUCCESS"
                         * @enum {string}
                         */
                        message: "SUCCESS";
                    };
                };
            };
            "4XX": components["responses"]["UnexpectedResponse"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    Login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["LoginRequest"];
        responses: {
            200: components["responses"]["200AuthTokenAndPreFetchedUserItems"];
            400: components["responses"]["400InvalidUserInput"];
            401: components["responses"]["401AuthenticationRequired"];
            "5XX": components["responses"]["5xxInternalServerError"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    Register: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UserRegistrationRequest"];
        responses: {
            200: components["responses"]["200AuthToken"];
            400: components["responses"]["400InvalidUserInput"];
            "5XX": components["responses"]["5xxInternalServerError"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    RefreshToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: components["requestBodies"]["RefreshAuthTokenRequest"];
        responses: {
            200: components["responses"]["200AuthTokenAndPreFetchedUserItems"];
            401: components["responses"]["401AuthenticationRequired"];
            "5XX": components["responses"]["5xxInternalServerError"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    GoogleToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["GoogleTokenRequest"];
        responses: {
            200: components["responses"]["200AuthToken"];
            400: components["responses"]["400InvalidUserInput"];
            401: components["responses"]["401AuthenticationRequired"];
            "5XX": components["responses"]["5xxInternalServerError"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    ConnectAccountLink: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["StripeLinkRequest"];
        responses: {
            200: components["responses"]["200StripeLink"];
            400: components["responses"]["400InvalidUserInput"];
            401: components["responses"]["401AuthenticationRequired"];
            "5XX": components["responses"]["5xxInternalServerError"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    ConnectDashboardLink: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["200StripeLink"];
            401: components["responses"]["401AuthenticationRequired"];
            "5XX": components["responses"]["5xxInternalServerError"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    CheckPromoCode: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CheckPromoCodeRequest"];
        responses: {
            200: components["responses"]["200CheckPromoCode"];
            400: components["responses"]["400InvalidUserInput"];
            401: components["responses"]["401AuthenticationRequired"];
            "5XX": components["responses"]["5xxInternalServerError"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    SubscriptionsCustomerPortal: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["StripeLinkRequest"];
        responses: {
            200: components["responses"]["200StripeLink"];
            400: components["responses"]["400InvalidUserInput"];
            401: components["responses"]["401AuthenticationRequired"];
            "5XX": components["responses"]["5xxInternalServerError"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
    SubscriptionsSubmitPayment: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    selectedSubscription: components["schemas"]["SubscriptionPriceName"];
                    paymentMethodID: components["schemas"]["PaymentMethodID"];
                    promoCode?: components["schemas"]["PromoCode"];
                };
            };
        };
        responses: {
            200: components["responses"]["200AuthTokenAndCheckoutCompletionInfo"];
            400: components["responses"]["400InvalidUserInput"];
            401: components["responses"]["401AuthenticationRequired"];
            "5XX": components["responses"]["5xxInternalServerError"];
            default: components["responses"]["UnexpectedResponse"];
        };
    };
}

