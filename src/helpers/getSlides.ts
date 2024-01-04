export async function getSlides() {
  const res = await fetch(
    "https://robotech-space.github.io/robotech/slides.json",
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories list");
  }
  return res.json();
};