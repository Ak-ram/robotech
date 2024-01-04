export async function getCategoryProducts(categoryName: string) {
  let path = categoryName.toLowerCase()
  const res = await fetch(
    `https://robotech-space.github.io/robotech/pages/shop/${path}.json`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path} list`);
  }
  return res.json();
}