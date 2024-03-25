import supabase from "./config";

const getAllProducts = async (categoryName, limit, offset) => {
    try {
      const from = offset;
      const to = offset + limit - 1;
  
      let query = supabase.from('products')
                          .select('*')
                          .range(from, to)
                          .order('id', { ascending: true });
  
      if (categoryName) {
        query = query.eq("category", categoryName.toLowerCase());
      }
  
      const { data, error } = await query;
  
      if (error) {
        throw error;
      }
  
      return data || [];
    } catch (error) {
      console.error('Error fetching products:', (error as Error).message);
      return []; // Return an empty array in case of error
    }
  };
  
  export { getAllProducts };
  