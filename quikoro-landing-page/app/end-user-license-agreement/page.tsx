import SecondaryNavbar from "@/components/global/SecondaryNavbar";
import Link from "next/link";

const EndUserLicenseAgreement = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SecondaryNavbar />
      <div className="w-full relative max-w-7xl mx-auto padding-x pt-40 md:pt-48 pb-10">
        <h2 className="text-[24px] font-semibold leading-none">
          End User License Agreement (EULA)
        </h2>

        <div className="w-full border my-5" />

        <div className="w-full">
          <p className="">Last Updated: June 30, 2026</p>

          <p className="mt-2">
            This End User License Agreement (“Agreement” or “EULA”) is a legal
            agreement between you (“you” or “user”) and Quikoro (quikoro,” “we,”
            “us,” or “our”) governing your use of the Quikoro Customer App and
            the Quikoro Provider App (together, the “App”), including any
            updates, content, and related services made available through the
            App.
          </p>

          <p className="mt-2">
            By downloading, installing, accessing, or using the App, you accept
            and agree to be bound by this Agreement. If you do not agree to
            these terms, do not download, install, or use the App.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">1. License Grant</h3>

          <p className="">
            Subject to your compliance with this Agreement, Quikoro grants you a
            limited, non-exclusive, non-transferable, non-sublicensable,
            revocable license to download, install, and use the App on a
            personal device that you own or control, solely for your own
            personal or business use in connecting with service Providers or
            Customers through the Quikoro platform, and solely in the manner
            permitted by this Agreement.
          </p>

          <p className="mt-2">
            This license is granted to you only and may not be shared, assigned,
            or transferred to any other person or entity.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            2. License Restrictions
          </h3>

          <p className="">
            You agree that you will not, and will not permit any third party to:
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Copy, modify, adapt, translate, or create derivative works of the App",
              "Reverse engineer, decompile, disassemble, or otherwise attempt to discover the source code, object code, or underlying structure, ideas, or algorithms of the App, except to the extent such restriction is prohibited by applicable law",
              "Rent, lease, lend, sell, sublicense, distribute, or otherwise transfer rights to the App",
              "Remove, alter, or obscure any proprietary notices (including copyright and trademark notices) on the App",
              "Use the App to build a competing product or service, or to benchmark the App against any other product",
              "Use any automated system, bot, scraper, or similar tool to access, interact with, or extract data from the App without our prior written permission",
              "Circumvent, disable, or otherwise interfere with security-related features of the App, including the admin approval process described in Section 5",
              "Use the App in any way that violates applicable law, infringes the rights of any third party, or facilitates harm to a minor",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">3. Ownership</h3>

          <p className="">
            The App, including all source code, object code, design, structure,
            organization, graphics, user interface, trademarks, logos, and
            content (excluding user-generated content described in Section 9),
            is owned by Quikoro or its licensors and is protected by copyright,
            trademark, and other intellectual property laws. This Agreement
            grants you a license to use the App; it does not transfer any
            ownership rights to you. All rights not expressly granted to you are
            reserved by Quikoro.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">4. Eligibility</h3>

          <p className="">
            You must be at least 18 years old to accept this Agreement and use
            the App. The App is not directed to, and may not be used by, anyone
            under the age of 18. By using the App, you represent and warrant
            that you meet this age requirement and that you have the legal
            capacity to enter into this Agreement.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            5. Description of App Functionality
          </h3>

          <p className="">
            The App operates a free local services marketplace connecting
            Customers with independent service Providers across categories
            including Plumber, Electrician, Tutor, Carpenter, Painter, Cleaner,
            and Other, through separate Customer and Provider applications
            supported by a shared backend.
          </p>

          <ul className="mt-2 list-disc pl-4">
            {[
              "Provider accounts are subject to an admin approval process before they can access the platform or appear in search results",
              "Customers may search for, book, and communicate with approved Providers; bookings are confirmed by the Provider and settled directly in cash between the parties at the time of service",
              "In-app chat is available only between a Customer and a Provider after a booking is confirmed, and closes once that booking is marked Completed or Cancelled",
              "Customers may rate and review Providers after a booking is marked Completed",
              "Providers manually set their location using map-based location selection, which determines their visibility in nearby search results",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <p className="mt-2">
            Quikoro is not a party to, and assumes no responsibility for, the
            agreement formed between a Customer and Provider for the underlying
            service booked through the App.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            6. Account Registration
          </h3>

          <p className="">
            Use of the App requires creating an account via email or Google
            sign-in. You are responsible for the accuracy of the information you
            provide, for maintaining the confidentiality of your account
            credentials, and for all activity occurring under your account. You
            must notify us promptly at support@quikoro.com of any suspected
            unauthorized use of your account.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">7. No Fees</h3>

          <p className="">
            The App is provided free of charge to all Customers and Providers
            worldwide. Quikoro does not currently charge any subscription fee,
            license fee, or platform fee for use of the App. This Agreement does
            not constitute a sale of the App, and no payment obligation to
            Quikoro arises from your use of the App.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">8. Updates</h3>

          <p className="">
            Quikoro may from time to time provide updates, patches, or new
            versions of the App. Such updates may be applied automatically or
            may require your action to install. This Agreement applies to all
            updates unless a separate license is provided with a specific
            update. Quikoro is not obligated to provide any updates or to
            continue supporting any particular version of the App.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            9. User-Generated Content
          </h3>

          <p className="">
            The App allows you to submit content, including profile information,
            photos, descriptions, booking notes, chat messages, and ratings and
            reviews (“User Content”). You retain ownership of your User Content,
            but by submitting it you grant Quikoro a worldwide, non-exclusive,
            royalty-free license to host, store, display, reproduce, and
            distribute that User Content solely as necessary to operate,
            maintain, and provide the App’s functionality (for example,
            displaying your Provider profile and reviews to Customers).
          </p>

          <p className="mt-2">
            You are solely responsible for your User Content and represent that
            you have all rights necessary to submit it and that it does not
            violate this Agreement, any applicable law, or the rights of any
            third party, including content that sexualizes, exploits, or
            endangers a minor.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            10. Prohibited Conduct
          </h3>

          <p className="">
            In addition to the restrictions in Section 2, you agree not to use
            the App to:
          </p>

          <ul className="mt-2 list-decimal pl-4">
            {[
              "Harass, threaten, abuse, or discriminate against another user",
              "Post or transmit false, defamatory, fraudulent, obscene, or unlawful content",
              "Impersonate any person or entity or misrepresent your affiliation with one",
              "Create multiple accounts to evade suspension, manipulate ratings, or circumvent the admin approval process",
              "Upload spam, malware, or unauthorized advertising",
              "Engage in any conduct that exploits, endangers, or sexualizes a minor; such conduct will be addressed in accordance with our Child Safety Standards and reported as required by applicable law",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            11. Suspension and Termination
          </h3>

          <p className="">
            This license is effective until terminated. Quikoro may terminate or
            suspend your license to use the App immediately, without notice, if
            you breach any provision of this Agreement, our Terms and
            Conditions, or our Child Safety Standards, or if your conduct
            creates risk or liability for Quikoro, other users, or third
            parties. Upon termination, you must cease all use of the App and,
            where applicable, delete it from your device. Sections 2, 3, 12, 13,
            and 16 of this Agreement will survive termination.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            12. Disclaimer of Warranties
          </h3>

          <p className="">
            THE APP IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES
            OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT
            NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. QUIKORO DOES NOT
            WARRANT THAT THE APP WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
            ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED. QUIKORO DOES NOT
            WARRANT THE QUALITY, SAFETY, LEGALITY, OR RELIABILITY OF ANY
            PROVIDER OR ANY SERVICE BOOKED THROUGH THE APP.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            13. Limitation of Liability
          </h3>

          <p className="">
            THE APP IS PROVIDED FREE OF CHARGE. ACCORDINGLY, TO THE MAXIMUM
            EXTENT PERMITTED BY APPLICABLE LAW, QUIKORO AND ITS OFFICERS,
            EMPLOYEES, AND AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS
            OF PROFITS, DATA, OR GOODWILL, ARISING FROM OR RELATED TO YOUR USE
            OF, OR INABILITY TO USE, THE APP, EVEN IF QUIKORO HAS BEEN ADVISED
            OF THE POSSIBILITY OF SUCH DAMAGES. BECAUSE NO FEES ARE CHARGED FOR
            THE APP, QUIKORO’S TOTAL AGGREGATE LIABILITY FOR ANY CLAIM ARISING
            FROM OR RELATED TO THIS AGREEMENT OR THE APP IS LIMITED TO THE
            FULLEST EXTENT PERMITTED BY APPLICABLE LAW.
          </p>

          <p className="mt-2 italic">
            Some jurisdictions do not allow the exclusion or limitation of
            certain warranties or damages; in such jurisdictions, the
            limitations in Sections 12 and 13 apply only to the extent permitted
            by law, and the remaining provisions continue in full force.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            14. Third-Party Services
          </h3>

          <p className="">
            The App relies on third-party services, including OpenStreetMap for
            mapping and location features, Firebase for push notifications, and
            Google for optional sign-in. Your use of these integrated services
            may be subject to the third party’s own terms, and Quikoro is not
            responsible for the availability, accuracy, or practices of these
            third-party services.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            15. Export Control and Compliance
          </h3>

          <p className="">
            You agree to comply with all applicable export control and economic
            sanctions laws and regulations in connection with your use of the
            App, and you represent that you are not located in, and will not
            access the App from, any country or region subject to a
            comprehensive embargo under applicable law, and that you are not on
            any restricted-party list under applicable law.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            16. Governing Law and Dispute Resolution
          </h3>

          <p className="">
            This Agreement is governed by general principles of international
            commercial law and, to the extent applicable, the laws of the
            jurisdiction in which Quikoro is established, without regard to
            conflict-of-law principles — except where mandatory consumer
            protection law in your country of residence requires the application
            of local law for your benefit, in which case that local law will
            apply to the extent required. The parties will first attempt to
            resolve any dispute under this Agreement through good-faith
            negotiation. If a dispute cannot be resolved informally within a
            reasonable period, it will be submitted to binding arbitration or to
            the competent courts having jurisdiction over Quikoro, as Quikoro
            may elect, except where applicable law grants you the right to bring
            a claim in your own local courts.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            17. Changes to This Agreement
          </h3>

          <p className="">
            Quikoro may revise this Agreement from time to time. Material
            changes will be communicated through the App or by email, and your
            continued use of the App after such changes take effect constitutes
            your acceptance of the revised Agreement. The current version of
            this Agreement will always be available within the App and at
            https://www.quikoro.com.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            18. Severability and Entire Agreement
          </h3>

          <p className="">
            If any provision of this Agreement is found unenforceable, the
            remaining provisions will continue in full force and effect. This
            Agreement, together with our Terms and Conditions, Privacy Policy,
            and Child Safety Standards, constitutes the entire agreement between
            you and Quikoro regarding your use of the App and supersedes any
            prior agreements on this subject.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">19. Contact Us</h3>

          <p className="">Questions about this Agreement can be directed to:</p>

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

export default EndUserLicenseAgreement;
