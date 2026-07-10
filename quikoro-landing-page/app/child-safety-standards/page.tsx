import SecondaryNavbar from "@/components/global/SecondaryNavbar";
import Link from "next/link";

const ChildSafetyStandards = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SecondaryNavbar />
      <div className="w-full relative max-w-7xl mx-auto padding-x pt-40 md:pt-48 pb-10">
        <h2 className="text-[24px] font-semibold leading-none">
          Child Safety Standards
        </h2>

        <div className="w-full border my-5" />

        <div className="w-full">
          <p className="">Last Updated: June 30, 2026</p>

          <p className="mt-2">
            quikoro is committed to protecting children from sexual abuse and
            exploitation across the quikoro Customer App, the quikoro Provider
            App, and the quikoro website (together, the “Services”). This
            document sets out our published standards against Child Sexual Abuse
            and Exploitation (“CSAE”), consistent with the requirements of app
            store child safety policies, including Google Play’s Child Safety
            Standards policy, and informed by the Tech Coalition’s best
            practices for combating online CSEA.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">1. Our Commitment</h3>

          <p className="">
            quikoro strictly prohibits child sexual abuse material (CSAM) and
            any conduct that sexualizes, exploits, endangers, or grooms a minor,
            anywhere on our Services. This applies to all users – Customers and
            Providers alike – and to every feature that allows user-generated
            content or communication, including profile photos, descriptions,
            ratings, written reviews, and in-app chat.
          </p>

          <p className="mt-2">
            This commitment applies regardless of whether the Services are
            directed at, marketed to, or used by minors. The Services require
            all users to be at least 18 years old to register an account.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            2. Prohibited Conduct and Content
          </h3>

          <p className="">
            The following are strictly prohibited on the Services, without
            exception:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Uploading, sharing, soliciting, or distributing CSAM in any form",
              "Sexualizing a minor in any image, text, profile content, chat message, or review",
              "Grooming behavior, including attempts to build a relationship with a minor for the purpose of sexual abuse or exploitation, or attempts to isolate a minor from trusted adults or move communication off-platform for that purpose",
              "Soliciting, advertising, or facilitating sex trafficking, sex tourism, or any commercial sexual exploitation involving a minor",
              "Misrepresenting a user's age to circumvent the minimum age requirement, or operating an account on behalf of or for the benefit of a minor in a manner that exposes the minor to the conduct described above",
              "Using the booking, chat, or review features to arrange, request, or discuss sexual contact with a minor",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <p className="mt-2">
            Any account engaging in the conduct above will be permanently
            removed from the Services, and the matter will be handled in
            accordance with Section 4 below.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            3. Built-In Protections
          </h3>

          <p className="">
            The design of the Services includes the following safeguards
            relevant to child safety:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Minimum age requirement: all users must confirm they are 18 or older during onboarding for both the Customer App and Provider App",
              "Provider admin approval: every Provider profile is reviewed by quikoro's admin team before it becomes visible to Customers, allowing for screening of profile content prior to publication",
              "Scoped chat: in-app chat is only enabled between a Customer and a Provider after a booking is confirmed, is tied to that specific booking, and automatically closes once the booking is marked Completed or Cancelled – limiting open-ended, unscoped contact between users",
              "In-app reporting: a Report button is available on every Provider profile, with reasons including Fake Profile, Inappropriate Behaviour, and Spam, in addition to Other for any concern not covered by those categories – including suspected CSAE",
              "Admin review and enforcement: reported profiles are routed to the Admin Panel, where quikoro administrators can investigate and take action, including suspension or permanent removal",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            4. Reporting Mechanism
          </h3>

          <p className="">
            quikoro provides a mechanism within the Services for users to submit
            feedback, concerns, or reports, including reports related to
            suspected CSAE:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "In-app: use the Report button available on any Provider profile and select the relevant reason (or “Other” to describe a concern not listed)",
              "Direct contact: email our designated child safety point of contact at support@quikoro.com",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <p className="mt-2">
            Reports are reviewed by quikoro’s admin and trust & safety
            personnel. Reports involving suspected CSAE are prioritized for
            expedited review.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            5. Our Response to CSAM and CSAE
          </h3>

          <p className="">
            quikoro will take appropriate action in accordance with these
            published standards and applicable law upon obtaining actual
            knowledge of CSAM or other CSAE on the Services, including:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Immediate removal of the offending content from the Services",
              "Immediate and permanent suspension of the account(s) responsible for the violation",
              "Preservation of relevant account and content records to the extent required to support a legal or law enforcement process",
              "Reporting confirmed CSAM to the National Center for Missing & Exploited Children (NCMEC) or the equivalent competent authority in the relevant jurisdiction, where required by applicable law",
              "Cooperating with law enforcement requests related to child safety, consistent with applicable legal process",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <p className="mt-2">
            quikoro does not tip off, warn, or otherwise alert an account holder
            under investigation for suspected CSAE prior to or during a law
            enforcement referral.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            6. Compliance With Child Safety Laws
          </h3>

          <p className="">
            quikoro is committed to complying with applicable child safety laws
            and regulations in the jurisdictions where the Services are offered,
            including laws requiring the reporting of confirmed CSAM to
            designated authorities such as NCMEC.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            7. Designated Child Safety Point of Contact
          </h3>

          <p className="">
            quikoro has designated the following point of contact to receive
            notifications regarding CSAE content or concerns, and to speak to
            our enforcement and review procedures:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Name: Shahrukh Punjwani",
              "Role: Founder, quikoro",
              "Email: support@quikoro.com",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            8. If a Child Is in Immediate Danger
          </h3>

          <p className="">
            If you believe a child is in immediate danger of abuse,
            exploitation, or trafficking, please contact your local law
            enforcement authorities immediately, in addition to reporting the
            matter to quikoro through the channels described in Section 4.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            9. Relationship to Our Other Policies
          </h3>

          <p className="">
            These Child Safety Standards supplement, and should be read
            alongside, our Terms and Conditions, End User License Agreement, and
            Privacy Policy. In the event of any conflict specifically regarding
            CSAE-related conduct, these Child Safety Standards govern.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            10. Additional Information
          </h3>

          <p className="">
            For more information regarding user conduct, privacy practices, and
            platform policies, please refer to:
          </p>

          <p className="">
            <span className="font-medium">Privacy Policy: </span>{" "}
            <Link
              href={`https://www.quikoro.com/privacy-policy`}
              target="_blank"
              className="hover:text-blue-600 hover:underline transition-all duration-100"
            >
              https://www.quikoro.com/privacy-policy
            </Link>
          </p>

          <p className="">
            <span className="font-medium">Terms & Conditions: </span>{" "}
            <Link
              href={`https://www.quikoro.com/terms-conditions`}
              target="_blank"
              className="hover:text-blue-600 hover:underline transition-all duration-100"
            >
              https://www.quikoro.com/terms-conditions
            </Link>
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            11. Updates to These Standards
          </h3>

          <p className="">
            We may update these Child Safety Standards from time to time to
            reflect changes in our practices, applicable law, or platform
            features. The current version will always be available at
            https://www.quikoro.com with the “Last Updated” date shown above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildSafetyStandards;
