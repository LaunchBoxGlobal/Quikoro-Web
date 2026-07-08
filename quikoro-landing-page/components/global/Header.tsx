"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const NAV_LINKS = ["How It Works", "Features", "Categories", "FAQ"];

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      <header className="z-30 w-full">
        <div className="mx-auto flex w-full items-center justify-between px-5 py-7 lg:px-7">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/quikoro-logo.png"
              alt="quikoro-logo"
              width={140}
              height={70}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item}
                href="/"
                className="text-[16px] font-medium text-white transition hover:text-gray-200"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-6 lg:flex">
            <Link
              href="/"
              className="text-[16px] font-medium text-white transition hover:text-gray-200"
            >
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

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          open
            ? "visible bg-black/60 opacity-100"
            : "invisible bg-black/0 opacity-0"
        }`}
      >
        {/* Click Outside */}
        <div className="absolute inset-0" onClick={closeSidebar} />

        {/* Sidebar */}
        <aside
          className={`absolute right-0 top-0 h-full w-[70%] bg-white shadow-xl transition-transform duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b p-5">
            <Image
              src="/quikoro-logo.png"
              alt="logo"
              width={120}
              height={60}
              className="border"
            />

            <button onClick={closeSidebar}>
              <HiOutlineX className="text-2xl text-gray-700" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col p-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item}
                href="/"
                onClick={closeSidebar}
                className="border-b py-4 text-base font-medium text-gray-800"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Bottom Buttons */}
          <div className="space-y-4 px-6 pt-4">
            <Link
              href="/"
              onClick={closeSidebar}
              className="block text-center text-lg font-medium text-[#003544]"
            >
              Login
            </Link>

            <Link
              href="/"
              onClick={closeSidebar}
              className="flex h-12 items-center justify-center rounded-full gradient-bg font-semibold text-white"
            >
              Download App
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
