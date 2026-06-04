import ServiceTopSection from "./ServiceTopSection";
import ReviewList from "./ReviewList";

export default function ServiceHero({ service }) {
  const reviews = service?.ratings || [];
  return (
    <section className="mb-24 rounded-[2rem] bg-[var(--gray-bg)] p-6 lg:p-8">
      <div className="rounded-2xl foreground border border-gray-200 p-6 sm:p-8 lg:p-10">
        <ServiceTopSection service={service} />
        {reviews?.length > 0 && <ReviewList reviews={reviews} />}
      </div>
    </section>
  );
}
