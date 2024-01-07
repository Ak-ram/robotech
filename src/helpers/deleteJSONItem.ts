import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";

export const handleRemoveItem = async (jsonArray: any[], index: number) => {
  const updatedArray = [...jsonArray];
  updatedArray.splice(index, 1);

  try {
    await updateJsonFile("robotech/pages/about.json", updatedArray);
    return updatedArray;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const fetchData = async () => {
  try {
    return await fetchJsonData("robotech/pages/about.json");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};