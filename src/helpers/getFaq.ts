export const getFaq = async () => {
    const res = await fetch(
      "https://robotech-space.github.io/robotech/pages/faq.json",
      {
        cache: "no-cache",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch faq");
    }
    return res.json();
  };