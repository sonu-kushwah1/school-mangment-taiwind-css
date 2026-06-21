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
    FaVenusMars,
    FaCalendarAlt,
    FaTint,
    FaPray,
    FaGraduationCap,
    FaMoneyBillWave,
    FaArrowLeft
} from "react-icons/fa";

export default function ViewStudent() {
    const { id } = useParams();
    const router = useRouter();

    const [student, setStudent] = useState<any>(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/student/${id}`);
                const studentData = res.data.data || res.data.student || res.data;
                setStudent(studentData);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        if (id) fetchStudent();
    }, [id]);

    if (!student) {
        return (
            <LayoutWrapper>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading student profile...</p>
                    </div>
                </div>
            </LayoutWrapper>
        );
    }

    // Handle student image URL
    const rawImage = student.student_img || student.image;
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
    const initials = `${student.first_name?.[0] || ""}${student.last_name?.[0] || ""}`.toUpperCase();

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
                                        alt={`${student.first_name} ${student.last_name}`}
                                        className="w-full h-full object-cover"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold tracking-wider">
                                        {initials || <FaUser />}
                                    </div>
                                )}
                            </div>

                            {/* Student Name */}
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-4 text-center">
                                {student.first_name} {student.last_name}
                            </h2>

                            {/* Badges / Quick Meta */}
                            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-100">
                                    ID: {student.id}
                                </span>
                                {student.class_name && (
                                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100">
                                        Class: {student.class_name} {student.section ? `(${student.section})` : ""}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Grid details */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                                Personal & Academic Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Email */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                        <FaEnvelope className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</span>
                                        <span className="text-sm font-medium text-gray-700 break-all">{student.email || "N/A"}</span>
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                        <FaPhone className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Mobile Number</span>
                                        <span className="text-sm font-medium text-gray-700">{student.mob_no || "N/A"}</span>
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                        <FaVenusMars className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender</span>
                                        <span className="text-sm font-medium text-gray-700 capitalize">{student.gender || "N/A"}</span>
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                                        <FaCalendarAlt className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Date of Birth</span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {student.dob ? new Date(student.dob).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) : "N/A"}
                                        </span>
                                    </div>
                                </div>

                                {/* Blood Group */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                                        <FaTint className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Blood Group</span>
                                        <span className="text-sm font-medium text-gray-700">{student.blood_group || "N/A"}</span>
                                    </div>
                                </div>

                                {/* Religion */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                                        <FaPray className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Religion</span>
                                        <span className="text-sm font-medium text-gray-700">{student.religion || "N/A"}</span>
                                    </div>
                                </div>

                                {/* Class & Section */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <FaGraduationCap className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Class & Section</span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {student.class_name || "N/A"} {student.section ? `- Section ${student.section}` : ""}
                                        </span>
                                    </div>
                                </div>

                                {/* Fees */}
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="p-3 bg-teal-50 text-teal-600 rounded-lg">
                                        <FaMoneyBillWave className="text-lg" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Fees / Tuition</span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {student.fees ? `₹${Number(student.fees).toLocaleString()}` : "N/A"}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                            <button
                                onClick={() => router.push("/student")}
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
