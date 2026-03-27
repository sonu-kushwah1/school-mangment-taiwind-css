type Props = {
  search: string;
  setSearch: (val: string) => void;
  field: string;
  setField: (val: string) => void;
  fields: { label: string; value: string }[];
};

export default function FilterBar({
  search,
  setSearch,
  field,
  setField,
  fields,
}: Props) {
  return (
    <div className="flex gap-3 mb-4">
      <select
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        {fields.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="border px-3 py-2 rounded w-full"
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          className="bg-red-500 text-white px-3 rounded"
        >
          ✕
        </button>
      )}
    </div>
  );
}