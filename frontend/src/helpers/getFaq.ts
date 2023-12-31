export async function getFaq() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/faqs?populate=*`);
      const response = await res.json();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  