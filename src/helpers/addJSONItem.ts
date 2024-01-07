import { updateJsonFile } from "@/helpers/updateJSONData";

export const handleAddItemClick = async (jsonArray: any[], editedItem: any) => {
  const updatedArray = [...jsonArray, editedItem];

  try {
    await updateJsonFile("robotech/pages/about.json", updatedArray);
    return updatedArray;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};