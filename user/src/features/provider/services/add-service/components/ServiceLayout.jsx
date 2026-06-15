import FormHeader from "./FormHeader";
import ServiceForm from "./ServiceForm";
import Button from "../../../../../components/ui/Button";

export default function ServiceLayout() {
  return (
    <section className="mb-24 rounded-[2.5rem] bg-[var(--gray-bg)] p-2 sm:p-4 lg:p-5">
      <div className="rounded-[2rem] bg-white p-8 lg:p-12 shadow-sm">
        <FormHeader
          title={`Add New Service`}
          description={`Please complete details to access all features.`}
        />

        <hr className="mb-10 border-gray-100" />

        <ServiceForm />
      </div>
    </section>
  );
}
