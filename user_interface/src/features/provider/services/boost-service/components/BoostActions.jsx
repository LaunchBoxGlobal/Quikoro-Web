export default function BoostActions({ setIsServiceBoosted }) {
  return (
    <div className="mt-16 flex flex-col sm:flex-row justify-end gap-4">
      <button className="rounded-xl border border-gray-200 bg-white px-10 py-4 text-[16px] font-semibold text-gray-700 transition-colors hover:bg-gray-50">
        Skip for Now
      </button>

      <button
        type="button"
        onClick={() => setIsServiceBoosted(true)}
        className="rounded-xl bg-[#18181b] px-14 py-4 text-[16px] font-semibold text-white transition-colors hover:bg-black/90"
      >
        Save
      </button>
    </div>
  );
}
