export const getCourses = async () => {
  const res = await fetch(
    "https://robotech-space.github.io/robotech/pages/courses.json",
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  return res.json();
};