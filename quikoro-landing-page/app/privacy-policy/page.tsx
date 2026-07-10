import SecondaryNavbar from "@/components/global/SecondaryNavbar";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SecondaryNavbar />
      <div className="w-full relative max-w-7xl mx-auto padding-x pt-40 md:pt-48 pb-10">
        <h2 className="text-[24px] font-semibold leading-none">
          Privacy Policy
        </h2>

        <div className="w-full border my-5" />

        <div className="w-full">
          <p className="">Last Updated: June 30, 2026</p>

          <p className="mt-2">
            This Privacy Policy explains how quikoro (“quikoro,” “we,” “us,” or
            “our”) collects, uses, shares, and protects information when you use
            the quikoro Customer App, the quikoro Provider App, and the quikoro
            website (together, the “Services”).
          </p>

          <p className="mt-2">
            By creating an account or otherwise using the Services, you agree to
            the collection and use of information as described in this Privacy
            Policy. If you do not agree, please do not use the Services.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            1. Who This Policy Covers
          </h3>

          <p className="">
            This Policy applies to two distinct types of users:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Customers – individuals who search for and book local service providers through the quikoro Customer App",
              "Providers – individuals or businesses (plumbers, electricians, tutors, carpenters, painters, cleaners, and other service categories) who register to offer services through the quikoro Provider App",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <p className="mt-2">
            Where a section applies only to one group, this is stated
            explicitly.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            2. Information We Collect
          </h3>

          <h4 className="font-semibold text-lg mt-3 mb-2">
            2.1 Information You Provide Directly
          </h4>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Account information: name, email address, password, and authentication details (including information received from Google Sign-In if you choose that method)",
              "Profile information (Customers): photo and city",
              "Profile information (Providers): photo, city, service category/speciality, years of experience, description/bio, and availability schedule",
              "Booking information: preferred date, service address or area, and any notes added when creating or responding to a booking request",
              "Chat messages: text messages exchanged between a Customer and a Provider within an active booking",
              "Ratings and reviews: star ratings and written feedback submitted after a completed booking",
              "Reports: information submitted when reporting a profile (reason selected and any details provided)",
              "Customer support communications: any information you share when contacting us for help",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h4 className="font-semibold text-lg mt-3 mb-2">
            2.2 Location Information
          </h4>

          <p className="">
            Providers manually set their service location by placing a pin on a
            map (OpenStreetMap). This location is used to determine search
            visibility to nearby Customers and is replaced each time the
            Provider updates it. We do not continuously track a Provider’s
            real-time GPS location in the background; location is only updated
            when the Provider actively chooses to do so.
          </p>

          <p className="mt-2">
            Customers may select an area or drop a pin to search for nearby
            Providers. This search location is used only to return relevant
            results.
          </p>

          <h4 className="font-semibold text-lg mt-3 mb-2">
            2.3 Information Collected Automatically
          </h4>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Device information: device model, operating system, unique device identifiers, and app version",
              "Usage data: pages or screens viewed, features used, search queries, and interaction timestamps",
              "Log data: IP address, access times, and crash or error reports",
              "Push notification tokens: used to deliver booking, chat, and approval-related notifications via Firebase Cloud Messaging",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h4 className="font-semibold text-lg mt-3 mb-2">
            2.4 Information From Third Parties
          </h4>

          <p className="">
            If you sign up or log in using Google authentication, we receive the
            basic profile information you authorize Google to share with us
            (typically name, email address, and profile photo).
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            3. How We Use Information
          </h3>

          <p className="">We use the information we collect to:</p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Create, verify, and manage Customer and Provider accounts",
              "Review and approve or reject Provider applications (admin approval process)",
              "Operate search and discovery, showing nearby approved Providers sorted by rating and relevance",
              "Facilitate booking requests, acceptance, decline, and status updates between Customers and Providers",
              "Enable in-app chat tied to a specific active booking",
              "Process and display ratings and reviews after a completed booking",
              "Review reported profiles and take appropriate enforcement action",
              "Send push notifications and emails related to account approval, bookings, and chat",
              "Maintain the safety, security, and integrity of the Services, including fraud prevention and abuse detection",
              "Respond to customer support requests",
              "Comply with legal obligations and enforce our Terms and Conditions",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <p className="mt-2">
            quikoro is a free platform and does not process online payments at
            this time. Bookings are settled as cash payment directly between
            Customer and Provider at the time of service. We do not collect or
            store payment card or bank account information through the Services.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            4. How We Share Information
          </h3>

          <p className="">
            We do not sell your personal information. We share information only
            in the following circumstances:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Between Customers and Providers: to facilitate a booking, the Customer's name, photo, booking address/area, and notes are shared with the assigned Provider, and the Provider's profile information is visible to Customers as part of normal Service functionality",
              "Public profile and reviews: a Provider's profile (photo, name, category, experience, description, availability, area, rating, and written reviews) is visible to all Customers using the Services",
              "Service providers (vendors): we use third-party infrastructure providers for hosting, push notifications (Firebase), email delivery, and mapping (OpenStreetMap) who process data on our behalf under appropriate confidentiality and data protection terms",
              "Admin Panel access: authorized quikoro administrators can access account, booking, and report data solely to operate, moderate, and secure the platform",
              "Legal and safety reasons: where required by law, legal process, or to protect the rights, property, or safety of quikoro, our users, or the public, including in response to a report of suspected harm to a child (see our Child Safety Standards)",
              "Business transfers: in connection with a merger, acquisition, restructuring, or sale of assets, subject to continued protection of your information under this Policy",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">5. Data Retention</h3>

          <p className="">
            We retain account, booking, chat, rating, and report information for
            as long as your account is active and for a reasonable period
            afterward to comply with legal obligations, resolve disputes,
            enforce agreements, and maintain platform safety records. Chat
            conversations remain accessible to the Customer and Provider
            involved until the related booking is marked Completed or Cancelled,
            after which the conversation is closed; we may retain a record of
            closed conversations for safety and dispute-resolution purposes as
            described above.
          </p>

          <p className="mt-2">
            If you delete your account, we will delete or anonymize your
            personal information within a reasonable period, except where
            retention is required for legal, safety, fraud-prevention, or
            legitimate record-keeping purposes (for example, dispute history or
            moderation records related to reported content).
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            6. Your Rights and Choices
          </h3>

          <p className="">
            Depending on your location, you may have rights to:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Access the personal information we hold about you",
              "Correct inaccurate or incomplete information",
              "Request deletion of your account and associated personal information, subject to Section 5",
              "Object to or restrict certain processing",
              "Request a copy of your data in a portable format",
              "Withdraw consent where processing is based on consent (for example, push notifications)",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <p className="mt-2">
            You can update most profile information directly within the app. To
            exercise other rights, contact us at support@quikoro.com. We will
            respond within the timeframe required by applicable law.
          </p>

          <p className="mt-2">
            You can manage push notification permissions through your device
            settings at any time.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            7. Children’s Privacy
          </h3>

          <p className="">
            The Services are not directed to, and are not intended for use by,
            individuals under the age of 18. We do not knowingly collect
            personal information from children. Both the Customer App and
            Provider App require users to confirm they meet the minimum age
            requirement during onboarding.
          </p>

          <p className="mt-2">
            If we become aware that we have inadvertently collected personal
            information from a child, we will take steps to delete that
            information promptly. If you believe a child has created an account
            or provided us with personal information, please contact us
            immediately at support@quikoro.com. See also our separate Child
            Safety Standards document, which describes our approach to
            preventing child sexual abuse and exploitation (CSAE) across the
            Services.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">8. Data Security</h3>

          <p className="">
            We implement administrative, technical, and organizational
            safeguards designed to protect personal information against
            unauthorized access, alteration, disclosure, or destruction,
            including access controls on the Admin Panel, encrypted data
            transmission, and restricted internal access on a need-to-know
            basis. However, no method of transmission or storage is completely
            secure, and we cannot guarantee absolute security.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            9. International Data Transfers
          </h3>

          <p className="">
            quikoro operates globally and may process and store information in
            countries other than the one in which you reside. Where we transfer
            personal information across borders, we take reasonable steps to
            ensure it receives a level of protection consistent with this Policy
            and applicable law.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            10. Third-Party Services and Links
          </h3>

          <p className="">
            The Services use OpenStreetMap for location and mapping features and
            Firebase for push notifications. These providers may collect
            information governed by their own privacy policies. Provider
            profiles and reviews may be visible to the public; please use
            discretion when sharing information through bios, descriptions,
            chat, or reviews. quikoro is not responsible for the privacy
            practices of third-party websites or services that may be linked
            from the Services.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            11. Changes to This Privacy Policy
          </h3>

          <p className="">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, legal requirements, or other
            factors. We will post the updated Policy with a revised “Last
            Updated” date and, where changes are material, provide additional
            notice (such as an in-app notification or email) before the changes
            take effect.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">12. Contact Us</h3>

          <p className="">
            If you have questions, concerns, or requests regarding this Privacy
            Policy or your personal information, please contact us at:
          </p>

          <p className="">
            <span className="font-medium">Email: </span>{" "}
            <Link
              href={`mailto:support@quikoro.com`}
              className="hover:text-blue-600 hover:underline transition-all duration-100"
            >
              support@quikoro.com
            </Link>
          </p>

          <p className="">
            <span className="font-medium">Website: </span>{" "}
            <Link
              href={`https://www.quikoro.com`}
              target="_blank"
              className="hover:text-blue-600 hover:underline transition-all duration-100"
            >
              https://www.quikoro.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
