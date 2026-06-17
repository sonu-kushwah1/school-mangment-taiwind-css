"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import {
  useParams,
  useRouter,
} from "next/navigation";

import LayoutWrapper from "@/component/Layout";

import {
  ToastContainer,
  toast,
  Slide,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";

import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";
import Button from "@/component/Button";

export default function EditStudent() {

  const router = useRouter();

  const params = useParams();

  // ✅ Fix ID issue
  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  // ✅ Fees List
  const [feesList, setFeesList] = useState<any[]>([]);

  // ✅ Loading
  const [loading, setLoading] = useState(true);

  // ✅ Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

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
    setExistingImage(null);
  };

  // ✅ Form Data
  const [formData, setFormData] = useState({
     first_name: "",
    last_name: "",
    gender: "male",
    mob_no: "",
    dob: "",
    blood_group: "A+",
    religion: "Hindu",
    class_name: "",
    email: "",
    section: "A",
    fees: ""
  });

  // ✅ Fetch Fees
  useEffect(() => {

    const fetchFees = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5001/api/fees"
        );

        console.log("FEES RESPONSE:", res.data);

        const feesData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setFeesList(feesData);

      } catch (error) {

        console.error("Fees Fetch Error:", error);

        toast.error("Failed to fetch fees");

      }
    };

    fetchFees();

  }, []);

  // ✅ Fetch Student By ID
  useEffect(() => {

    if (!id) return;

    const fetchStudent = async () => {

      try {

        setLoading(true);

        const res = await axios.get(
          `http://localhost:5001/api/student/${id}`
        );

        console.log("STUDENT RESPONSE:", res.data);

        // ✅ Handle multiple API structures
        const studentData =
          res.data.data ||
          res.data.student ||
          res.data;

        setFormData({
          first_name: studentData.first_name || "",
          last_name: studentData.last_name || "",
          gender: studentData.gender || "male",
          mob_no: studentData.mob_no || "",
          dob: studentData.dob
            ? studentData.dob.split("T")[0]
            : "",
          blood_group:
            studentData.blood_group || "A+",
          religion:
            studentData.religion || "Hindu",
          email: studentData.email || "",
          class_name:
            studentData.class_name || "",
          section: studentData.section || "A",
          fees: studentData.fees || "",
        });

        // ✅ Set Image URL
        const rawImage = studentData.student_img || studentData.image;
        if (rawImage) {
          const baseUrl = "http://localhost:5001";
          let fullUrl = "";
          if (rawImage.startsWith("http://") || rawImage.startsWith("https://")) {
            fullUrl = rawImage;
          } else if (rawImage.startsWith("/") || rawImage.startsWith("uploads/") || rawImage.startsWith("/uploads/")) {
            const cleanPath = rawImage.startsWith("/") ? rawImage : `/${rawImage}`;
            fullUrl = `${baseUrl}${cleanPath}`;
          } else {
            fullUrl = `${baseUrl}/uploads/${rawImage}`;
          }
          setExistingImage(fullUrl);
          setImagePreview(fullUrl);
        }

      } catch (error: any) {

        console.error(
          "Student Fetch Error:",
          error
        );

        toast.error("Failed to fetch student");

      } finally {

        setLoading(false);

      }
    };

    fetchStudent();

  }, [id]);

  // ✅ Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    // ✅ Auto Update Fees
    if (name === "class_name") {

      const selectedClass = feesList.find(
        (item) =>
          item.className === value
      );

      setFormData((prev) => ({
        ...prev,
        class_name: value,
        fees: selectedClass
          ? selectedClass.fees
          : "",
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

    }
  };

  // ✅ Update Student
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!id) {

      toast.error("Student ID not found");

      return;
    }

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
      } else if (existingImage === null) {
        // If the user removed the image, we can clear it on the backend by passing an empty string
        submissionData.append("student_img", "");
      }

      console.log("Updating student FormData...");

      const res = await axios.put(
        `http://localhost:5001/api/student/${id}`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(
        "UPDATE RESPONSE:",
        res.data
      );

      toast.success(
        "Student Updated Successfully"
      );

      setTimeout(() => {

        router.push("/student");

      }, 1500);

    } catch (error: any) {

      console.error(
        "Update Error:",
        error
      );

      toast.error("Failed to update student");

    }
  };

  return (
    <LayoutWrapper>

      <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">

        <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-6">

          <h1 className="text-2xl font-bold text-center mb-6">
            Edit Student
          </h1>

          {loading ? (

            <div className="text-center py-10">
              Loading student data...
            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

              <InputField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />

              <InputField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />

              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                  {
                    label: "Other",
                    value: "other",
                  },
                ]}
              />

              <InputField
                label="DOB"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
              />

              <InputField
                label="Phone"
                name="mob_no"
                type="number"
                value={formData.mob_no}
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

              {/* ✅ Class Dropdown */}
              <SelectField
                label="Class"
                name="class_name"
                value={formData.class_name}
                onChange={handleChange}
                options={
                  Array.isArray(feesList)
                    ? feesList.map((item) => ({
                        label: item.className,
                        value: item.className,
                      }))
                    : []
                }
              />

              {/* ✅ Fees */}
              <InputField
                label="Fees"
                name="fees"
                type="number"
                value={formData.fees}
                disabled
              />

              {/* ✅ Section */}
              <SelectField
                label="Section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                options={[
                  {
                    label: "Section A",
                    value: "A",
                  },
                  {
                    label: "Section B",
                    value: "B",
                  },
                  {
                    label: "Section C",
                    value: "C",
                  },
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
                      <span className="text-sm font-medium text-[#042954]">Click to Upload New Photo</span>
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
                            {imageFile ? imageFile.name : "Existing Photo"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {imageFile ? (imageFile.size / 1024 / 1024).toFixed(2) + " MB" : "Currently Saved"}
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

              {/* ✅ Submit Button */}
              <div className="md:col-span-2 mt-4">

                <Button
                  label="Update Student"
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