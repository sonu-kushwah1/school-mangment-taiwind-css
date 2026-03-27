"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav
      aria-label="Breadcrumb"
      className="sticky top-0 z-30 mb-4 rounded-md border border-[#ffa601]/30 bg-white/95 px-3 py-2 text-sm shadow-sm backdrop-blur"
    >
      <ol className="flex items-center flex-wrap gap-y-1">

        {/* Home */}
        <li>
          <Link
            href="/"
            className="font-medium text-[#042954] hover:text-[#ffa601] transition"
          >
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");

          return (
            <li key={index} className="flex items-center">

              <span className="mx-2 text-[#042954]/40">/</span>

              {index === pathSegments.length - 1 ? (
                <span className="capitalize font-semibold text-[#ffa601]">
                  {segment.replace("-", " ")}
                </span>
              ) : (
                <Link
                  href={href}
                  className="capitalize font-medium text-[#042954] hover:text-[#ffa601] transition"
                >
                  {segment.replace("-", " ")}
                </Link>
              )}

            </li>
          );
        })}
      </ol>
    </nav>
  );
}