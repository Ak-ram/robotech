export const getOneProduct = async (categoryName: string, id: string) => {
    if (categoryName === "print") {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/3d.json`,
            {
                cache: "no-cache",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch print service");
        }
        let result = await res.json();
        return result?.find((item: { id: string }) => item.id === id);
    } else if (categoryName === "courses") {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/courses.json`,
            {
                cache: "no-cache",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch print service");
        }
        let result = await res.json();
        return result?.find((item: { id: string }) => item.id === id);
    } else {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/categories.json`,
            {
                cache: "no-cache",
            }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch product");
        }
        let result = await res.json();
        let f = result[0][`${categoryName}`].find(obj => obj.id === id);
        return f

    }


};



