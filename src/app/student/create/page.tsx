"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import LayoutWrapper from "@/component/Layout";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";
import Button from "@/component/Button";

import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";

interface FeeItem {
  className: string;
  fees: number;
}

export default function CreateStudent() {

  const studentUrl =
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_STUDENT_API}`;

  const feesUrl =
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_FEES_API}`;

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [feesList, setFeesList] = useState<FeeItem[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "male",
    mob_no: "",
    dob: "",
    blood_group: "A+",
    religion: "Hindu",
    email: "",
    class_name: "",
    section: "A",
    fees: ""
  });

  // ================= FETCH FEES =================
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await axios.get(
          feesUrl
        );

        console.log("FEES RESPONSE:", res.data);

        const feesData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setFeesList(feesData);

        // Default class and fees
        if (feesData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            class_name: feesData[0].className,
            fees: String(feesData[0].fees)
          }));
        }
      } catch (error) {
        console.error("Error fetching fees:", error);

        toast.error("Failed to load fees data");

        setFeesList([]);
      }
    };

    fetchFees();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Auto update fees when class changes
    if (name === "class_name") {
      const selectedClass = feesList.find(
        (item) => item.className === value
      );

      setFormData((prev) => ({
        ...prev,
        class_name: value,
        fees: selectedClass
          ? String(selectedClass.fees)
          : ""
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const submissionData = new FormData();
      submissionData.append("first_name", formData.first_name);
      submissionData.append("last_name", formData.last_name);
      submissionData.append("gender", formData.gender);
      submissionData.append("mob_no", formData.mob_no);
      submissionData.append("dob", formData.dob || "");
      submissionData.append("blood_group", formData.blood_group);
      submissionData.append("religion", formData.religion);
      submissionData.append("email", formData.email);
      submissionData.append("class_name", formData.class_name);
      submissionData.append("section", formData.section);
      submissionData.append("fees", formData.fees ? String(Number(formData.fees)) : "0");
      if (imageFile) {
        submissionData.append("student_img", imageFile);
      }

      console.log("Submitting student FormData...");

      const response = await axios.post(
        studentUrl,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("SUCCESS RESPONSE:", response.data);

      toast.success(
        response.data?.message ||
        "Student Created Successfully"
      );

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        gender: "male",
        mob_no: "",
        dob: "",
        blood_group: "A+",
        religion: "Hindu",
        email: "",
        class_name:
          feesList.length > 0
            ? feesList[0].className
            : "",
        section: "A",
        fees:
          feesList.length > 0
            ? String(feesList[0].fees)
            : ""
      });
      setImageFile(null);
      setImagePreview(null);

      // Redirect
      setTimeout(() => {
        router.push("/student");
      }, 1500);

    } catch (error: any) {

      console.error("SUBMIT ERROR:", error);

      // Axios error handling
      if (error.response) {

        console.log(
          "ERROR RESPONSE:",
          error.response.data
        );

        toast.error(
          error.response.data?.message ||
          "Server Error"
        );

      } else if (error.request) {

        toast.error(
          "No response from server"
        );

      } else {

        toast.error(
          "Something went wrong"
        );
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">

        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">

          <h1 className="text-2xl font-bold mb-6 text-center">
            Admission Form
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* FIRST NAME */}
            <InputField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />

            {/* LAST NAME */}
            <InputField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />

            {/* GENDER */}
            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                {
                  label: "Male",
                  value: "male"
                },
                {
                  label: "Female",
                  value: "female"
                },
                {
                  label: "Other",
                  value: "other"
                }
              ]}
            />

            {/* DOB */}
            <InputField
              label="DOB"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            {/* PHONE */}
            <InputField
              label="Phone"
              name="mob_no"
              type="number"
              value={formData.mob_no}
              onChange={handleChange}
              required
            />

            {/* EMAIL */}
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* CLASS */}
            <SelectField
              label="Class"
              name="class_name"
              value={formData.class_name}
              onChange={handleChange}
              options={feesList.map((item) => ({
                label: item.className,
                value: item.className
              }))}
            />

            {/* FEES */}
            <InputField
              label="Fees"
              name="fees"
              type="text"
              value={formData.fees}
              disabled
            />

            {/* SECTION */}
            <SelectField
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              options={[
                {
                  label: "Section A",
                  value: "A"
                },
                {
                  label: "Section B",
                  value: "B"
                },
                {
                  label: "Section C",
                  value: "C"
                }
              ]}
            />

            {/* IMAGE UPLOAD */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-[#042954]">
                Student Photo
              </label>
              
              <div className="border-2 border-dashed border-[#ffa601] rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition duration-200">
                {!imagePreview ? (
                  <label className="flex flex-col items-center justify-center cursor-pointer py-4">
                    <FaCloudUploadAlt className="text-4xl text-[#042954] mb-2" />
                    <span className="text-sm font-medium text-[#042954]">Click to Upload Photo</span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-[#ffa601] relative bg-white">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#042954] break-all max-w-[200px] sm:max-w-xs">
                          {imageFile?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {imageFile ? (imageFile.size / 1024 / 1024).toFixed(2) + " MB" : ""}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition text-sm font-medium cursor-pointer"
                    >
                      <FaTrashAlt />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2 mt-4">
              <Button
                label={
                  loading
                    ? "Saving..."
                    : "Save Student"
                }
                type="submit"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </div>

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        theme="colored"
      />
    </LayoutWrapper>
  );
}