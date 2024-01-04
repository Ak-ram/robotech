export async function getCategories() {
    const res = await fetch(
      "https://robotech-space.github.io/robotech/pages/shop/categories.json",
      {
        cache: "no-cache",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch categories list");
    }
    return res.json();
  };