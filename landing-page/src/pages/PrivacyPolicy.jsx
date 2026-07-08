import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-full relative max-w-7xl mx-auto padding-x pt-48 pb-10">
        <h2 className="text-[24px] font-semibold leading-none">
          Privacy Policy
        </h2>
        <div className="w-full border my-5" />

        <div className="w-full">
          <p className="">Last Updated: June 2, 2026</p>

          <h3 className="font-semibold text-xl mt-4 mb-2">1. Introduction</h3>

          <p className="">
            This Privacy Policy explains how LookaLike (“we”, “our”, “us”),
            operated by Tony Kobach on behalf of LookaLike LLC, collects, uses,
            and protects your information when you use our mobile application
            and related services (“Service”).
          </p>
          <p className="mt-2">
            By using LookaLike, you agree to the collection and use of
            information in accordance with this Privacy Policy.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            2. Information We Collect
          </h3>
          <h4 className="font-semibold text-base mt-2 mb-2">
            a. Account Information
          </h4>
          <p className="">When you create an account, we may collect:</p>
          <ul className="mt-2 list-disc pl-4">
            {[
              "Name, email address, and login credentials",
              "Age, gender, and profile preferences",
              "Profile bio and personal details",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h4 className="font-semibold text-base mt-2 mb-2">
            b. Profile Content
          </h4>
          <ul className="mt-2 list-disc pl-4">
            {[
              "Photos and images uploaded by you",
              "Interests, lifestyle preferences, and responses",
              "Any information you choose to display on your profile",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h4 className="font-semibold text-base mt-2 mb-2">
            c. Facial Data (Image Processing)
          </h4>
          <p className="">We process your uploaded images to:</p>
          <ul className="mt-2 list-disc pl-4">
            {[
              "Verify user authenticity",
              "Generate lookalike matches using facial comparison technology",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>
          <p className="mt-2">
            We do not claim to identify you as a real-world individual, and
            results are algorithm-based and may not be accurate.
          </p>

          <h4 className="font-semibold text-base mt-2 mb-2">
            d. Location Data
          </h4>
          <ul className="mt-2 list-disc pl-4">
            {[
              "Approximate or real-time location (with your permission)",
              "Used to show nearby profiles and improve discovery features",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h4 className="font-semibold text-base mt-2 mb-2">e. Usage Data</h4>
          <ul className="mt-2 list-disc pl-4">
            {[
              "App activity, interactions, and preferences",
              "Device type, operating system, and app performance data",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h4 className="font-semibold text-base mt-2 mb-2">
            f. Communication Data
          </h4>
          <ul className="mt-2 list-disc pl-4">
            {[
              "Messages exchanged within the app",
              "Reports, feedback, and support requests",
            ].map((t, i) => {
              return <li key={i}>{t}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            3. How We Use Your Information
          </h3>
          <p className="">We use collected data to:</p>
          <ul className="mt-2 list-disc pl-4">
            {[
              "Create and manage your account",
              "Provide matching and lookalike features",
              "Enable messaging and interactions",
              "Improve app functionality and user experience",
              "Monitor safety and prevent misuse",
              "Process subscriptions and manage access to premium features",
            ]?.map((p, i) => {
              return <li key={i}>{p}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            4. Subscription & Payments
          </h3>
          <p className="">Subscriptions are processed via:</p>
          <ul className="mt-2 list-disc pl-4">
            {["Apple App Store", "Google Play Store"]?.map((p, i) => {
              return <li key={i}>{p}</li>;
            })}
          </ul>
          <p className="mt-2">
            We do not store your full payment details. Billing information is
            handled directly by your app store provider.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">5. Data Sharing</h3>
          <p className="">We do not sell your personal data.</p>
          <p className="mt-2">We may share limited information:</p>
          <ul className="mt-2 list-disc pl-4">
            {[
              "With service providers supporting app functionality (hosting, analytics)",
              "When required by law or legal process",
              "To enforce our Terms or protect user safety",
            ]?.map((p, i) => {
              return <li key={i}>{p}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">6. Data Retention</h3>
          <p className="">
            We retain your data only as long as necessary to provide the
            Service.
          </p>
          <ul className="mt-2 list-disc pl-4">
            {[
              "If you delete your account, your data will be removed or anonymized within a reasonable period",
              "Some data may be retained for legal or security purposes",
            ]?.map((p, i) => {
              return <li key={i}>{p}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            7. Your Rights & Choices
          </h3>
          <p className="">You have the right to:</p>
          <ul className="mt-2 list-disc pl-4">
            {[
              "Access and update your profile information",
              "Delete your account at any time",
              "Control location permissions through your device settings",
            ]?.map((p, i) => {
              return <li key={i}>{p}</li>;
            })}
          </ul>

          <h3 className="font-semibold text-xl mt-4 mb-2">8. Data Security</h3>
          <p className="">
            We implement appropriate technical and organizational measures to
            protect your data, including encryption and secure storage.
          </p>
          <p className="">
            However, no system is completely secure, and we cannot guarantee
            absolute security.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            9. Children’s Privacy
          </h3>
          <p className="">
            LookaLike is not intended for users under the age of 18.
          </p>
          <p className="">We do not knowingly collect data from minors.</p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            10. Third-Party Services
          </h3>
          <p className="">
            LookaLike may integrate with third-party services (such as login
            providers or analytics tools).
          </p>
          <p className="">
            These services have their own privacy policies, and we are not
            responsible for their practices.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            11. International Use
          </h3>
          <p className="">
            Your data may be processed and stored in different countries
            depending on infrastructure and service providers.
          </p>
          <p className="">By using LookaLike, you consent to such transfers.</p>
          {/*  */}

          <h3 className="font-semibold text-xl mt-4 mb-2">
            12. Facial Data Processing and Similarity Matching
          </h3>
          <p className="">
            LookALike provides facial similarity matching features that allow
            users to discover and compare lookalike matches using photos they
            voluntarily upload to the platform.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            13. Facial Data Collection
          </h3>
          <p className="">
            When you upload a profile photo, the image may contain facial
            information that is required to provide the core functionality of
            the Application. We collect and process uploaded photos solely for
            the purpose of generating facial similarity comparisons between
            users and providing lookalike match results within the Application.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            14. How Facial Data Is Used
          </h3>
          <p className="">Facial data is used exclusively to:</p>
          <ul className="mt-2 list-disc pl-4">
            {[
              "Generate facial similarity comparisons between users",
              "Produce lookalike match results within the Application",
            ]?.map((p, i) => {
              return <li key={i}>{p}</li>;
            })}
          </ul>
          <p className="">
            Facial data is not used for advertising, marketing, user profiling
            unrelated to the Application’s functionality, training artificial
            intelligence models, or sold to third parties.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            15. Storage and Security
          </h3>
          <p className="">
            To provide facial similarity comparison functionality, uploaded
            photos may be securely processed using Amazon Web Services (AWS),
            including Amazon Rekognition.
          </p>
          <p className="">
            Amazon Rekognition is used solely to compare facial characteristics
            for similarity matching purposes. LookALike does not use facial data
            for identity verification, surveillance, law enforcement purposes,
            advertising, or artificial intelligence model training.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            16. How Facial Data Is Used
          </h3>
          <p className="">
            Uploaded profile photos are securely stored using Amazon Web
            Services (AWS) S3 storage infrastructure. Appropriate technical and
            organizational safeguards are implemented to help protect user data
            against unauthorized access, disclosure, alteration, or destruction.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">
            17. Retention and Deletion
          </h3>
          <p className="">
            Uploaded profile photos are retained only while the associated user
            account remains active. When a user deletes their account,
            associated profile photos and facial data maintained by the
            Application are deleted immediately. LookALike does not retain
            Amazon Rekognition comparison records after processing and does not
            maintain archived facial recognition records following account
            deletion.
          </p>

          {/*  */}
          <h3 className="font-semibold text-xl mt-4 mb-2">
            18. Changes to This Privacy Policy
          </h3>
          <p className="">
            We may update this Privacy Policy from time to time.
          </p>
          <p className="">
            Continued use of the Service after updates means you accept the
            revised policy.
          </p>

          <h3 className="font-semibold text-xl mt-4 mb-2">19. Contact Us</h3>
          <p className="">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <p className="">
            <span className="font-medium">Email: </span>{" "}
            <Link
              to={`mailto:support@lookalikematch.com`}
              className="hover:text-blue-600 hover:underline transition-all duration-100"
            >
              support@lookalikematch.com
            </Link>
          </p>
          <p className="">
            <span className="font-medium">Website: </span>{" "}
            <Link
              to={`https://lookalikematch.com/`}
              target="_blank"
              className="hover:text-blue-600 hover:underline transition-all duration-100"
            >
              https://lookalikematch.com/
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
