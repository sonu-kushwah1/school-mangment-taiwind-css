export const applyFilter = <T>(
  data: T[],
  field: keyof T,
  search: string
): T[] => {
  if (!search) return data;

  return data.filter((item: any) =>
    item[field]
      ?.toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );
};