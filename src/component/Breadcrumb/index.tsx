"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex items-center flex-wrap">

        {/* Home */}
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");

          return (
            <li key={index} className="flex items-center">

              <span className="mx-2 text-gray-400">/</span>

              {index === pathSegments.length - 1 ? (
                <span className="text-gray-800 capitalize font-medium">
                  {segment.replace("-", " ")}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-blue-600 hover:underline capitalize"
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