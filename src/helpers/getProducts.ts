// import { getCategories } from "./getCategories";
// import { getCategoryProducts } from "./getCategoryProducts";
import { getCategories } from "./getCategories";
import { getCategoryProducts } from "./getCategoryProducts";

export async function getProducts() {
  const categoryList = await getCategories();
  const all: any[] = await Promise.all(
    categoryList?.map(async (categoryName: string) => {
      const products = await getCategoryProducts(categoryName);
      return products;
    })
  );

  const flattenedAll = all.flat(); // Flatten the array of arrays

  return flattenedAll;
}