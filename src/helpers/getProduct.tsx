export async function getProduct(id:number, prefix:string) {
  try {
    if (prefix! === 'cr') {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/courses/${id}?populate=*`);
      const response = await res.json();
      return response.data;
    }
    if (prefix! === 'pr') {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products/${id}?populate=*`);
      const response = await res.json();
      return response.data;
    }
    if (prefix! === 'print') {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/print-services/${id}?populate=*`);
      const response = await res.json();
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
