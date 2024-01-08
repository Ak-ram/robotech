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

    // Retrieve the keys from the first object in the result array
    const uniqueKeys = Object.keys(result[0]);

    console.log(uniqueKeys);
    
    return uniqueKeys; // Return the array of unique keys if needed
  } catch (error) {
    console.error("Error fetching categories:", (error as Error).message);
    throw error;
  }
};
