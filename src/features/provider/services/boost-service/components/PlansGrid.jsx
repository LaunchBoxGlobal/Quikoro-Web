import PlanCard from "./PlanCard";

export default function PlansGrid({ plans, selectedPlan, setSelectedPlan }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:gap-10">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSelected={selectedPlan === plan.id}
          onSelect={setSelectedPlan}
        />
      ))}
    </div>
  );
}
