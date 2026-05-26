import FormHeader from "../../add-service/components/FormHeader";
import ServiceForm from "../../add-service/components/ServiceForm";
import Button from "../../../../../components/ui/Button";
import EditServiceForm from "./EditServiceForm";

export default function ServiceLayout({ service }) {
  return (
    <section className="mb-24 rounded-[2.5rem] bg-[var(--gray-bg)] p-2 sm:p-4 lg:p-6">
      <div className="rounded-[2rem] bg-white p-8 lg:p-12 shadow-sm">
        <FormHeader
          title={`Edit Service`}
          description={`Please complete details to access all features.`}
        />

        <hr className="mb-10 border-gray-100" />

        <EditServiceForm service={service} />
      </div>
    </section>
  );
}
