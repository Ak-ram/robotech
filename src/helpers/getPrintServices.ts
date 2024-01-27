export const getPrintServices = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/3d.json`,

    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch 3d print services");
  }
  return res.json();
};