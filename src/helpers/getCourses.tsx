export const getCourses = async () => {
  const res = await fetch(
    "https://akram-44.github.io/api/robotech/pages/courses.json",
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  return res.json();
};