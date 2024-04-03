import supabase from "@/supabase/config";
import { transactionsType } from "../../type";

export const getCustomerOrdersList = async (customerId) => {
  try {
    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .eq("customerId", customerId!);

    if (error) {
      throw error;
    }
    console.log(data!);
    return data!;
  } catch (error) {
    console.error("Error fetching customer data:", (error as Error).message);
  }
};
