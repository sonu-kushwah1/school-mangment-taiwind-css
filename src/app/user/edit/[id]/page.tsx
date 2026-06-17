"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import LayoutWrapper from "@/component/Layout";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";
import Button from "@/component/Button";
import { getAuthToken } from "@/utils/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function EditUser() {
    const router = useRouter();
    const params = useParams();

    // ✅ Fix ID issue
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    // ✅ Loading
    const [loading, setLoading] = useState(true);

    // ✅ Password visibility
    const [showPassword, setShowPassword] = useState(false);

    // ✅ Form Data state using actual User API fields
    const [formData, setFormData] = useState({
        fname: "",
        email: "",
        role: "student",
        phone: "",
        password: "",
    });

    // ✅ Fetch User By ID
    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                setLoading(true);
                const token = getAuthToken();
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_API}/users`;
                
                let userData: any = null;

                // 1. Try to fetch specific user by ID first
                try {
                    console.log("FETCH USER BY ID:", `${baseUrl}/${id}`);
                    const res = await axios.get(`${baseUrl}/${id}`, { headers });
                    console.log("USER BY ID RESPONSE:", res.data);
                    
                    const extracted = res.data.data || res.data.user || res.data;
                    
                    if (extracted && typeof extracted === "object") {
                        userData = Array.isArray(extracted) ? extracted[0] : extracted;
                    }
                    
                    // Verify we got a valid object with actual fields, not a 404/empty response
                    if (userData && !userData.fname && !userData.name && !userData.email) {
                        userData = null; // trigger fallback if empty fields
                    }
                } catch (err) {
                    console.warn("Failed to fetch by specific ID, trying fallback list fetch...", err);
                }

                // 2. Fallback: Fetch all users and find the user with matching ID
                if (!userData) {
                    console.log("FETCHING ALL USERS AS FALLBACK:", baseUrl);
                    const res = await axios.get(baseUrl, { headers });
                    console.log("ALL USERS RESPONSE:", res.data);
                    
                    const usersArray = Array.isArray(res.data)
                        ? res.data
                        : (res.data.data || res.data.user || res.data || []);
                    
                    if (Array.isArray(usersArray)) {
                        userData = usersArray.find(
                            (u: any) => String(u.id) === String(id) || String(u._id) === String(id)
                        );
                    }
                }

                if (!userData) {
                    throw new Error("User not found in list or by ID");
                }

                console.log("FINAL PARSED USER DATA:", userData);

                const fname = userData.fname || userData.name || userData.first_name || userData.full_name || "";
                const email = userData.email || "";
                const role = userData.role || userData.gender || "student";
                const phone = userData.phone || userData.mob_no || userData.phone_number || "";

                setFormData({
                    fname,
                    email,
                    role,
                    phone,
                    password: "",
                });
            } catch (error: any) {
                console.error("User Fetch Error:", error);
                toast.error("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    // ✅ Handle Input Change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ Update User
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) {
            toast.error("User ID not found");
            return;
        }

        try {
            const token = getAuthToken();
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const userUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_API}/users/${id}`;

            const updateData: any = {
                fname: formData.fname,
                name: formData.fname, // fallback
                email: formData.email,
                role: formData.role,
                phone: formData.phone,
            };

            // Only update password if user entered one
            if (formData.password) {
                updateData.password = formData.password;
            }

            console.log("Updating user with data:", updateData);

            const res = await axios.put(userUrl, updateData, { headers });
            console.log("UPDATE RESPONSE:", res.data);

            toast.success("User Updated Successfully");

            setTimeout(() => {
                router.push("/user");
            }, 1500);
        } catch (error: any) {
            console.error("Update Error:", error);
            const errMsg = error.response?.data?.message || error.response?.data?.error || "Failed to update user";
            toast.error(errMsg);
        }
    };

    return (
        <LayoutWrapper>
            <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
                <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Edit User
                    </h1>

                    {loading ? (
                        <div className="text-center py-10">
                            Loading user data...
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <InputField
                                label="Full Name"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                                required
                            />

                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <SelectField
                                label="Role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                options={[
                                    {
                                        label: "Admin",
                                        value: "admin",
                                    },
                                    {
                                        label: "Student",
                                        value: "student",
                                    },
                                    {
                                        label: "Teacher",
                                        value: "teacher",
                                    },
                                ]}
                            />

                            <InputField
                                label="Phone"
                                name="phone"
                                type="text"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            <div className="relative">
                                <label className="block text-sm font-semibold mb-1 text-[#042954]">
                                    Password (leave blank to keep current)
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        className="w-full rounded-md px-3 py-2 pr-10 text-[#042954] border border-[#ffa601] bg-white outline-none transition focus:ring-2 focus:ring-[#ffa601] focus:border-[#ffa601] placeholder:text-[#042954]/60"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer flex items-center"
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* ✅ Submit Button */}
                            <div className="md:col-span-2 mt-4">
                                <Button
                                    label="Update User"
                                    type="submit"
                                    className="w-full"
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                transition={Slide}
                theme="colored"
            />
        </LayoutWrapper>
    );
}