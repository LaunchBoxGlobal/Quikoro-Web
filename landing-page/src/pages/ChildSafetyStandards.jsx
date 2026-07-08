import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const ChildSafetyStandards = () => {
  return (
    <div className="min-h-screen selection:bg-brand-100 selection:text-brand-900">
      <Navbar />

      <div className="w-full relative max-w-7xl mx-auto padding-x pt-48 pb-10">
        <h2 className="text-[24px] font-semibold leading-none">
          LookALike Child Safety Standards
        </h2>

        <div className="w-full border my-5" />

        <div className="w-full space-y-4">
          <p>Last Updated: June 2, 2026</p>

          <p>
            At LookALike, we are committed to maintaining a safe environment for
            all users and have zero tolerance for Child Sexual Abuse and
            Exploitation (CSAE), child sexual exploitation material, grooming,
            trafficking, or any activity that exploits, harms, or endangers
            children.
          </p>

          <h3 className="font-semibold text-xl pt-2">Our Commitment</h3>

          <p>LookALike strictly prohibits:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Child Sexual Abuse and Exploitation (CSAE)</li>
            <li>
              Child Sexual Abuse Material (CSAM) and child sexual exploitation
              material (CSEM)
            </li>
            <li>Grooming or solicitation of minors</li>
            <li>Sexualization of minors in any form</li>
            <li>Human trafficking involving minors</li>
            <li>
              Any content, communication, or behavior that exploits, harms, or
              endangers children
            </li>
          </ul>

          <p>
            Any user found engaging in such activities may have their account
            permanently suspended or terminated and may be reported to
            appropriate law enforcement authorities where required by applicable
            law.
          </p>

          <h3 className="font-semibold text-xl pt-2">
            Reporting Child Safety Concerns
          </h3>

          <p>
            Users may report content, profiles, messages, or behavior that may
            violate these standards through the reporting features available
            within the Application.
          </p>

          <p>Reports are reviewed and investigated as quickly as possible.</p>

          <h3 className="font-semibold text-xl pt-2">Enforcement</h3>

          <p>
            When violations are identified, LookALike may take actions
            including:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Content removal</li>
            <li>Account suspension</li>
            <li>Permanent account termination</li>
            <li>Reporting to relevant authorities when legally required</li>
          </ul>

          <h3 className="font-semibold text-xl pt-2">Age Requirements</h3>

          <p>
            LookALike is intended only for users who meet the minimum age
            requirements specified in our Terms & Conditions and applicable
            laws.
          </p>

          <p>
            Users who do not meet the required age threshold are not permitted
            to use the platform.
          </p>

          <h3 className="font-semibold text-xl pt-2">Child Safety Contact</h3>

          <p>
            For child safety concerns, CSAE reports, or urgent child protection
            matters, please contact:
          </p>

          <p>Email: support@lookalikematch.com</p>

          <p>Developer: LookALike</p>

          <h3 className="font-semibold text-xl pt-2">Additional Information</h3>

          <p>
            For more information regarding user conduct, privacy practices, and
            platform policies, please refer to:
          </p>

          <p className="font-medium">Privacy Policy:</p>

          <p>
            <Link
              to="https://lookalikematch.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline break-all"
            >
              https://lookalikematch.com/privacy-policy
            </Link>
          </p>

          <p className="font-medium">Terms & Conditions:</p>

          <p>
            <Link
              to="https://lookalikematch.com/terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline break-all"
            >
              https://lookalikematch.com/terms-conditions
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChildSafetyStandards;
