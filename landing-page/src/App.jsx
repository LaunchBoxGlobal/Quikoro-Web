import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ScrollToTop from "./hooks/ScrollToTop";
import EndUserLicenseAgreement from "./pages/EndUserLicenseAgreement";
import ChildSafetyStandards from "./pages/ChildSafetyStandards";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route
          path="/end-user-license-agreement"
          element={<EndUserLicenseAgreement />}
        />
        <Route
          path="/child-safety-standards"
          element={<ChildSafetyStandards />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
