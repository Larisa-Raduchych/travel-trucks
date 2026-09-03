"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        <Image src="/logoTravelTrucks.svg" alt="TravelTrucks" width={136} height={16} priority />
      </Link>
      <nav className={css.nav}>
        <Link
          href="/"
          className={`${css.link} ${pathname === "/" ? css.active : ""}`}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={`${css.link} ${pathname.startsWith("/catalog") ? css.active : ""}`}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}