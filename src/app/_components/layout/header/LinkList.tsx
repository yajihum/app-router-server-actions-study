"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkList = [
  {
    href: "/room/create",
    text: "ルームをつくる",
  },
];

export default function LinkList() {
  const pathname = usePathname();
  return (
    <>
      {linkList.map((link, index) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={index}
            href={link.href}
            className={`mx-1 rounded-2xl px-2 py-1.5 text-sm md:my-2 md:px-4 ${
              isActive
                ? "bg-orange-200 text-orange-600"
                : "text-gray-500 hover:bg-orange-200 hover:text-orange-600"
            }`}
          >
            {link.text}
          </Link>
        );
      })}
    </>
  );
}
