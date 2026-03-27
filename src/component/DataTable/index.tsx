"use client";

import DataTable, { TableColumn } from "react-data-table-component";

type Props<T> = {
  columns: TableColumn<T>[];
  data: T[];
  title?: string;
};

export default function CustomDataTable<T>({
  columns,
  data,
  title,
}: Props<T>) {
  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <DataTable
        title={title}
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
}