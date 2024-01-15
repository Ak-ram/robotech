import { getCategoryProducts } from "./getCategoryProducts";
import { getCourses } from "./getCourses";
import { getPrintServices } from "./getPrintServices";

export async function getProduct(id: number, prefix: string) {
  try {
    if (prefix === 'courses') {
      const data = await getCourses()
      if (data) {
        let product = data.filter(item => item.id === id);
        console.log(product)
        return product[0]
      }
    }
    if (prefix === 'print') {
      const data = await getPrintServices()
      if (data) {
        let product = data.filter(item => item.id === id);
        console.log(product)
        return product[0]
      }
    }
    else{
      const data = await getCategoryProducts(prefix)
      if (data) {
        let product = data.filter(item => item.id === id);
        console.log(product)
        return product[0]
      }
    }
  } catch (error) {
    console.log(error);
  }
}