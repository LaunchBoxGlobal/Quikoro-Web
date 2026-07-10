"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = {
  company: [
    { title: "About Us", link: "/" },
    { title: "Careers", link: "/" },
    { title: "Press", link: "/" },
    { title: "Blog", link: "/" },
  ],
  support: [
    { title: "Help Center", link: "/" },
    { title: "Contact Us", link: "/contact-us" },
    { title: "Safety", link: "" },
    { title: "Community", link: "" },
  ],
  legal: [
    { title: "Privacy Policy", link: "/privacy-policy" },
    { title: "Terms of Service", link: "/terms-and-conditions" },
    { title: "Child Safety", link: "/child-safety-standards" },
    { title: "User License Agreement", link: "/end-user-license-agreement" },
  ],
};

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    const NAVBAR_HEIGHT = 150;

    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        const top =
          element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      sessionStorage.setItem("scrollTarget", id);
      router.push("/");
    }
  };

  return (
    <footer className="p-4 lg:p-10 xl:px-20 overflow-hidden">
      <div className="w-full mx-auto gradient-bg rounded-[2.5rem] p-10 md:p-14 lg:p-16 text-white relative shadow-2xl flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 relative z-10 w-full mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-4 xl:col-span-5 flex flex-col items-start pr-4">
            <button
              type="button"
              onClick={() => scrollToSection("Home")}
              className="flex items-center gap-2.5 mb-6"
            >
              <Image
                src={"/quikoro-logo.png"}
                alt="quikoro logo"
                width={150}
                height={70}
                className="object-contain"
              />
            </button>

            <p className="text-white/90 text-sm leading-relaxed max-w-[250px] font-medium">
              Connect with trusted, verified professionals for all your home
              service needs. Fast, reliable, and available across the city.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 xl:col-span-2 lg:col-start-6">
            <h4 className="font-extrabold text-xs tracking-[0.2em] uppercase text-white/90 mb-5 md:mb-7">
              Company
            </h4>
            <ul className="space-y-4">
              {links.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.link}
                    className="text-white/90 text-sm font-medium hover:text-white transition-colors duration-300 block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 xl:col-span-2">
            <h4 className="font-extrabold text-xs tracking-[0.2em] uppercase text-white/90 mb-5 md:mb-7">
              Support
            </h4>
            <ul className="space-y-4">
              {links.support.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.link}
                    className="text-white/90 text-sm font-medium hover:text-white transition-colors duration-300 block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 xl:col-span-2">
            <h4 className="font-extrabold text-xs tracking-[0.2em] uppercase text-white/90 mb-5 md:mb-7">
              Legal
            </h4>
            <ul className="space-y-4">
              {links.legal.map((l) => (
                <li key={l.title}>
                  <Link
                    href={l.link}
                    className="text-white/90 text-sm font-medium hover:text-white transition-colors duration-300 block"
                  >
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 w-full mt-auto">
          <p className="text-white/90 text-xs font-medium tracking-wide">
            © 2026 quikoro. All rights reserved.
          </p>
          <p className="text-white/90 text-xs font-medium tracking-wide">
            Powered by LaunchBox Global
          </p>
        </div>
      </div>
    </footer>
  );
}
