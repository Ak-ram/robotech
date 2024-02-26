// Function to update local storage with the latest slides data
const updateSlidesLocalStorage = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/slides.json`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch slides data");
    }

    const slidesData = await res.json();

    // Cache the fetched slides data in local storage
    localStorage.setItem("slidesData", JSON.stringify(slidesData));
  } catch (error) {
    console.error("Error updating slides data in local storage:", error);
  }
};

// Call the updateSlidesLocalStorage function when the page is about to unload (refresh or navigate away)
window.addEventListener("beforeunload", updateSlidesLocalStorage);

// Function to fetch slides data (with caching)
export const getSlidesData = async () => {
  // Check if data is already cached in local storage
  const cachedData = localStorage.getItem("cachedSlidesData");
  if (cachedData) {
    console.log('Cached slides data is used');
    return JSON.parse(cachedData);
  }

  console.log('Request for slides data');
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/slides.json`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch about data");
  }

  const slidesData = await res.json();

  // Cache the fetched data in local storage
  localStorage.setItem("cachedSlidesData", JSON.stringify(slidesData));

  return slidesData;
};
