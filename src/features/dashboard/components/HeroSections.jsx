import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center px-4 w-full">
        <h1 className="text-[44px] md:text-[56px] font-bold text-[#18181b] tracking-tight leading-tight mb-4 max-w-[800px]">
          Find Trusted Professionals
          <br />
          for Your Needs
        </h1>

        <p className="text-[18px] text-gray-500 mb-10 max-w-[600px] mx-auto">
          Book verified service providers effortlessly and get quality service
          at your doorstep.
        </p>

        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;
