export const getAboutData = async () => {
  const res = await fetch(
    "https://robotech-space.github.io/robotech/pages/about.json",
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch about data");
  }
  return res.json();
};