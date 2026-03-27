"use client";

import CustomDataTable from "@/component/DataTable";
import { TableColumn } from "react-data-table-component";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

export default function UsersPage() {
  const columns: TableColumn<User>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
  ];

  const data: User[] = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com", age: 25 },
    { id: 2, name: "Amit", email: "amit@gmail.com", age: 28 },
    { id: 3, name: "Sneha", email: "sneha@gmail.com", age: 22 },
  ];

  return (
    <div className="p-6">
      <CustomDataTable<User>
        title="Users List"
        columns={columns}
        data={data}
      />
    </div>
  );
}