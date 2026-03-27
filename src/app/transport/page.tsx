"use client";

import { useEffect, useState } from "react";
import LayoutWrapper from "@/component/Layout";
import Breadcrumb from "@/component/Breadcrumb";
import TableActions from "@/component/TableActions";
import InputField from "@/component/InputFiled";

export default function TransportManager() {
  const API = "http://localhost:3001/transport_list";

  const [routeName, setRouteName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [transportList, setTransportList] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch Transport Data
  const fetchTransport = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTransportList(data);
  };

  useEffect(() => {
    fetchTransport();
  }, []);

  // Add or Update Transport
  const handleSave = async () => {
    if (!routeName || !vehicleNumber) return;

    const payload = {
      routeName,
      vehicleNumber,
      driverName,
      licenseNumber,
      phoneNumber,
    };

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setEditId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    setRouteName("");
    setVehicleNumber("");
    setDriverName("");
    setLicenseNumber("");
    setPhoneNumber("");

    fetchTransport();
  };

  // Delete Transport
  const handleDelete = async (id: number|string) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchTransport();
  };

  // Edit Transport
  const handleEdit = (item: any) => {
    setRouteName(item.routeName);
    setVehicleNumber(item.vehicleNumber);
    setDriverName(item.driverName);
    setLicenseNumber(item.licenseNumber);
    setPhoneNumber(item.phoneNumber);

    setEditId(item.id);
  };

  return (
    <LayoutWrapper>
      <Breadcrumb />
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-6">Transport Manager</h2>

        {/* Form */}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <InputField
            type="text"
            placeholder="Route Name"
            value={routeName}
            required
            onChange={(e) => setRouteName(e.target.value)}
          />

      
          <InputField
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
           
          />

          <InputField
            type="text"
            placeholder="Driver Name"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            
          />

          <InputField
            type="text"
            placeholder="License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
         
          />

          <InputField
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
     
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-yellow-500 text-white px-4 py-2 rounded mb-6"
        >
          {editId ? "Update Transport" : "Add Transport"}
        </button>

        {/* Table */}

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Route</th>
              <th className="border p-2">Vehicle</th>
              <th className="border p-2">Driver</th>
              <th className="border p-2">License</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {transportList.map((item, index) => (
              <tr key={item.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.routeName}</td>
                <td className="border p-2">{item.vehicleNumber}</td>
                <td className="border p-2">{item.driverName}</td>
                <td className="border p-2">{item.licenseNumber}</td>
                <td className="border p-2">{item.phoneNumber}</td>

                <td className="border p-2 space-x-2">
              
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutWrapper>
  );
}
