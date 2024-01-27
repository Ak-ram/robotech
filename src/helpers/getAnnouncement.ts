export const getAnnouncementData = async () => {
    const res = await fetch(
      "https://akram-44.github.io/api/robotech/pages/announcement.json",
      {
        cache: "no-cache",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch announcement data");
    }
    return res.json();
  };