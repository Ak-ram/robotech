// import supabase from "./config";

// const getAllProducts = async (categoryName, limit, offset) => {
//   try {
//     const from = offset;
//     const to = offset + limit - 1;

//     let query = supabase.from('products')
//       .select('*')
//       .range(from, to)
//       .order('id', { ascending: true });

//     if (categoryName) {
//       query = query.eq("category", categoryName.toLowerCase());
//     }

//     const { data, error } = await query;

//     if (error) {
//       throw error;
//     }

//     return data || [];
//   } catch (error) {
//     console.error('Error fetching products:', (error as Error).message);
//     return []; // Return an empty array in case of error
//   }
// };

// export { getAllProducts };


// import supabase from "./config";

// // Define a cache object
// const cache = {};

// const getAllProducts = async (categoryName, limit, offset) => {
//   try {
//     // Generate a cache key based on inputs
//     const cacheKey = `${categoryName}_${limit}_${offset}`;

//     // If data exists in cache, return it
//     if (cache[cacheKey]) {
//       return cache[cacheKey];
//     }

//     const from = offset;
//     const to = offset + limit - 1;

//     let query = supabase.from('products')
//       .select('*')
//       .range(from, to)
//       .order('id', { ascending: true });

//     if (categoryName) {
//       query = query.eq("category", categoryName.toLowerCase());
//     }

//     const { data, error } = await query;

//     if (error) {
//       throw error;
//     }

//     // Cache the data
//     cache[cacheKey] = data || [];

//     return cache[cacheKey];
//   } catch (error) {
//     console.error('Error fetching products:', (error as Error).message);
//     return []; // Return an empty array in case of error
//   }
// };

// export { getAllProducts };


import supabase from "./config";

// Define a cache object
let cache = {};
let isUserActive = true;

// Function to release cached data when the user leaves the website
const releaseCachedData = () => {
  cache = {};
  isUserActive = false;
};

// Event listener to detect when the user leaves the website
window.addEventListener("beforeunload", releaseCachedData);

const getAllProducts = async (categoryName, limit, offset) => {
  try {
    // If the user has left the website, release cached data
    if (!isUserActive) {
      console.log('data released')
      cache = {};
      isUserActive = true; // Reset flag for next session
    }

    // Generate a cache key based on inputs
    const cacheKey = `${categoryName}_${limit}_${offset}`;

    // If data exists in cache, return it
    if (cache[cacheKey]) {
      console.log('no caching')
      return cache[cacheKey];
    }

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

    // Cache the data
    cache[cacheKey] = data || [];

    return cache[cacheKey];
  } catch (error) {
    console.error('Error fetching products:', (error as Error).message);
    return []; // Return an empty array in case of error
  }
};

export { getAllProducts };
