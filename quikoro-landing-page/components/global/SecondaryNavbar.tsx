"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

const NAV_LINKS = ["How It Works", "Booking Journey", "Our Services", "FAQs"];

export default function SecondaryNavbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSidebar = () => setOpen(false);

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
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 w-full px-4 pt-4 lg:pt-10 lg:px-10 xl:px-20 transition-all duration-500 ${
          scrolled
            ? "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-white before:via-white before:to-transparent"
            : ""
        }`}
      >
        <div
          className={`mx-auto flex w-full items-center justify-between px-5 py-5 lg:py-7 lg:px-7 rounded-[32px] gradient-bg`}
        >
          {/* Logo */}
          <div
            onClick={() => scrollToSection("Home")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <Image
              src="/quikoro-logo.png"
              alt="quikoro-logo"
              width={140}
              height={70}
              priority
            />
          </div>

          {/* Desktop Nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {NAV_LINKS.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-[16px] font-medium text-white transition"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-6 lg:flex">
            <Link href="/" className="text-[16px] font-medium text-white">
              Login
            </Link>

            <Link
              href="/"
              className="inline-flex h-[40px] items-center justify-center rounded-full bg-white px-5 text-sm font-bold text-[#003544]"
            >
              Download App
            </Link>
          </div>

          {/* Mobile Menu */}
          <button onClick={() => setOpen(true)} className="lg:hidden">
            <HiOutlineMenu className="text-2xl text-white" />
          </button>
        </div>
      </header>

      {/* sidebar */}
      <Sidebar
        open={open}
        closeSidebar={closeSidebar}
        scrollToSection={scrollToSection}
        NAV_LINKS={NAV_LINKS}
      />
    </>
  );
}
