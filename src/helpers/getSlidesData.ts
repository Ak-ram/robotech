export const getSlidesData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/slides.json`,
      {
        cache: "no-cache",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch about data");
    }
    return res.json();
  };