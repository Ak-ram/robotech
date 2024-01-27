export const getAnnouncementData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/announcement.json`,
      {
        cache: "no-cache",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch announcement data");
    }
    return res.json();
  };