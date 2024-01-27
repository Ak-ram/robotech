export const getCourses = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/courses.json`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  return res.json();
};