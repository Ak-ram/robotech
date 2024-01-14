export const getCategories = async () => {
  try {
    const res = await fetch(
      "https://akram-44.github.io/api/robotech/pages/categories.json",
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result = await res.json();
    const uniqueKeys: string[] = [];

    result.map(obj => {
      let key = Object.keys(obj);
      uniqueKeys.push(...key)
    })
    // Retrieve the keys from the first object in the result array


    return uniqueKeys; // Return the array of unique keys if needed
  } catch (error) {
    console.error("Error fetching categories:", (error as Error).message);
    throw error;
  }
};
