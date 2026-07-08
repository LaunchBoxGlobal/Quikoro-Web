import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    <footer
      id="contact"
      className="bg-transparent text-gray-900 py-12 border-t border-gray-300"
    >
      <img
        src="/bottom-left-boxes.png"
        alt="bottom-left-boxes"
        width={216}
        height={208}
        className="absolute bottom-0 left-0 z-0"
      />
      <div className="max-w-7xl mx-auto padding-x">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-black">quikoro</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 lg:w-[330px]">
              Helping people connect through compatibility and facial
              similarity. Discover meaningful connections and real lookalikes
              every day.
            </p>
          </div>

          <div className="col-span-1 md:col-span-1 lg:pl-10">
            <h4 className="text-white font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("home")}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("features")}
                  className="hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("how-it-works")}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h4 className="text-white font-bold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/end-user-license-agreement"
                  className="hover:text-white transition-colors"
                >
                  User License Agreement
                </Link>
              </li>
              <li>
                <Link
                  to="/child-safety-standards"
                  className="hover:text-white transition-colors"
                >
                  Child Safety Standards
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-300 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} quikoro App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
