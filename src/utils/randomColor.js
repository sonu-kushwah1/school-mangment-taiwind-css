import randomColor from "randomcolor";

export const getRandomBorderColor = () => {
  return randomColor({
    luminosity: "dark", // optional
  });
};