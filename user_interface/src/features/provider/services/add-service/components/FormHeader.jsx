export default function FormHeader({ title, description }) {
  return (
    <div className="mb-10">
      <h1 className="mb-2 text-[32px] font-bold tracking-tight text-gray-900">
        {/* Add New Service */}
        {title}
      </h1>

      <p className="text-[16px] text-gray-500">
        {description}
        {/* Please complete details to access all features */}
      </p>
    </div>
  );
}
