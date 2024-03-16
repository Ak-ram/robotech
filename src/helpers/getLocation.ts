export const getLocation = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/location.json`,
      {
        cache: "no-cache",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch location data");
    }
    return res.json();
  };