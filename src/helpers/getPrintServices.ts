export const getPrintServices = async () => {
  const res = await fetch(
    "https://robotech-space.github.io/robotech/pages/3d.json",
    // "https://akram-44.github.io/api/robotech/pages/3d.json",

    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch 3d print services");
  }
  return res.json();
};