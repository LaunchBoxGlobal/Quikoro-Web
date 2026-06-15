export default function PlanFeatures({ features }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {features.map((feature, idx) => (
        <li
          key={idx}
          className="flex items-center gap-3 text-[14.5px] text-gray-500"
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-gray-400"></span>

          {feature}
        </li>
      ))}
    </ul>
  );
}
