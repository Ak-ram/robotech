export const getSlidesData = async () => {
    const res = await fetch(
      "https://akram-44.github.io/api/robotech/pages/slides.json",
      {
        cache: "no-cache",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch about data");
    }
    return res.json();
  };