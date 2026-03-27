import { useState, useMemo } from "react";
import { applyFilter } from "@/utils/filter";

export const useFilter = <T>(
  data: T[],
  defaultField: keyof T
) => {
  const [search, setSearch] = useState("");
  const [field, setField] = useState<keyof T>(defaultField);

  const filteredData = useMemo(() => {
    return applyFilter(data, field, search);
  }, [data, field, search]);

  return {
    search,
    setSearch,
    field,
    setField,
    filteredData,
  };
};