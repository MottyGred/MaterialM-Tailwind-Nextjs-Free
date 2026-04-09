"use client";

import Image from "next/image";
import Link from "next/link";

const FullLogo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-3 no-underline">
      <Image
        src="/images/logos/haladas-logo.png"
        alt="Haladás Logo"
        width={44}
        height={44}
        className="object-contain flex-shrink-0"
      />
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-[17px] text-[#1E3A5F] dark:text-white tracking-tight">
          Haladás
        </span>
        <span className="text-[10px] text-[#C8541A] font-medium uppercase tracking-widest">
          Taller Creativo
        </span>
      </div>
    </Link>
  );
};

export default FullLogo;
