"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from 'next/link'; // Import the Link component

const NAV_MENU = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Our Story",
    href: "/aboutUs",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    subMenu: [
      {
        name: "Photography",
        href: "/portfolio/photography",
      },
      {
        name: "Cinematography",
        href: "/portfolio/videography",
      },
    ],
  },
  {
    name: "Packages",
    href: "/prices",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href: string;
  isActive: boolean; // isActive is required and must be a boolean
  onClick: () => void;
  hasSubMenu?: boolean;
  isSubMenuOpen?: boolean;
  onSubMenuToggle?: () => void;
}

function NavItem({
  children,
  href,
  isActive,
  onClick,
  hasSubMenu = false,
  isSubMenuOpen = false,
  onSubMenuToggle,
}: NavItemProps) {
  return (
    <li className="relative">
      <a
        href={href}
        className={`$ flex items-center gap-2 text-md font-semibold text-colors-custom-blue hover:text-colors-custom-blue transition-colors duration-300 ${isActive ? "text-colors-custom-blue border-b-2 border-colors-custom-blue" : ""
          }`}
        onClick={(e) => {
          if (hasSubMenu) {
            e.preventDefault();
            onSubMenuToggle?.();
          } else {
            onClick();
          }
        }}
      >
        {children}
        {hasSubMenu && (
          <svg
            className={`w-4 h-4 ml-1 transition-transform ${isSubMenuOpen ? "transform rotate-180" : ""
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </a>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const handleItemClick = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const handleSubMenuToggle = (menuName: string) => {
    setOpenSubMenu((current) => (current === menuName ? null : menuName));
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-6 hover:cursor-pointer">
        {/* Logo */}
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dbuypmffx/image/upload/v1740808584/New_logo_-_Black_gfny6h_c_crop_w_1200_h_200_hz405l.png"
            alt="AVAIRA Logo"
            className="h-7 w-40"
            onClick={() => router.push("/")}
            width={96}
            height={64}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 lg:flex text-md">
          {NAV_MENU.map((item) => (
            <div key={item.name} className="relative">
              <NavItem
                href={item.href}
                isActive={
                  pathname === item.href ||
                  (!!item.subMenu && item.subMenu.some((sub) => pathname === sub.href))
                }
                onClick={() => handleItemClick(item.href)}
                hasSubMenu={!!item.subMenu}
                isSubMenuOpen={openSubMenu === item.name}
                onSubMenuToggle={() => handleSubMenuToggle(item.name)}
              >
                {item.name}
              </NavItem>

              {item.subMenu && openSubMenu === item.name && (
                <div className="absolute top-full left-0 mt-2 w-48 border-white/0 bg-white/100 backdrop-blur-lg rounded-none shadow-none">
                  <ul className="py-2">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.name}>
                        <a
                          href={subItem.href}
                          className={` block px-4 py-2 text-sm text-colors-custom-blue hover:bg-gray-100 ${pathname === subItem.href ? "font-semibold" : ""
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleItemClick(subItem.href);
                          }}
                        >
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </ul>

        {/* Request a Quote Button (Desktop) */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            className={`px-6 py-3 bg-gradient-to-b from-black/70 via-black/90 to-black/90 hover:bg-black  text-white font-semibold text-sm rounded-sm hover:bg-colors-custom-dark-blue transition-colors duration-300`}
            onClick={() => router.push("/contact")}
          >
            Request a Quote
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={handleOpen}
          className="lg:hidden p-2 text-colors-custom-blue"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="container mx-4 border-t border-gray-200 px-2 pt-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map((item) => (
              <div key={item.name}>
                <NavItem
                  href={item.href}
                  isActive={
                    pathname === item.href ||
                    (!!item.subMenu && item.subMenu.some((sub) => pathname === sub.href))
                  }
                  onClick={() => handleItemClick(item.href)}
                  hasSubMenu={!!item.subMenu}
                  isSubMenuOpen={openSubMenu === item.name}
                  onSubMenuToggle={() => handleSubMenuToggle(item.name)}
                >
                  {item.name}
                </NavItem>

                {item.subMenu && openSubMenu === item.name && (
                  <ul className="pl-4 mt-2 space-y-2">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.name}>
                        <a
                          href={subItem.href}
                          className={`block text-md text-colors-custom-blue ${pathname === subItem.href ? "font-semibold" : ""
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleItemClick(subItem.href);
                          }}
                        >
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
          <div className="py-4 flex justify-center">
            <button
              className={` px-6 py-2 bg-colors-custom-blue text-white font-semibold text-sm rounded-none hover:bg-colors-custom-dark-blue transition-colors duration-300`}
              onClick={() => router.push("/contact")}
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;