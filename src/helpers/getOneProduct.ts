export const getOneProduct = async (categoryName, id) => {
    const res = await fetch(
        "https://akram-44.github.io/api/robotech/pages/categories.json",
        {
            cache: "no-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch courses");
    }
    let result = await res.json()
    return result[0][categoryName].find((item: { id: string | number; }) => +item.id === id);
};