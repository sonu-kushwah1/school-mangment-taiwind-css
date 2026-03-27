export const setTheme = (theme: "light" | "dark") => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  localStorage.setItem("theme", theme);
};

export const getTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("theme") as "light" | "dark") || "light";
};