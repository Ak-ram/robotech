export const getProducts = async () => {
  const res = await fetch(
    "https://akram-44.github.io/api/robotech/pages/categories.json",
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  let result = await res.json()
  let newArray = [];

  // Loop through each object in the input JSON
  result.forEach(obj => {
    // Loop through the keys of each object
    Object.keys(obj).forEach(key => {
      // Concatenate the values of each key to the new array
      newArray = newArray.concat(obj[key]);
    });
  });
  return newArray;
};