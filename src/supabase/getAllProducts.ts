import supabase from "./config";

// Define a cache object
let cache: { [key: string]: any } = {};
let isUserActive = true;

// Function to release cached data when the user leaves the website
const releaseCachedData = () => {
  cache = {};
  isUserActive = false;
};

// Add event listener to release cached data before the user leaves
if (typeof window !== 'undefined') {
  window.addEventListener("beforeunload", releaseCachedData);
}

const getAllProducts = async (categoryName?: string, limit: number = 10, offset: number = 0) => {
  try {
    // If the user has left the website, release cached data
    if (!isUserActive) {
      cache = {};
      isUserActive = true; // Reset flag for the next session
    }
    // Generate a cache key based on inputs
    const cacheKey = `${categoryName || 'all'}_${limit}_${offset}`;

    // If data exists in cache, return it
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    // Calculate the range for fetching data
    const from = offset;
    const to = offset + limit - 1;

    // Construct the query
    let query = supabase.from('products')
      .select('*')
      .range(from, to)
      .order('id', { ascending: true });

    // Add category filter if provided
    if (categoryName) {
      query = query.eq("category", categoryName.toLowerCase());
    }

    // Execute the query
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Cache the fetched data
    cache[cacheKey] = data || [];

    return cache[cacheKey];
  } catch (error) {
    console.error('Error fetching products:', (error as Error).message);
    return []; // Return an empty array in case of error
  }
};

export { getAllProducts };
