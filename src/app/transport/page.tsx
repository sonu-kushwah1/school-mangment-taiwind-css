"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import InputField from "@/component/InputFiled";
import CommonDataTable from "@/component/DataTable";

type Transport = {
  id: number;
  routeName: string;
  vehicleNo: string;
  driverName: string;
  licenseNo: string;
  phoneNo: string;
};

export default function TransportManager() {

  // ✅ API
  const API = "http://localhost:5001/api/transport";

  // ✅ Form States
  const [routeName, setRouteName] = useState("");

  const [vehicleNo, setVehicleNo] = useState("");

  const [driverName, setDriverName] = useState("");

  const [licenseNo, setLicenseNo] = useState("");

  const [phoneNo, setPhoneNo] = useState("");

  // ✅ Table State
  const [transportList, setTransportList] = useState<Transport[]>([]);

  // ✅ Edit State
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Fetch Transport List
  const fetchTransport = async () => {

    try {

      const res = await axios.get(API);

      console.log("GET RESPONSE:", res.data);

      // ✅ Handle both response types
      if (Array.isArray(res.data)) {

        setTransportList(res.data);

      } else {

        setTransportList(res.data.data || []);

      }

    } catch (error) {

      console.log("FETCH ERROR:", error);

      setTransportList([]);

    }
  };

  // ✅ Load Data
  useEffect(() => {

    fetchTransport();

  }, []);

  // ✅ Add / Update Transport
  const handleSave = async () => {

    if (
      !routeName ||
      !vehicleNo ||
      !driverName
    ) {

      alert("Please fill all required fields");

      return;
    }

    // ✅ Payload
    const payload = {

      routeName,
      vehicleNo,
      driverName,
      licenseNo,
      phoneNo,

    };

    console.log("PAYLOAD:", payload);

    try {

      // ✅ UPDATE
      if (editId !== null) {

        const res = await axios.put(
          `${API}/${editId}`,
          payload
        );

        console.log("UPDATE RESPONSE:", res.data);

        alert("Transport updated successfully");

        setEditId(null);

      }

      // ✅ CREATE
      else {

        const res = await axios.post(
          API,
          payload
        );

        console.log("CREATE RESPONSE:", res.data);

        alert("Transport added successfully");

      }

      // ✅ Reset Form
      setRouteName("");

      setVehicleNo("");

      setDriverName("");

      setLicenseNo("");

      setPhoneNo("");

      // ✅ Refresh Table
      fetchTransport();

    } catch (error: any) {

      console.log("SAVE ERROR:", error);

      alert(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    }
  };

  // ✅ Delete Transport
  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {

      const res = await axios.delete(
        `${API}/${id}`
      );

      console.log("DELETE RESPONSE:", res.data);

      alert("Deleted successfully");

      fetchTransport();

    } catch (error) {

      console.log("DELETE ERROR:", error);

      alert("Delete failed");

    }
  };

  // ✅ Edit Transport
  const handleEdit = (
    item: Transport
  ) => {

    setRouteName(item.routeName);

    setVehicleNo(item.vehicleNo);

    setDriverName(item.driverName);

    setLicenseNo(item.licenseNo);

    setPhoneNo(item.phoneNo);

    setEditId(item.id);

  };

  // ✅ Table Columns
  const columns = [

    {
      name: "ID",

      cell: (_: Transport, index: number) =>
        index + 1,

      width: "80px",
    },

    {
      name: "Route Name",

      selector: (row: Transport) =>
        row.routeName,

      sortable: true,
    },

    {
      name: "Vehicle Number",

      selector: (row: Transport) =>
        row.vehicleNo,

      sortable: true,
    },

    {
      name: "Driver Name",

      selector: (row: Transport) =>
        row.driverName,

      sortable: true,
    },

    {
      name: "License Number",

      selector: (row: Transport) =>
        row.licenseNo,

      sortable: true,
    },

    {
      name: "Phone Number",

      selector: (row: Transport) =>
        row.phoneNo,

      sortable: true,
    },

    {
      name: "Actions",

      cell: (item: Transport) => (

        <div className="flex gap-2">

          <button
            onClick={() =>
              handleEdit(item)
            }
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() =>
              handleDelete(item.id)
            }
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </div>
      ),
    },
  ];

  return (

    <LayoutWrapper>

      <Breadcrumb />

      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-6">
          Transport Manager
        </h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          <InputField
            type="text"
            placeholder="Route Name"
            value={routeName}
            onChange={(e) =>
              setRouteName(e.target.value)
            }
          />

          <InputField
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNo}
            onChange={(e) =>
              setVehicleNo(e.target.value)
            }
          />

          <InputField
            type="text"
            placeholder="Driver Name"
            value={driverName}
            onChange={(e) =>
              setDriverName(e.target.value)
            }
          />

          <InputField
            type="text"
            placeholder="License Number"
            value={licenseNo}
            onChange={(e) =>
              setLicenseNo(e.target.value)
            }
          />

          <InputField
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) =>
              setPhoneNo(e.target.value)
            }
          />

        </div>

        {/* Button */}
        <button
          onClick={handleSave}
          className={`text-white px-4 py-2 rounded mb-6 ${
            editId !== null
              ? "bg-blue-500"
              : "bg-yellow-500"
          }`}
        >
          {editId !== null
            ? "Update Transport"
            : "Add Transport"}
        </button>

        {/* Table */}
        <CommonDataTable
          title="Transport List"
          data={transportList}
          columns={columns}
        />

      </div>

    </LayoutWrapper>
  );
}