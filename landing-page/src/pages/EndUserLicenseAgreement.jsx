import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const EndUserLicenseAgreement = () => {
  return (
    <div className="min-h-screen selection:bg-brand-100 selection:text-brand-900">
      <Navbar />

      <div className="w-full relative max-w-7xl mx-auto padding-x pt-48 pb-10">
        <h2 className="text-[24px] font-semibold leading-none">
          End User License Agreement (EULA)
        </h2>

        <div className="w-full border my-5" />

        <div className="w-full space-y-4">
          <p>Last Updated: June 2, 2026</p>

          <p>
            This End User License Agreement ("Agreement") is a legal agreement
            between you ("User", "you") and LookALike ("LookALike", "we", "our",
            or "us") governing your access to and use of the LookALike mobile
            application and related services.
          </p>

          <p>
            By downloading, installing, accessing, or using the Application, you
            agree to be bound by this Agreement.
          </p>

          <h3 className="font-semibold text-xl pt-2">1. License Grant</h3>

          <p>
            LookALike grants you a limited, non-exclusive, non-transferable,
            revocable license to use the Application for personal,
            non-commercial purposes in accordance with this Agreement.
          </p>

          <h3 className="font-semibold text-xl pt-2">
            2. Subscription Services
          </h3>

          <p>
            LookALike offers optional auto-renewable subscription plans that
            provide access to premium features and enhanced functionality.
          </p>

          <p>Current subscription offering:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>LookALike Premium</li>
            <li>3-Day Free Trial</li>
            <li>
              Monthly Subscription: $3.99/month (or local equivalent pricing
              displayed by the App Store)
            </li>
          </ul>

          <p>
            Payment will be charged to your Apple ID account at confirmation of
            purchase.
          </p>

          <p>
            Subscriptions automatically renew unless canceled at least 24 hours
            before the end of the current billing period.
          </p>

          <p>
            Your account will be charged for renewal within 24 hours before the
            end of the current billing period.
          </p>

          <p>
            You may manage or cancel your subscription through your Apple
            Account Settings after purchase.
          </p>

          <p>
            Any unused portion of a free trial period, if offered, will be
            forfeited when a subscription is purchased.
          </p>

          <h3 className="font-semibold text-xl pt-2">3. User Content</h3>

          <p>
            Users may voluntarily upload profile photos, profile information,
            and other content for the purpose of using the Application and its
            facial similarity matching features.
          </p>

          <p>
            You are solely responsible for content you upload and represent that
            you have all necessary rights, permissions, and authority to submit
            such content.
          </p>

          <h3 className="font-semibold text-xl pt-2">
            4. Facial Similarity Matching
          </h3>

          <p>
            LookALike uses uploaded photos solely for the purpose of generating
            facial similarity comparisons between users and providing lookalike
            match results within the Application.
          </p>

          <p>
            Uploaded photos may be securely processed using Amazon Web Services
            (AWS), including Amazon Rekognition, solely for the purpose of
            generating facial similarity comparisons.
          </p>

          <p>
            Uploaded photos are not used for advertising purposes, artificial
            intelligence model training, identity verification, surveillance
            activities, or sold to third parties.
          </p>

          <p>
            Additional information regarding facial data collection, processing,
            storage, and deletion can be found in our Privacy Policy.
          </p>

          <h3 className="font-semibold text-xl pt-2">5. Acceptable Use</h3>

          <p>You agree not to:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Application for unlawful purposes.</li>

            <li>Upload content that infringes the rights of others.</li>

            <li>
              Attempt to gain unauthorized access to systems, accounts, or data.
            </li>

            <li>
              Reverse engineer, modify, or interfere with the Application.
            </li>

            <li>Upload harmful, fraudulent, abusive, or misleading content.</li>
          </ul>

          <h3 className="font-semibold text-xl pt-2">6. Privacy Policy</h3>

          <p>
            Your use of the Application is also governed by our Privacy Policy,
            available at:{" "}
            <Link
              to="https://lookalikematch.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline break-all"
            >
              https://lookalikematch.com/privacy-policy
            </Link>
          </p>

          <h3 className="font-semibold text-xl pt-2">7. Account Termination</h3>

          <p>Users may discontinue use of the Application at any time.</p>

          <p>
            We reserve the right to suspend or terminate accounts that violate
            this Agreement, applicable laws, or our policies.
          </p>

          <h3 className="font-semibold text-xl pt-2">8. Disclaimer</h3>

          <p>
            The Application is provided on an "as is" and "as available" basis
            without warranties of any kind, whether express or implied.
          </p>

          <p>
            LookALike does not guarantee specific matching outcomes,
            compatibility results, user interactions, or uninterrupted
            availability of the service.
          </p>

          <h3 className="font-semibold text-xl pt-2">
            9. Limitation of Liability
          </h3>

          <p>
            To the fullest extent permitted by applicable law, LookALike shall
            not be liable for any indirect, incidental, consequential, special,
            exemplary, or punitive damages arising out of or relating to your
            use of the Application.
          </p>

          <h3 className="font-semibold text-xl pt-2">
            10. Changes to This Agreement
          </h3>

          <p>
            We may update this Agreement from time to time. Continued use of the
            Application following any update constitutes acceptance of the
            revised Agreement.
          </p>

          <h3 className="font-semibold text-xl pt-2">11. Contact Us</h3>

          <p>
            If you have questions regarding this Agreement, please contact us
            at:
          </p>

          <p>
            <a
              href="mailto:support@lookalikematch.com"
              className="text-brand-600 hover:underline"
            >
              support@lookalikematch.com
            </a>
          </p>

          <h3 className="font-semibold text-xl pt-2">
            12. Apple-Specific Terms
          </h3>

          <p>
            This Agreement is concluded between you and LookALike, and not with
            Apple Inc.
          </p>

          <p>
            Apple and its subsidiaries are third-party beneficiaries of this
            Agreement and, upon your acceptance of this Agreement, shall have
            the right to enforce this Agreement against you as a third-party
            beneficiary.
          </p>

          <p>
            Apple is not responsible for the Application, its content,
            maintenance, support services, or claims relating to the
            Application.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EndUserLicenseAgreement;
