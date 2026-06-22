// "use client";

// import { useState } from "react";
// import Link from "next/link";

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="text-xl font-bold text-indigo-600">
//             MyLogo
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <Link href="/" className="text-gray-700 hover:text-indigo-600">
//               Home
//             </Link>
//             <div className="relative group">
//               <button className="text-gray-700 hover:text-indigo-600 focus:outline-none flex items-center">
//                 Employee
//                 <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity z-10">
//                 <Link href="/emp" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">All Employees</Link>
//                 <Link href="/emp-pagination" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Employee Pagination</Link>
//               </div>
//             </div>
//             <Link
//               href="/student"
//               className="text-gray-700 hover:text-indigo-600"
//             >
//               Student
//             </Link>
//             <Link
//               href="/rest-api"
//               className="text-gray-700 hover:text-indigo-600"
//             >
//               Rest API Free
//             </Link>
//             <Link
//               href="/create"
//               className="text-gray-700 hover:text-indigo-600"
//             >
//               Create Blog
//             </Link>
//             <Link
//               href="/contact"
//               className="text-gray-700 hover:text-indigo-600"
//             >
//               Contact
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white shadow-md">
//           <Link href="/" className="block px-4 py-2 border-t">
//             Home
//           </Link>
//           <div className="border-t">
//             <button className="w-full text-left px-4 py-2 focus:outline-none flex items-center justify-between" onClick={() => setIsOpen((prev) => !prev)}>
//               Employee
//               <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//             <div className="pl-4">
//               <Link href="/emp" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">All Employees</Link>
//               <Link href="/emp-pagination" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Employee Pagination</Link>
//             </div>
//           </div>
//           <Link href="/student" className="block px-4 py-2 border-t">
//             Student
//           </Link>
//           <Link href="/contact" className="block px-4 py-2 border-t">
//             Contact
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }
// export default Navbar;
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setTheme, getTheme } from "@/utils/theme";
import { clearAuth } from "@/utils/auth";

export default function Navbar({ setSidebarOpen }: any) {
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedTheme = getTheme();
    setThemeState(savedTheme);
    setTheme(savedTheme);

    // ✅ Load user from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    setTheme(newTheme);
  };

  const getFullImageUrl = (imgUrl: string) => {
    if (!imgUrl) return "";
    if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
      return imgUrl;
    }
    const baseUrl = "http://localhost:5001";
    if (imgUrl.startsWith("/") || imgUrl.startsWith("uploads/") || imgUrl.startsWith("/uploads/")) {
      const cleanPath = imgUrl.startsWith("/") ? imgUrl : `/${imgUrl}`;
      return `${baseUrl}${cleanPath}`;
    }
    return `${baseUrl}/uploads/${imgUrl}`;
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#042954] border-b border-gray-700 px-6 py-4 text-white">

      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen((prev: boolean) => !prev)}
        className="text-2xl text-[#ffa601]"
      >
        ☰
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">

        {/* 🌙 Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm font-semibold hidden md:inline text-white/95 select-none">
              {user.fname || user.name || "User"}
            </span>
          )}

          <div className="relative">
            {user?.user_profile ? (
              <img
                src={getFullImageUrl(user.user_profile)}
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-8 h-8 rounded-full border-2 border-[#ffa601] cursor-pointer object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = document.getElementById("avatar-fallback");
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}

            {/* Initials Fallback if no user_profile or if image fails */}
            <div
              id="avatar-fallback"
              onClick={() => setOpenDropdown(!openDropdown)}
              style={{ display: user?.user_profile ? 'none' : 'flex' }}
              className="w-8 h-8 rounded-full border-2 border-[#ffa601] bg-[#ffa601] text-white flex items-center justify-center font-bold text-xs cursor-pointer select-none transition hover:bg-[#e59200]"
            >
              {getInitials(user?.fname || user?.name)}
            </div>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    clearAuth();
                    router.push("/login");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}