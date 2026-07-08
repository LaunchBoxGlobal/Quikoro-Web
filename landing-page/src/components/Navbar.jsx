import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-6" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto padding-x flex justify-between items-center">
        <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
          <img src="/quikoro-logo.png" alt="" width={150} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-14">
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo("features")}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            How it Works
          </button>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to={"/contact"}
            className="gradient-bg text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200"
          >
            Contact Support
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              <button
                type="button"
                onClick={() => scrollTo("home")}
                className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollTo("features")}
                className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollTo("how-it-works")}
                className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md text-left"
              >
                How it Works
              </button>
              <Link
                to={"/contact"}
                className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md text-left"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
