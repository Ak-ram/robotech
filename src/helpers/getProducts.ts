export const getProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/categories.json`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  let result = await res.json()
  let newArray = [];
  result.forEach(obj => {
    Object.keys(obj).forEach(key => {
      newArray = newArray.concat(obj[key]);
    });
  });
  return newArray;
};