// export const getProducts = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/categories.json`,
//     {
//       cache: "no-cache",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch courses");
//   }
//   let result = await res.json()
//   let newArray = [];
//   result.forEach(obj => {
//     Object.keys(obj).forEach(key => {
//       newArray = newArray.concat(obj[key]);
//     });
//   });
//   return newArray;
// };
// Function to update local storage with the latest data
const updateLocalStorage = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/categories.json`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    let result = await res.json();
    let newArray: any[] = [];
    result.forEach((obj: any) => {
      Object.keys(obj).forEach((key: string) => {
        newArray = newArray.concat(obj[key]);
      });
    });

    // Cache the fetched data in local storage
    localStorage.setItem("cachedProducts", JSON.stringify(newArray));
    console.log('new request: local storage updated')
  } catch (error) {
    console.error("Error updating local storage:", error);
  }
};

// Call the updateLocalStorage function when the page is about to unload (refresh or navigate away)
window.addEventListener("beforeunload", updateLocalStorage);

// Function to fetch products (with caching)
export const getProducts = async (): Promise<any[]> => {
  // Check if data is already cached in local storage
  const cachedData = localStorage.getItem("cachedProducts");
  if (cachedData) {
    console.log('no caching')
    return JSON.parse(cachedData);
  }

  // If data is not cached, fetch it from the server
  await updateLocalStorage(); // Call the updateLocalStorage function to update local storage
  return JSON.parse(localStorage.getItem("cachedProducts") || "[]"); // Return the updated data from local storage
};
