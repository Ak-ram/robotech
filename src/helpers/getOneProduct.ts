export const getOneProduct = async (categoryName, id) => {
    if (categoryName === "print") {
        const res = await fetch(
            "https://akram-44.github.io/api/robotech/pages/3d.json",
            {
                cache: "no-cache",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch print service");
        }
        let result = await res.json();
        return result?.find((item: { id: string | number; }) => +item.id === id);
    } else if (categoryName === "courses") {
        const res = await fetch(
            "https://akram-44.github.io/api/robotech/pages/courses.json",
            {
                cache: "no-cache",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch print service");
        }
        let result = await res.json();
        return result?.find((item: { id: string | number; }) => +item.id === id);
    } else {
        const res = await fetch(
            "https://akram-44.github.io/api/robotech/pages/categories.json",
            {
                cache: "no-cache",
            }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch product");
        }
        let result = await res.json();
        let f = result[0][`${categoryName}`].find(obj => +obj.id === +id);

        return f

    }


};