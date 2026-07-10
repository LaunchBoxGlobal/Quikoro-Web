import SecondaryNavbar from "@/components/global/SecondaryNavbar";
import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SecondaryNavbar />
      <div className="w-full relative max-w-7xl mx-auto padding-x pt-40 md:pt-48 pb-10">
        <h2 className="text-[24px] font-semibold leading-none">
          Terms & Conditions
        </h2>

        <div className="w-full border my-5" />

        <div className="w-full">
          <p className="">Last Updated: June 30, 2026</p>

          <p className="mt-2">
            These Terms and Conditions (“Terms”) form a binding agreement
            between you and quikoro (“quikoro”, “we”, “us”, or “our”) governing
            your access to and use of the quikoro Customer App, the quikoro
            Provider App, and the quikoro website (together, the “Services”).
          </p>

          <p className="mt-2">
            By creating an account, accessing, or using the Services, you agree
            to be bound by these Terms. If you do not agree, you must not use
            the Services.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            1. Description of the Services
          </h3>

          <p className="">
            quikoro operates a free local services marketplace connecting
            Customers with independent service Providers across categories
            including Plumber, Electrician, Tutor, Carpenter, Painter, Cleaner,
            and Other. The Services consist of two separate applications — a
            Customer App and a Provider App — supported by a shared backend, and
            are accessible on web and mobile.
          </p>

          <p className="mt-2">
            quikoro provides a platform that enables Customers to discover,
            contact, and book Providers, and enables Providers to list their
            services, manage bookings, and communicate with Customers. quikoro
            is not a party to the service agreement formed between a Customer
            and a Provider for any booked service. There is currently no charge
            to Customers or Providers for using the Services.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            2. Eligibility and Account Registration
          </h3>

          <ul className="mt-2 list-disc pl-4">
            {[
              "You must be at least 18 years old to create an account or use the Services. The Services are not intended for use by anyone under 18",
              "You must provide accurate, current, and complete information during registration and keep your account information up to date",
              "Account registration is available via email or Google sign-in, with separate onboarding flows for Customers and Providers",
              "You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account",
              "You must notify us immediately at support@quikoro.com of any unauthorized use of your account",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            3. Provider Onboarding and Admin Approval
          </h3>

          <p className="">
            Providers must submit profile information during onboarding,
            including name, photo, city, service category/speciality,
            experience, description, and availability. Submitted profiles are
            reviewed by quikoro’s admin team before the Provider can access the
            platform or appear in search results.
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "quikoro may approve or reject a Provider application at its sole discretion, with or without an explanatory note",
              "A rejected Provider may be notified of the reason and may be permitted to resubmit corrected information, at quikoro’s discretion",
              "Approved Providers select one service category at onboarding. Changing category after approval requires submission for admin re-approval",
              "quikoro reserves the right to suspend or revoke a Provider’s approval at any time for violation of these Terms, our Child Safety Standards, applicable law, or for conduct that we determine, in our reasonable judgment, poses a risk to Customers or the integrity of the platform",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            4. Bookings and Cash Payment
          </h3>

          <p className="">
            Customers submit booking requests specifying a preferred date,
            address or area, and an optional note. The Provider may accept or
            decline the request. Upon acceptance, the booking becomes active and
            in-app chat is enabled between the parties.
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "quikoro does not process or hold payment for booked services. All payment for services is settled directly between the Customer and the Provider in cash at the time of service",
              "quikoro is not a party to, and assumes no responsibility for, the pricing, quality, timeliness, or performance of any service booked through the Services",
              "Providers are responsible for marking bookings as Completed once service has been rendered. Customers and Providers are each responsible for honoring confirmed bookings in good faith",
              "Either party may experience a booking being Declined or Cancelled in accordance with the status options available in the app; repeated cancellations may be reviewed by quikoro as part of platform quality monitoring",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            5. In-App Chat and Conduct
          </h3>

          <p className="">
            In-app chat is available only between a Customer and a Provider
            after a booking has been confirmed, and is tied to that specific
            booking. Chat closes once the booking is marked Completed or
            Cancelled.
          </p>

          <p className="mt-2">
            You agree not to use chat, profile descriptions, reviews, or any
            other feature of the Services to:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Harass, threaten, abuse, or discriminate against another user",
              "Share false, misleading, defamatory, or fraudulent information",
              "Solicit or arrange contact or services outside the intended use of the platform in a manner intended to circumvent platform safeguards",
              "Post or transmit obscene, sexually explicit, or otherwise unlawful content, or any content involving or sexualizing a minor",
              "Upload spam, malware, or unauthorized advertising",
              "Impersonate any person or entity, or misrepresent your affiliation with any person or entity",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            6. Ratings, Reviews, and Reports
          </h3>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Customers may submit a star rating and an optional written review after a booking is marked Completed. Only one rating is permitted per booking, and ratings cannot be edited after submission",
              "Reviews must reflect genuine experiences. quikoro may remove reviews that violate these Terms or that we determine are fraudulent, abusive, or unlawful",
              "Any user may report a Provider profile for Fake Profile, Inappropriate Behaviour, Spam, or Other reasons. Reports are reviewed through quikoro’s Admin Panel, and quikoro may take action including warning, suspension, or removal of the reported account",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            7. Location Information
          </h3>

          <p className="">
            Providers are responsible for manually updating their location to
            accurately reflect their current service area. quikoro relies on the
            location last submitted by the Provider and is not responsible for
            inaccuracies arising from a Provider’s failure to update their
            location.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            8. Independent Contractor Relationship
          </h3>

          <p className="">
            Providers are independent businesses or individuals and are not
            employees, agents, partners, or representatives of quikoro. Nothing
            in these Terms creates an employment, agency, partnership, or joint
            venture relationship between quikoro and any Provider or Customer.
            Providers are solely responsible for determining how they perform
            their services, including compliance with any applicable licensing,
            certification, tax, or insurance requirements in their jurisdiction.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            9. Prohibited Conduct
          </h3>

          <p className="">
            In addition to the conduct described in Section 5, you agree not to:
          </p>

          <ul className="mt-2 list-decimal pl-4">
            {[
              "Use the Services for any unlawful purpose or in violation of any applicable local, national, or international law",
              "Attempt to gain unauthorized access to the Services, other accounts, or quikoro’s systems",
              "Reverse engineer, decompile, or attempt to extract the source code of the Services, except where permitted by law",
              "Use automated means (bots, scrapers) to access or interact with the Services without our written permission",
              "Create multiple accounts to evade a suspension, manipulate ratings, or circumvent the admin approval process",
              "Engage in any conduct that exploits, endangers, or sexualizes a minor; such conduct will be reported in accordance with our Child Safety Standards and applicable law",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            10. Suspension and Termination
          </h3>

          <p className="">
            quikoro may suspend or terminate your account, with or without
            notice, if we determine that you have violated these Terms, our
            Child Safety Standards, or applicable law, or if your conduct
            creates risk or liability for quikoro, other users, or third
            parties. You may stop using the Services and request account
            deletion at any time by contacting support@quikoro.com or using the
            in-app option, where available.
          </p>

          <p className="mt-2">
            Sections that by their nature should survive termination (including
            Sections 8, 11, 12, 13, and 15) will continue to apply after your
            account is closed.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">11. Disclaimers</h3>

          <p className="">
            THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT
            WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT
            NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, OR NON-INFRINGEMENT. QUIKORO DOES NOT GUARANTEE
            THE QUALITY, SAFETY, LEGALITY, OR RELIABILITY OF ANY PROVIDER OR ANY
            SERVICE BOOKED THROUGH THE PLATFORM. QUIKORO DOES NOT GUARANTEE
            UNINTERRUPTED, ERROR-FREE, OR SECURE ACCESS TO THE SERVICES.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            12. Limitation of Liability
          </h3>

          <p className="">
            THE SERVICES ARE PROVIDED FREE OF CHARGE TO ALL USERS WORLDWIDE.
            QUIKORO DOES NOT CHARGE FEES, SUBSCRIPTIONS, OR ANY FORM OF PAYMENT
            FOR ACCESS TO OR USE OF THE SERVICES. ACCORDINGLY, TO THE MAXIMUM
            EXTENT PERMITTED BY APPLICABLE LAW, QUIKORO AND ITS OFFICERS,
            EMPLOYEES, AND AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS
            OF PROFITS, DATA, OR GOODWILL, ARISING FROM OR RELATED TO YOUR USE
            OF THE SERVICES OR ANY SERVICE BOOKED THROUGH A PROVIDER, EVEN IF
            QUIKORO HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. BECAUSE
            NO FEES ARE CHARGED FOR THE SERVICES, QUIKORO’S TOTAL AGGREGATE
            LIABILITY FOR ANY CLAIM ARISING FROM OR RELATED TO THESE TERMS OR
            THE SERVICES IS LIMITED TO THE FULLEST EXTENT PERMITTED BY
            APPLICABLE LAW.
          </p>

          <p className="mt-2 italic">
            Some jurisdictions do not allow the exclusion or limitation of
            certain damages or warranties; in such jurisdictions, the
            limitations in Sections 11 and 12 apply only to the extent permitted
            by law, and the remaining provisions continue in full force.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            13. Indemnification
          </h3>

          <p className="">
            You agree to indemnify and hold harmless quikoro and its officers,
            employees, and affiliates from any claims, damages, losses,
            liabilities, and expenses (including reasonable legal fees) arising
            from your violation of these Terms, your use of the Services, or any
            dispute between you and another user, including disputes arising
            from a booked service.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            14. Intellectual Property
          </h3>

          <p className="">
            The Services, including all software, design, text, graphics, and
            trademarks, are owned by quikoro or its licensors and are protected
            by intellectual property laws. You are granted a limited,
            non-exclusive, non-transferable, revocable license to use the
            Services for their intended purpose. You may not copy, modify,
            distribute, sell, or lease any part of the Services without our
            prior written consent.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            15. Governing Law and Dispute Resolution
          </h3>

          <p className="">
            These Terms are governed by general principles of international
            commercial law and, to the extent applicable, the laws of the
            jurisdiction in which quikoro is established, without regard to
            conflict-of-law principles — except where mandatory consumer
            protection law in your country of residence requires the application
            of local law for your benefit, in which case that local law will
            apply to the extent required. The parties will first attempt to
            resolve any dispute arising from these Terms through good-faith
            negotiation. If a dispute cannot be resolved informally within a
            reasonable period, it will be submitted to binding arbitration or to
            the competent courts having jurisdiction over quikoro, as quikoro
            may elect, except where applicable law grants you the right to bring
            a claim in your own local courts.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            16. Changes to the Services and These Terms
          </h3>

          <p className="">
            We may modify, suspend, or discontinue any part of the Services at
            any time. We may update these Terms from time to time; material
            changes will be communicated through the app or by email, and
            continued use of the Services after changes take effect constitutes
            acceptance of the updated Terms.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            17. Severability and Entire Agreement
          </h3>

          <p className="">
            If any provision of these Terms is found unenforceable, the
            remaining provisions will continue in full force and effect. These
            Terms, together with our Privacy Policy, End User License Agreement,
            and Child Safety Standards, constitute the entire agreement between
            you and quikoro regarding the Services.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">18. Contact Us</h3>

          <p className="">Questions about these Terms can be directed to:</p>

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

export default TermsAndConditions;
