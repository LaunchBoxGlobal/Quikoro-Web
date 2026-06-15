import BoostHeader from "./BoostHeader";
import PlansGrid from "./PlansGrid";
import BoostActions from "./BoostActions";

export default function BoostLayout({
  plans,
  selectedPlan,
  setSelectedPlan,
  setIsServiceBoosted,
}) {
  return (
    <section className="mb-24 rounded-[2.5rem] bg-[var(--gray-bg)] p-6 sm:p-8 lg:p-12">
      <div className="rounded-[2rem] bg-white pt-8 px-8 pb-8 lg:pt-12 lg:px-12 lg:pb-12 shadow-sm min-h-[600px] flex flex-col justify-between">
        <div>
          <BoostHeader />

          <hr className="mb-12 border-gray-100" />

          <PlansGrid
            plans={plans}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        </div>

        <BoostActions setIsServiceBoosted={setIsServiceBoosted} />
      </div>
    </section>
  );
}
