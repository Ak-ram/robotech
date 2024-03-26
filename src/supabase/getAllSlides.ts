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

const getAllSlides = async () => {
  try {
    // If the user has left the website, release cached data
    if (!isUserActive) {
      cache = {};
      isUserActive = true; // Reset flag for the next session
    }

    // If data exists in cache, return it
    if (Object.keys(cache).length > 0) {
      return Object.values(cache)[0]; // Return the first (and only) item in the cache
    }

    // Construct the query
    let query = supabase.from('slides').select('*');

    // Execute the query
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Cache the fetched data
    cache['slides'] = data || [];

    return cache['slides'];
  } catch (error) {
    console.error('Error fetching slides:', (error as Error).message);
    return []; // Return an empty array in case of error
  }
};

export { getAllSlides };
