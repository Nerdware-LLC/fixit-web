import Text from "@mui/material/Typography";
import { Anchor } from "@/components/Navigation/Anchor.jsx";
import { Link } from "@/components/Navigation/Link.jsx";
import { ClickToCopyText } from "@/components/Text/ClickToCopyText.jsx";
import { LegalPolicyPageLayout } from "@/layouts/LegalPolicyPageLayout";
import { LegalPolicySection } from "@/layouts/LegalPolicyPageLayout/LegalPolicySection.jsx";
import { PolicyInfoTable } from "@/layouts/LegalPolicyPageLayout/PolicyInfoTable.jsx";
import { APP_PATHS } from "@/routes/appPaths.js";
import { APP_URLS } from "@/routes/appURLs.js";

export const CookiePolicyPage = () => (
  <LegalPolicyPageLayout pageTitle="Cookie Policy" lastUpdated="March 12, 2024">
    <Text>
      This Cookie Policy explains how Nerdware, LLC ("Company," "we," "us," and "our") uses cookies
      and similar technologies to enhance product security and aid in user and/or device recognition
      when you visit our website at{" "}
      <Anchor href={APP_URLS.APP_ORIGIN}>{APP_URLS.APP_ORIGIN}</Anchor>, or any of its relevant
      subdomains ("Website", collectively). It explains what these technologies are and why we use
      them, as well as your rights to control our use of them.
    </Text>
    <Text>
      In some cases we may use cookies for security purposes, such as fraud prevention and
      detection. We may also use cookies to collect personal information, or information that
      becomes personal information if we combine it with other information.
    </Text>

    <LegalPolicySection header="What are cookies?">
      <Text>
        Cookies are small text files that are stored in a computer's browser directory. They help
        site providers with things like understanding how people use a site, remembering a User's
        login details, and storing site preferences. We use "third-party" cookies as well as similar
        technologies (e.g., URL tracking, local storage).
      </Text>
      <Text>
        Cookies set by the website owner (in this case, Nerdware, LLC) are called "first-party
        cookies". Cookies set by parties other than the website owner are called "third-party
        cookies". Third-party cookies enable third-party features or functionality to be provided on
        or through the website (e.g., advertising, interactive content, and analytics). The parties
        that set these third-party cookies can recognize your computer both when it visits the
        website in question and also when it visits certain other websites.
      </Text>
    </LegalPolicySection>

    <LegalPolicySection header="Why do we use cookies?">
      <Text component="span">
        We do not use any first-party cookies. However, we use similar technologies (e.g., local
        storage), as well as third-party cookies. These technologies are used in accordance with our
        Privacy Policy to:
        <ul>
          <li>ensure that our Services function properly,</li>
          <li>
            detect and prevent fraud and violations of our{" "}
            <Link to={APP_PATHS.ToS}>terms of service</Link>,
          </li>
          <li>understand how visitors use and engage with our Site,</li>
          <li>advertise products and services, where allowed and</li>
          <li>analyze and improve our Services and your Site experience.</li>
        </ul>
        Some cookies and/or related technologies (e.g., URL tracking, local storage) are required
        for technical reasons in order for our Website to operate, and we refer to these as
        "essential" or "strictly necessary" cookies. Other cookies also enable us to track and
        target the interests of our users to enhance the experience on our Online Properties. Third
        parties serve cookies through our Website for advertising, analytics, and other purposes.
        This is described in more detail below.
      </Text>
    </LegalPolicySection>

    <LegalPolicySection header="How can I control cookies?">
      <Text>
        You have the right to decide whether to accept or reject cookies. You can exercise your
        cookie rights by setting your preferences in your web browser.
      </Text>
      <Text>
        If you choose to reject cookies, you may still use our website, though your access to some
        functionality and areas of our website may be restricted. You may also set or amend your web
        browser controls to accept or refuse cookies.
      </Text>
      <Text>
        The specific types of third-party cookies served through our Website and the purposes they
        perform are described in the table below (please note that the specific cookies served may
        vary depending on the specific Online Properties you visit):
      </Text>
    </LegalPolicySection>

    <LegalPolicySection header="Essential website cookies:">
      <Text>
        These cookies are strictly necessary to provide you with services available through our
        Website and to use some of its features, such as access to secure areas.
      </Text>
      <PolicyInfoTable
        headers={[
          "Name",
          "Purpose",
          "Provider",
          "Service",
          "Service Privacy Policy",
          "Type",
          "Duration",
        ]}
        dataRows={[
          [
            "m",
            "Tracks the user's session for Stripe",
            "m.stripe.com",
            "Stripe",
            <Anchor key="stripe-privacy-policy" href={APP_URLS.STRIPE_PRIVACY_POLICY}>
              View Stripe's Privacy Policy
            </Anchor>,
            "server_cookie",
            "2 years",
          ],
          [
            "__stripe_mid",
            "Fraud prevention and detection",
            "stripe.com",
            "Stripe",
            <Anchor key="stripe-privacy-policy" href={APP_URLS.STRIPE_PRIVACY_POLICY}>
              View Stripe's Privacy Policy
            </Anchor>,
            "http_cookie",
            "1 year",
          ],
          [
            "__stripe_sid",
            "Fraud prevention and detection",
            "stripe.com",
            "Stripe",
            <Anchor key="stripe-privacy-policy" href={APP_URLS.STRIPE_PRIVACY_POLICY}>
              View Stripe's Privacy Policy
            </Anchor>,
            "http_cookie",
            "30 minutes",
          ],
        ]}
        sx={{ "& td": { textAlign: "center", fontSize: "0.875rem" } }}
      />
    </LegalPolicySection>

    <LegalPolicySection header="How can I control cookies on my browser?">
      <Text component="span">
        As the means by which you can refuse cookies through your web browser controls vary from
        browser to browser, you should visit your browser's help menu for more information. The
        following is information about how to manage cookies on the most popular browsers:
        <ul>
          {[
            {
              browserName: "Chrome",
              link: "https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies",
            },
            {
              browserName: "Internet Explorer",
              link: "https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d",
            },
            {
              browserName: "Firefox",
              link: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US",
            },
            {
              browserName: "Safari",
              link: "https://support.apple.com/en-ie/guide/safari/sfri11471/mac",
            },
            {
              browserName: "Edge",
              link: "https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd",
            },
            { browserName: "Opera", link: "https://help.opera.com/en/latest/web-preferences/" },
          ].map(({ browserName, link }) => (
            <li key={browserName}>
              <Anchor href={link}>{browserName}</Anchor>
            </li>
          ))}
        </ul>
        In addition, most advertising networks offer you a way to opt out of targeted advertising.
        If you would like to find out more information, please visit:
        <ul>
          {[
            {
              name: "Digital Advertising Alliance",
              link: "https://www.aboutads.info/choices/",
            },
            {
              name: "Digital Advertising Alliance of Canada",
              link: "https://youradchoices.ca/",
            },
            {
              name: "European Interactive Digital Advertising Alliance",
              link: "https://www.youronlinechoices.com/",
            },
          ].map(({ name, link }) => (
            <li key={name}>
              <Anchor href={link}>{name}</Anchor>
            </li>
          ))}
        </ul>
      </Text>
    </LegalPolicySection>

    <LegalPolicySection header="What about other tracking technologies, like web beacons?">
      <Text>
        Cookies are not the only way to recognize or track visitors to a website. We, and/or our
        third-party service providers, may use other, similar technologies from time to time, like
        web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics
        files that contain a unique identifier that enables us to recognize when someone has visited
        our Website oropened an email including them. This allows us, for example, to monitor the
        traffic patterns of users from one page within a website to another, to deliver or
        communicate with cookies, to understand whether you have come to the website from an online
        advertisement displayed on a third-party website, to improve site performance, and to
        measure the success of email marketing campaigns. In many instances, these technologies are
        reliant on cookies to function properly, and so declining cookies will impair their
        functioning.
      </Text>
    </LegalPolicySection>

    <LegalPolicySection header="Do you serve targeted advertising?">
      <Text>
        Third parties may serve cookies on your computer or mobile device to serve advertising
        through our Website. These companies may use information about your visits to this and other
        websites in order to provide relevant advertisements about goods and services that you may
        be interested in. They may also employ technology that is used to measure the effectiveness
        of advertisements. They can accomplish this by using cookies or web beacons to collect
        information about your visits to this and other sites in order to provide relevant
        advertisements about goods and services of potential interest to you. The information
        collected through this process does not enable us or them to identify your name, contact
        details, or other details that directly identify you unless you choose to provide these.
      </Text>
    </LegalPolicySection>

    <LegalPolicySection header="How often will you update this Cookie Policy?">
      <Text>
        We may update this Cookie Policy from time to time in order to reflect, for example, changes
        to the cookies we use or for other operational, legal, or regulatory reasons. Please
        therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and
        related technologies.
      </Text>
      <Text>The date at the top of this Cookie Policy indicates when it was last updated.</Text>
    </LegalPolicySection>

    <LegalPolicySection header="Where can I get further information?">
      <Text>
        If you have any questions about our use of cookies or other technologies, please email us at{" "}
        <ClickToCopyText>trevor@nerdware.cloud</ClickToCopyText>
      </Text>
    </LegalPolicySection>
  </LegalPolicyPageLayout>
);

// Exported as "Component" for react-router-dom lazy loading
export const Component = CookiePolicyPage;
