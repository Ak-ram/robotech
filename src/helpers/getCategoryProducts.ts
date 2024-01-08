export async function getCategoryProducts(categoryName: string) {
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

    // Check if the target key exists in the first object
    if (result.length > 0 && result[0].hasOwnProperty(categoryName)) {
      const targetArray = result.map(obj => obj[categoryName]);
      return targetArray[0]; // Return the array of the target key
    } else {
      console.error(`Key '${categoryName}' not found in the data.`);
      return null; // or handle the case where the key is not found
    }
  } catch (error) {
    console.error("Error fetching categories:", (error as Error).message);
    throw error;
  }
};
