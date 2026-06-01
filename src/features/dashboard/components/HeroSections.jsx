import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div
      className="w-full flex items-center mb-10 mt-32 rounded-[26px] relative"
      style={{
        backgroundImage: "url('/hero-background.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Hero Section */}
      <div className="flex flex-col items-start justify-center py-12 md:py-16 text-start px-14 w-full">
        <h1 className="text-[44px] md:text-[50px] font-bold text-[#fff] tracking-tight leading-tight mb-4 max-w-[800px]">
          Find Trusted Professionals
          <br />
          for Your Needs
        </h1>

        <p className="text-[18px] text-gray-50 mb-10 max-w-[600px]">
          Book verified service providers effortlessly and get quality service
          at your doorstep.
        </p>

        <SearchBar />
      </div>

      <img
        src="/hero-section-user-image.png"
        alt="hero-section-user-image"
        className="absolute bottom-0 -right-3"
        width={514}
        height={514}
      />
    </div>
  );
};

export default HeroSection;
