import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import SettingsLayout from "../../layouts/SettingsLayout";

import NotificationPage from "./NotificationPage";
import BoostedHistoryPage from "./BoostedHistoryPage";
import ChangePasswordPage from "./ChangePasswordPage";
import ContactSupportPage from "./ContactSupportPage";
import ReportBugPage from "./ReportBugPage";
import DeleteAccountPage from "./DeleteAccountPage";
import TermsConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import useUpdateTitle from "../../hooks/useUpdateTitle";
import BlockedUsersPage from "./BlockedUsersPage";

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "notification";
  useUpdateTitle("Settings");
  const navigate = useNavigate();

  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  const renderPage = () => {
    switch (activeTab) {
      case "notification":
        return <NotificationPage />;

      case "blocked-users":
        return <BlockedUsersPage />;

      case "change-password":
        return <ChangePasswordPage />;

      case "contact-support":
        return <ContactSupportPage />;

      case "report-a-bug":
        return <ReportBugPage />;

      case "delete-account":
        return <DeleteAccountPage />;

      case "terms-and-condition":
        return <TermsConditions />;

      case "privacy-policy":
        return <PrivacyPolicy />;

      default:
        return <NotificationPage />;
    }
  };

  return (
    <div className="min-h-screen  text-gray-900 flex flex-col">
      <div className="mx-auto w-full flex flex-col flex-1 pb-12">
        <div className="mb-6 pt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[18px] font-bold text-black hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
            Back
          </button>
        </div>

        <SettingsLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderPage()}
        </SettingsLayout>
      </div>
    </div>
  );
}
