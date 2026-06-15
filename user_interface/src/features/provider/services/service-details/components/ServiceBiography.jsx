export default function ServiceBiography({ service }) {
  return (
    <div>
      <h3 className="mb-3 text-[15.5px] font-semibold text-gray-900">
        Description
      </h3>

      <p className="text-[15px] leading-[1.6] text-gray-500">
        {service?.description}
      </p>
    </div>
  );
}
