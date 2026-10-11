"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/data/profile";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Sree Manikanta home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            sm<span>.</span>
          </span>
          <span className="brand-name">SREE MANIKANTA</span>
        </Link>
        <button
          type="button"
          className="menu-toggle button button-secondary"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close menu" : "Menu"}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`navigation ${open ? "is-open" : ""}`}
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
