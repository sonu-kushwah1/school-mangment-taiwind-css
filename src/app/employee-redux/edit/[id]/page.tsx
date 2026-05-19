"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import LayoutWrapper from "@/component/Layout";
import InputField from "@/component/InputFiled";
import SelectField from "@/component/selectFiled";
import TextAreaField from "@/component/TextAreaFiled";
import Button from "@/component/Button";

import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployees, updateEmployee } from "@/redux/empSlice";

export default function EditEmployee() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const employeeId = params.id as string;

  const { employees } = useSelector((state: RootState) => state.employee);

  const initialState = {
    fname: "",
    lname: "",
    gender: "male",
    phone: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  useEffect(() => {
    const emp = employees.find((e: any) => e.id === employeeId);

    if (emp) {
      setFormData({
        fname: emp.fname || "",
        lname: emp.lname || "",
        gender: emp.gender || "male",
        phone: emp.phone || "",
        email: emp.email || "",
        department: emp.department || "",
        designation: emp.designation || "",
        salary: emp.salary || "",
        address: emp.address || "",
      });
    }
  }, [employees, employeeId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        updateEmployee({
          id: employeeId,
          ...formData,
        }),
      ).unwrap();

      toast.success("Employee Updated Successfully");

      setTimeout(() => {
        router.push("/emp");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update employee");
    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Edit Employee</h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <InputField
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />

            <InputField
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />

            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
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
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              options={[
                { label: "Select Department", value: "" },
                { label: "HR", value: "HR" },
                { label: "IT", value: "IT" },
                { label: "Finance", value: "Finance" },
                { label: "Marketing", value: "Marketing" },
              ]}
            />

            <SelectField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              options={[
                { label: "Select Designation", value: "" },
                { label: "Manager", value: "Manager" },
                { label: "Developer", value: "Developer" },
                { label: "Analyst", value: "Analyst" },
                { label: "Designer", value: "Designer" },
              ]}
            />

            <InputField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              required
            />

            <div className="md:col-span-2">
              <TextAreaField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <Button
                label="Update Employee"
                type="submit"
                className="w-full"
              />
            </div>
          </form>
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
