export const getFaq = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/faq.json`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch faq");
  }
  return res.json();
};