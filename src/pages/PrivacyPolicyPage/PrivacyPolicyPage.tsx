import { TextExternalLink, AnchorLink } from "@components";
import { PageContainer } from "@layouts";

export const PrivacyPolicyPage = () => {
  return (
    <PageContainer
      style={{
        height: "auto",
        width: "95vw",
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <div style={{ padding: "3rem 10rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "0" }}>Privacy Policy</h1>
        <h4>Last updated January 01, 2022</h4>
        <p>
          This privacy notice for Nerdware, LLC ("Company," "we," "us," or "our"), describes how and
          why we might collect, store, use, and/or share ("process") your information when you use
          our services ("Services"), such as when you:
        </p>
        <ul>
          <li>
            Visit our website at{" "}
            <TextExternalLink href="https://gofixit.app" style={styles.links} />, or any website of
            ours that links to this privacy notice
          </li>
          <li>
            Download and use our mobile application (Fixit), or any other application of ours that
            links to this privacy notice
          </li>
          <li>Engage with us in other related ways, including any sales, marketing, or events</li>
        </ul>
        <p>
          <b>Questions or concerns?</b> Reading this privacy notice will help you understand your
          privacy rights and choices. If you do not agree with our policies and practices, please do
          not use our Services. If you still have any questions or concerns, please contact us at
          Trevor@Nerdware.cloud.
        </p>
        <h2>SUMMARY OF KEY POINTS</h2>
        <p style={{ fontStyle: "italic", fontWeight: "bold" }}>
          This summary provides key points from our privacy notice, but you can find out more
          details about any of these topics by clicking the link following each key point or by
          using our table of contents below to find the section you are looking for. You can also
          click <AnchorLink href="#toc" linkText="here" style={styles.links} /> to go directly to
          our table of contents.
        </p>
        <p>
          <b>What personal information do we process?</b> When you visit, use, or navigate our
          Services, we may process personal information depending on how you interact with Nerdware,
          LLC and the Services, the choices you make, and the products and features you use. Click{" "}
          <AnchorLink
            href="#section-1-personal-information-provided-by-you"
            linkText="here"
            style={styles.links}
          />{" "}
          to learn more.
        </p>
        <p>
          <b>Do we process any sensitive personal information?</b> We do not process sensitive
          personal information.
        </p>
        <p>
          <b>Do we receive any information from third parties?</b> We may receive information from
          public databases, marketing partners, social media platforms, and other outside sources.
          Click{" "}
          <AnchorLink
            href="#section-1-information-collected-from-other-sources"
            linkText="here"
            style={styles.links}
          />{" "}
          to learn more.
        </p>
        <p>
          <b>How do we process your information?</b> We process your information to provide,
          improve, and administer our Services, communicate with you, for security and fraud
          prevention, and to comply with law. We may also process your information for other
          purposes with your consent. We process your information only when we have a valid legal
          reason to do so. Click{" "}
          <AnchorLink
            href="#section-2-list-of-info-use-reasons"
            linkText="here"
            style={styles.links}
          />{" "}
          to learn more.
        </p>
        <p>
          <b>In what situations and with which parties do we share personal information?</b> We may
          share information in specific situations and with specific third parties. Click{" "}
          <AnchorLink
            href="#section-3-when-is-personal-info-shared"
            linkText="here"
            style={styles.links}
          />{" "}
          to learn more.
        </p>
        <p>
          <b>How do we keep your information safe?</b> We have organizational and technical
          processes and procedures in place to protect your personal information. However, no
          electronic transmission over the internet or information storage technology can be
          guaranteed to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able to defeat our
          security and improperly collect, access, steal, or modify your information. Click{" "}
          <AnchorLink
            href="#section-6-how-do-we-keep-your-information-safe"
            linkText="here"
            style={styles.links}
          />{" "}
          to learn more.
        </p>
        <p>
          <b>What are your rights?</b> Depending on where you are located geographically, the
          applicable privacy law may mean you have certain rights regarding your personal
          information. Click{" "}
          <AnchorLink
            href="#section-8-what-are-your-privacy-rights"
            linkText="here"
            style={styles.links}
          />{" "}
          to learn more.
        </p>
        <p>
          <b>How do you exercise your rights?</b> The easiest way to exercise your rights is by
          filling out our data subject request form available here:{" "}
          <TextExternalLink href="https://gofixit.app/home" style={styles.links} />, or by
          contacting us. We will consider and act upon any request in accordance with applicable
          data protection laws.
        </p>
        <p>
          Want to learn more about what Nerdware, LLC does with any information we collect? Click
          <AnchorLink href="#toc" linkText="here" style={styles.links} /> to review the notice in
          full.
        </p>
        <h2 id="toc">TABLE OF CONTENTS</h2>
        <div>
          <ol>
            <li>
              <AnchorLink href="#section-1-what-information-do-we-collect" style={styles.links}>
                WHAT INFORMATION DO WE COLLECT?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink href="#section-2-how-do-we-process-your-information" style={styles.links}>
                HOW DO WE PROCESS YOUR INFORMATION?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#section-3-when-and-with-whom-do-we-share-your-personal-information"
                style={styles.links}
              >
                WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#section-4-how-do-we-handle-your-social-logins"
                style={styles.links}
              >
                HOW DO WE HANDLE YOUR SOCIAL LOGINS?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#section-5-how-long-do-we-keep-your-information"
                style={styles.links}
              >
                HOW LONG DO WE KEEP YOUR INFORMATION?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#section-6-how-do-we-keep-your-information-safe"
                style={styles.links}
              >
                HOW DO WE KEEP YOUR INFORMATION SAFE?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#section-7-do-we-collect-information-from-minors"
                style={styles.links}
              >
                DO WE COLLECT INFORMATION FROM MINORS?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink href="#section-8-what-are-your-privacy-rights" style={styles.links}>
                WHAT ARE YOUR PRIVACY RIGHTS?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink href="#section-9-controls-for-do-not-track-features" style={styles.links}>
                CONTROLS FOR DO-NOT-TRACK FEATURES
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#section-10-do-california-residents-have-specific-privacy-rights"
                style={styles.links}
              >
                DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink href="#section-11-do-we-make-updates-to-this-notice" style={styles.links}>
                DO WE MAKE UPDATES TO THIS NOTICE?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#section-12-how-can-you-contact-us-about-this-notice"
                style={styles.links}
              >
                HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
              </AnchorLink>
            </li>
            <li>
              <AnchorLink
                href="#section-13-how-can-you-review-update-or-delete-the-data-we-collect-from-you"
                style={styles.links}
              >
                HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
              </AnchorLink>
            </li>
          </ol>
        </div>
        <div>
          <h2 id="section-1-what-information-do-we-collect">1. WHAT INFORMATION DO WE COLLECT?</h2>
          <p>
            <b>Personal information you disclose to us.</b>
          </p>
          <InShort text="We collect personal information that you provide to us." />
          <p>
            We collect personal information that you voluntarily provide to us when you register on
            the Services, express an interest in obtaining information about us or our products and
            Services, when you participate in activities on the Services, or otherwise when you
            contact us.
          </p>
          <p>
            <b id="section-1-personal-information-provided-by-you">
              Personal Information Provided by You.
            </b>{" "}
            The personal information that we collect depends on the context of your interactions
            with us and the Services, the choices you make, and the products and features you use.
            The personal information we collect may include the following:
          </p>
          <ul>
            <li>phone numbers</li>
            <li>email addresses</li>
            <li>passwords</li>
            <li>contact or authentication data</li>
            <li>contact preferences</li>
            <li>usernames</li>
            <li>job titles</li>
            <li>mailing addresses</li>
            <li>names</li>
            <li>billing addresses</li>
            <li>debit/credit card numbers</li>
          </ul>
          <p>
            <b>Sensitive Information.</b> We do not process sensitive information.
          </p>
          <p>
            <b>Payment Data.</b> We may collect data necessary to process your payment if you make
            purchases, such as your payment instrument number, and the security code associated with
            your payment instrument. All payment data is stored by Stripe. You may find their
            privacy notice link(s) here:{" "}
            <TextExternalLink href="https://stripe.com/privacy" style={styles.links} />.
          </p>
          <p>
            <b>Social Media Login Data.</b> We may provide you with the option to register with us
            using your existing social media account details, like your Facebook, Twitter, or other
            social media account. If you choose to register in this way, we will collect the
            information described in the section called{" "}
            <AnchorLink
              href="#section-4-how-do-we-handle-your-social-logins"
              linkText={'"HOW DO WE HANDLE YOUR SOCIAL LOGINS?"'}
              style={styles.links}
            />
            below.
          </p>
          <p>
            <b>Application Data.</b> If you use our application(s), we also may collect the
            following information if you choose to provide us with access or permission:
          </p>
          <ul>
            <li>
              <p>
                <i>Geolocation Information.</i> We may request access or permission to track
                location-based information from your mobile device, either continuously or while you
                are using our mobile application(s), to provide certain location-based services. If
                you wish to change our access or permissions, you may do so in your device's
                settings.
              </p>
            </li>
            <li>
              <p>
                <i>Mobile Device Access.</i> We may request access or permission to certain features
                from your mobile device, including your mobile device's calendar, camera, contacts,
                sms messages, social media accounts, storage, push notifications, profile picture,
                and other features. If you wish to change our access or permissions, you may do so
                in your device's settings.
              </p>
            </li>
            <li>
              <p>
                <i>Mobile Device Data.</i> We automatically collect device information (such as your
                mobile device ID, model, and manufacturer), operating system, version information
                and system configuration information, device and application identification numbers,
                browser type and version, hardware model Internet service provider and/or mobile
                carrier, and Internet Protocol (IP) address (or proxy server). If you are using our
                application(s), we may also collect information about the phone network associated
                with your mobile device, your mobile device's operating system or platform, the type
                of mobile device you use, your mobile device's unique device ID, and information
                about the features of our application(s) you accessed.
              </p>
            </li>
            <li>
              <p>
                <i>Push Notifications.</i> We may request to send you push notifications regarding
                your account or certain features of the application(s). If you wish to opt out from
                receiving these types of communications, you may turn them off in your device's
                settings.
              </p>
            </li>
          </ul>
          <p>
            This information is primarily needed to maintain the security and operation of our
            application(s), for troubleshooting, and for our internal analytics and reporting
            purposes.
          </p>
          <p>
            All personal information that you provide to us must be true, complete, and accurate,
            and you must notify us of any changes to such personal information.
          </p>
          <h3 id="section-1-information-collected-from-other-sources">
            Information collected from other sources
          </h3>
          <InShort text="We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources." />
          <p>
            In order to enhance our ability to provide relevant marketing, offers, and services to
            you and update our records, we may obtain information about you from other sources, such
            as public databases, joint marketing partners, affiliate programs, data providers,
            social media platforms, and from other third parties. This information includes mailing
            addresses, job titles, email addresses, phone numbers, intent data (or user behavior
            data), Internet Protocol (IP) addresses, social media profiles, social media URLs, and
            custom profiles, for purposes of targeted advertising and event promotion. If you
            interact with us on a social media platform using your social media account (e.g.,
            Facebook or Twitter), we receive personal information about you such as your name, email
            address, and gender. Any personal information that we collect from your social media
            account depends on your social media account's privacy settings.
          </p>
        </div>
        <div>
          <h2 id="section-2-how-do-we-process-your-information">
            2. HOW DO WE PROCESS YOUR INFORMATION?
          </h2>
          <InShort text="We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent." />
          <h4 id="section-2-list-of-info-use-reasons">
            We process your personal information for a variety of reasons, depending on how you
            interact with our Services, including:
          </h4>
          <ul>
            <li>
              To facilitate account creation and authentication and otherwise manage user accounts.
              We may process your information so you can create and log in to your account, as well
              as keep your account in working order.
            </li>
            <li>
              To deliver and facilitate delivery of services to the user. We may process your
              information to provide you with the requested service.
            </li>
            <li>
              To respond to user inquiries/offer support to users. We may process your information
              to respond to your inquiries and solve any potential issues you might have with the
              requested service.
            </li>
            <li>
              To enable user-to-user communications. We may process your information if you choose
              to use any of our offerings that allow for communication with another user.
            </li>
            <li>
              To request feedback. We may process your information when necessary to request
              feedback and to contact you about your use of our Services.
            </li>
            <li>
              To evaluate and improve our Services, products, marketing, and your experience. We may
              process your information when we believe it is necessary to identify usage trends,
              determine the effectiveness of our promotional campaigns, and to evaluate and improve
              our Services, products, marketing, and your experience.
            </li>
          </ul>
        </div>
        <div>
          <h2 id="section-3-when-and-with-whom-do-we-share-your-personal-information">
            3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </h2>
          <InShort text="We may share information in specific situations described in this section and/or with the following third parties." />
          <p id="section-3-when-is-personal-info-shared">
            We may need to share your personal information in the following situations:
          </p>
          <ul>
            <li>
              <b>Business Transfers.</b> We may share or transfer your information in connection
              with, or during negotiations of, any merger, sale of company assets, financing, or
              acquisition of all or a portion of our business to another company.
            </li>
          </ul>
        </div>
        <div>
          <h2 id="section-4-how-do-we-handle-your-social-logins">
            4. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </h2>
          <InShort text="If you choose to register or log in to our Services using a social media account, we may have access to certain information about you." />
          <p>
            Our Services offer you the ability to register and log in using your third-party social
            media account details (like your Facebook or Twitter logins). Where you choose to do
            this, we will receive certain profile information about you from your social media
            provider. The profile information we receive may vary depending on the social media
            provider concerned, but will often include your name, email address, friends list, and
            profile picture, as well as other information you choose to make public on such a social
            media platform.
          </p>
          <p>
            We will use the information we receive only for the purposes that are described in this
            privacy notice or that are otherwise made clear to you on the relevant Services. Please
            note that we do not control, and are not responsible for, other uses of your personal
            information by your third-party social media provider. We recommend that you review
            their privacy notice to understand how they collect, use, and share your personal
            information, and how you can set your privacy preferences on their sites and apps.
          </p>
        </div>
        <div>
          <h2 id="section-5-how-long-do-we-keep-your-information">
            5. HOW LONG DO WE KEEP YOUR INFORMATION?
          </h2>
          <InShort text="We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law." />
          <p>
            We will only keep your personal information for as long as it is necessary for the
            purposes set out in this privacy notice, unless a longer retention period is required or
            permitted by law (such as tax, accounting, or other legal requirements). No purpose in
            this notice will require us keeping your personal information for longer than the period
            of time in which users have an account with us.
          </p>
          <p>
            When we have no ongoing legitimate business need to process your personal information,
            we will either delete or anonymize such information, or, if this is not possible (for
            example, because your personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from any further processing
            until deletion is possible.
          </p>
        </div>
        <div>
          <h2 id="section-6-how-do-we-keep-your-information-safe">
            6. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </h2>
          <InShort text="We aim to protect your personal information through a system of organizational and technical security measures." />
          <p>
            We have implemented appropriate and reasonable technical and organizational security
            measures designed to protect the security of any personal information we process.
            However, despite our safeguards and efforts to secure your information, no electronic
            transmission over the Internet or information storage technology can be guaranteed to be
            100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other
            unauthorized third parties will not be able to defeat our security and improperly
            collect, access, steal, or modify your information. Although we will do our best to
            protect your personal information, transmission of personal information to and from our
            Services is at your own risk. You should only access the Services within a secure
            environment.
          </p>
        </div>
        <div>
          <h2 id="section-7-do-we-collect-information-from-minors">
            7. DO WE COLLECT INFORMATION FROM MINORS?
          </h2>
          <InShort text="We do not knowingly collect data from or market to children under 18 years of age." />
          <p>
            We do not knowingly solicit data from or market to children under 18 years of age. By
            using the Services, you represent that you are at least 18 or that you are the parent or
            guardian of such a minor and consent to such minor dependent's use of the Services. If
            we learn that personal information from users less than 18 years of age has been
            collected, we will deactivate the account and take reasonable measures to promptly
            delete such data from our records. If you become aware of any data we may have collected
            from children under age 18, please contact us at Trevor@Nerdware.cloud.
          </p>
        </div>
        <div>
          <h2 id="section-8-what-are-your-privacy-rights">8. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
          <InShort text="You may review, change, or terminate your account at any time." />
          <p>
            If you are located in the EEA or UK and you believe we are unlawfully processing your
            personal information, you also have the right to complain to your local data protection
            supervisory authority. You can find their contact details here:{" "}
            <TextExternalLink
              href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html"
              style={styles.links}
            />
            .
          </p>
          <p>
            If you are located in Switzerland, the contact details for the data protection
            authorities are available here:{" "}
            <TextExternalLink
              href="https://www.edoeb.admin.ch/edoeb/en/home.html"
              style={styles.links}
            />
            .
          </p>
          <p>
            Withdrawing your consent: If we are relying on your consent to process your personal
            information, which may be express and/or implied consent depending on the applicable
            law, you have the right to withdraw your consent at any time. You can withdraw your
            consent at any time by contacting us by using the contact details provided in the
            section{" "}
            <AnchorLink
              href="#section-12-how-can-you-contact-us-about-this-notice"
              linkText={'"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"'}
              style={styles.links}
            />{" "}
            below.
          </p>
          <p>
            However, please note that this will not affect the lawfulness of the processing before
            its withdrawal nor, when applicable law allows, will it affect the processing of your
            personal information conducted in reliance on lawful processing grounds other than
            consent.
          </p>
          <p>Account Information</p>
          <p>
            If you would at any time like to review or change the information in your account or
            terminate your account, you can:
          </p>
          <ul>
            <li>Log in to your account settings and update your user account.</li>
          </ul>
          <p>
            Upon your request to terminate your account, we will deactivate or delete your account
            and information from our active databases. However, we may retain some information in
            our files to prevent fraud, troubleshoot problems, assist with any investigations,
            enforce our legal terms and/or comply with applicable legal requirements.
          </p>
          <p>
            If you have questions or comments about your privacy rights, you may email us at
            Trevor@Nerdware.cloud.
          </p>
        </div>
        <div>
          <h2 id="section-9-controls-for-do-not-track-features">
            9. CONTROLS FOR DO-NOT-TRACK FEATURES
          </h2>
          <p>
            Most web browsers and some mobile operating systems and mobile applications include a
            Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy
            preference not to have data about your online browsing activities monitored and
            collected. At this stage no uniform technology standard for recognizing and implementing
            DNT signals has been finalized. As such, we do not currently respond to DNT browser
            signals or any other mechanism that automatically communicates your choice not to be
            tracked online. If a standard for online tracking is adopted that we must follow in the
            future, we will inform you about that practice in a revised version of this privacy
            notice.
          </p>
        </div>
        <div>
          <h2 id="section-10-do-california-residents-have-specific-privacy-rights">
            10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </h2>
          <InShort text="Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information." />
          <p>
            California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits
            our users who are California residents to request and obtain from us, once a year and
            free of charge, information about categories of personal information (if any) we
            disclosed to third parties for direct marketing purposes and the names and addresses of
            all third parties with which we shared personal information in the immediately preceding
            calendar year. If you are a California resident and would like to make such a request,
            please submit your request in writing to us using the contact information provided
            below.
          </p>
          <p>
            If you are under 18 years of age, reside in California, and have a registered account
            with Services, you have the right to request removal of unwanted data that you publicly
            post on the Services. To request removal of such data, please contact us using the
            contact information provided below and include the email address associated with your
            account and a statement that you reside in California. We will make sure the data is not
            publicly displayed on the Services, but please be aware that the data may not be
            completely or comprehensively removed from all our systems (e.g., backups, etc.).
          </p>
          <p>CCPA Privacy Notice</p>
          <p>The California Code of Regulations defines a "resident" as:</p>
          <ol>
            <li>
              every individual who is in the State of California for other than a temporary or
              transitory purpose and
            </li>
            <li>
              every individual who is domiciled in the State of California who is outside the State
              of California for a temporary or transitory purpose
            </li>
          </ol>
          <p>All other individuals are defined as "non-residents."</p>
          <p>
            If this definition of "resident" applies to you, we must adhere to certain rights and
            obligations regarding your personal information.
          </p>
          <p>What categories of personal information do we collect?</p>
          <p>
            We have collected the following categories of personal information in the past twelve
            (12) months:
          </p>
          <table style={{ borderCollapse: "collapse", border: "1px solid" }}>
            <thead>
              <tr>
                <th style={styles.tableCells}>Category</th>
                <th style={styles.tableCells}>Examples</th>
                <th style={styles.tableCells}>Collected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.tableCells}>A. Identifiers</td>
                <td style={styles.tableCells}>
                  Contact details, such as real name, alias, postal address, telephone or mobile
                  contact number, unique personal identifier, online identifier, Internet Protocol
                  address, email address, and account name
                </td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>
                  B. Personal information categories listed in the California Customer Records
                  statute
                </td>
                <td style={styles.tableCells}>
                  Name, contact information, education, employment, employment history, and
                  financial information
                </td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>
                  C. Protected classification characteristics under California or federal law
                </td>
                <td style={styles.tableCells}>Gender and date of birth</td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>D. Commercial information</td>
                <td style={styles.tableCells}>
                  Transaction information, purchase history, financial details, and payment
                  information
                </td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>E. Biometric information</td>
                <td style={styles.tableCells}>Fingerprints and voiceprints</td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>F. Internet or other similar network activity</td>
                <td style={styles.tableCells}>
                  Browsing history, search history, online behavior, interest data, and interactions
                  with our and other websites, applications, systems, and advertisements
                </td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>G. Geolocation data</td>
                <td style={styles.tableCells}>Device location</td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>
                  H. Audio, electronic, visual, thermal, olfactory, or similar information
                </td>
                <td style={styles.tableCells}>
                  Images and audio, video or call recordings created in connection with our business
                  activities
                </td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>I. Professional or employment-related information</td>
                <td style={styles.tableCells}>
                  Business contact details in order to provide you our Services at a business level
                  or job title, work history, and professional qualifications if you apply for a job
                  with us
                </td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>J. Education Information</td>
                <td style={styles.tableCells}>Student records and directory information</td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
              <tr>
                <td style={styles.tableCells}>
                  K. Inferences drawn from other personal information
                </td>
                <td style={styles.tableCells}>
                  Inferences drawn from any of the collected personal information listed above to
                  create a profile or summary about, for example, an individual's preferences and
                  characteristics
                </td>
                <td style={{ ...styles.tableCells, textAlign: "center" }}>NO</td>
              </tr>
            </tbody>
          </table>
          <p>
            We may also collect other personal information outside of these categories through
            instances where you interact with us in person, online, or by phone or mail in the
            context of:
          </p>
          <ul>
            <li>Receiving help through our customer support channels;</li>
            <li>Participation in customer surveys or contests; and</li>
            <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
          </ul>
          <p>How do we use and share your personal information?</p>
          <p>
            More information about our data collection and sharing practices can be found in this
            privacy notice.
          </p>
          <p>
            You may contact us By mailing to 4694 Cemetery Road #398, Hilliard, OH 43026, or by
            referring to the contact details at the bottom of this document.
          </p>
          <p>
            If you are using an authorized agent to exercise your right to opt out we may deny a
            request if the authorized agent does not submit proof that they have been validly
            authorized to act on your behalf.
          </p>
          <p>Will your information be shared with anyone else?</p>
          <p>
            We may disclose your personal information with our service providers pursuant to a
            written contract between us and each service provider. Each service provider is a
            for-profit entity that processes the information on our behalf.
          </p>
          <p>
            We may use your personal information for our own business purposes, such as for
            undertaking internal research for technological development and demonstration. This is
            not considered to be "selling" of your personal information.
          </p>
          <p>
            Nerdware, LLC has not disclosed or sold any personal information to third parties for a
            business or commercial purpose in the preceding twelve (12) months. Nerdware, LLC will
            not sell personal information in the future belonging to website visitors, users, and
            other consumers.
          </p>
          <p>Your rights with respect to your personal data</p>
          <p>Right to request deletion of the data — Request to delete</p>
          <p>
            You can ask for the deletion of your personal information. If you ask us to delete your
            personal information, we will respect your request and delete your personal information,
            subject to certain exceptions provided by law, such as (but not limited to) the exercise
            by another consumer of his or her right to free speech, our compliance requirements
            resulting from a legal obligation, or any processing that may be required to protect
            against illegal activities.
          </p>
          <p>Right to be informed — Request to know</p>
          <p>Depending on the circumstances, you have a right to know:</p>
          <ul>
            <li>whether we collect and use your personal information;</li>
            <li>the categories of personal information that we collect;</li>
            <li>the purposes for which the collected personal information is used;</li>
            <li>whether we sell your personal information to third parties;</li>
            <li>
              the categories of personal information that we sold or disclosed for a business
              purpose;
            </li>
            <li>
              the categories of third parties to whom the personal information was sold or disclosed
              for a business purpose; and
            </li>
            <li>
              the business or commercial purpose for collecting or selling personal information.
            </li>
          </ul>
          <p>
            In accordance with applicable law, we are not obligated to provide or delete consumer
            information that is de-identified in response to a consumer request or to re-identify
            individual data to verify a consumer request.
          </p>
          <p>Right to Non-Discrimination for the Exercise of a Consumer's Privacy Rights</p>
          <p>We will not discriminate against you if you exercise your privacy rights.</p>
          <p>Verification process</p>
          <p>
            Upon receiving your request, we will need to verify your identity to determine you are
            the same person about whom we have the information in our system. These verification
            efforts require us to ask you to provide information so that we can match it with
            information you have previously provided us. For instance, depending on the type of
            request you submit, we may ask you to provide certain information so that we can match
            the information you provide with the information we already have on file, or we may
            contact you through a communication method (e.g., phone or email) that you have
            previously provided to us. We may also use other verification methods as the
            circumstances dictate. We will only use personal information provided in your request to
            verify your identity or authority to make the request. To the extent possible, we will
            avoid requesting additional information from you for the purposes of verification.
            However, if we cannot verify your identity from the information already maintained by
            us, we may request that you provide additional information for the purposes of verifying
            your identity and for security or fraud-prevention purposes. We will delete such
            additionally provided information as soon as we finish verifying you. Other privacy
            rights
          </p>
          <ul>
            <li>You may object to the processing of your personal information.</li>
            <li>
              You may request correction of your personal data if it is incorrect or no longer
              relevant, or ask to restrict the processing of the information.
            </li>
            <li>
              You can designate an authorized agent to make a request under the CCPA on your behalf.
              We may deny a request from an authorized agent that does not submit proof that they
              have been validly authorized to act on your behalf in accordance with the CCPA.
            </li>
            <li>
              You may request to opt out from future selling of your personal information to third
              parties. Upon receiving an opt-out request, we will act upon the request as soon as
              feasibly possible, but no later than fifteen (15) days from the date of the request
              submission.
            </li>
          </ul>
          <p>
            To exercise these rights, you can contact us By mailing to 4694 Cemetery Road #398,
            Hilliard, OH 43026, or by referring to the contact details at the bottom of this
            document. If you have a complaint about how we handle your data, we would like to hear
            from you.
          </p>
        </div>
        <div>
          <h2 id="section-11-do-we-make-updates-to-this-notice">
            11. DO WE MAKE UPDATES TO THIS NOTICE?
          </h2>
          <InShort text="Yes, we will update this notice as necessary to stay compliant with relevant laws." />
          <p>
            We may update this privacy notice from time to time. The updated version will be
            indicated by an updated "Revised" date and the updated version will be effective as soon
            as it is accessible. If we make material changes to this privacy notice, we may notify
            you either by prominently posting a notice of such changes or by directly sending you a
            notification. We encourage you to review this privacy notice frequently to be informed
            of how we are protecting your information.
          </p>
        </div>
        <div>
          <h2 id="section-12-how-can-you-contact-us-about-this-notice">
            12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </h2>
          <p>
            If you have questions or comments about this notice, you may contact our Data Protection
            Officer (DPO), Trevor Anderson, by email at Trevor@Nerdware.cloud, by phone at
            1-614-570-7555, or by post to:
          </p>
          <p>
            Nerdware, LLC Trevor Anderson 4694 Cemetery Road #398 Hilliard, OH 43026 United States
          </p>
        </div>
        <div>
          <h2 id="section-13-how-can-you-review-update-or-delete-the-data-we-collect-from-you">
            13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
          </h2>
          <p>
            Based on the applicable laws of your country, you may have the right to request access
            to the personal information we collect from you, change that information, or delete it.
            To request to review, update, or delete your personal information, please visit:{" "}
            <TextExternalLink href="https://gofixit.app/home" style={styles.links} />.
          </p>
          <p></p>
        </div>
      </div>
    </PageContainer>
  );
};

const InShort = ({ text }: { text: string }) => (
  <p>
    <i>
      <b>In Short: </b>
      {text}
    </i>
  </p>
);

const styles = {
  links: {
    textDecoration: "none"
  },
  tableCells: {
    border: "1px solid",
    padding: "0.25rem"
  }
};
