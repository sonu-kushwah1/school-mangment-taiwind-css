"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaUserShield,
    FaArrowLeft
} from "react-icons/fa";
import { getAuthToken } from "@/utils/auth";

export default function ViewUser() {
    const { id } = useParams();
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = getAuthToken();
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_API}/users`;

                let userData: any = null;

                // 1. Try to fetch specific user by ID first
                try {
                    const res = await axios.get(`${baseUrl}/${id}`, { headers });
                    const extracted = res.data.data || res.data.user || res.data;
                    if (extracted && typeof extracted === "object") {
                        userData = Array.isArray(extracted) ? extracted[0] : extracted;
                    }
                    if (userData && !userData.fname && !userData.name && !userData.email) {
                        userData = null;
                    }
                } catch (err) {
                    console.warn("Failed to fetch user by specific ID, trying fallback...", err);
                }

                // 2. Fallback: Fetch all users and find the user with matching ID
                if (!userData) {
                    const res = await axios.get(baseUrl, { headers });
                    const usersArray = Array.isArray(res.data)
                        ? res.data
                        : (res.data.data || res.data.user || res.data || []);
                    if (Array.isArray(usersArray)) {
                        userData = usersArray.find(
                            (u: any) => String(u.id) === String(id) || String(u._id) === String(id)
                        );
                    }
                }

                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.error("Fetch user error:", error);
            }
        };

        if (id) fetchUser();
    }, [id]);

    if (!user) {
        return (
            <LayoutWrapper>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading user profile...</p>
                    </div>
                </div>
            </LayoutWrapper>
        );
    }

    // Handle user image URL
    const rawImage = user.user_profile || user.image;
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

    const imageUrl = getFullImageUrl(rawImage);
    const displayName = user.fname || user.name || "Anonymous User";
    const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

    return (
        <LayoutWrapper>
            <Breadcrumb />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-start p-4 md:p-8">
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-3xl overflow-hidden border border-gray-100">

                    {/* Cover Header Banner */}
                    <div className="h-40 md:h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                    </div>

                    {/* Profile Photo Section (Overlapping) */}
                    <div className="px-6 md:px-12 pb-6 relative">
                        <div className="flex flex-col items-center -mt-20 md:-mt-24 mb-6">
                            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center relative z-10 transition-transform duration-300 hover:scale-105">
                                {imageUrl && !imageError ? (
                                    <img
                                        src={imageUrl}
                                        alt={displayName}
                                        className="w-full h-full object-cover"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold tracking-wider">
                                        {initials || <FaUser />}
                                    </div>
                                )}
                            </div>

                            {/* User Name */}
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-4 text-center">
                                {displayName}
                            </h2>

                            {/* Badges / Quick Meta */}
                            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-100">
                                    User ID: {user.id || user._id}
                                </span>
                                {user.role && (
                                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100 uppercase tracking-wider">
                                        Role: {user.role}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Grid details */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                                User Profile Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Email */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                        <FaEnvelope className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</span>
                                        <span className="text-sm font-medium text-gray-700 break-all">{user.email || "N/A"}</span>
                                    </div>
                                </div>

                                {/* Mobile / Phone */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                        <FaPhone className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</span>
                                        <span className="text-sm font-medium text-gray-700">{user.phone || user.mob_no || "N/A"}</span>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                        <FaUserShield className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Account Role</span>
                                        <span className="text-sm font-medium text-gray-700 capitalize">{user.role || "N/A"}</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                            <button
                                onClick={() => router.push("/user")}
                                className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                            >
                                <FaArrowLeft />
                                <span>Back to List</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
