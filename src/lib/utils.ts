import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Bill } from "../../type";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFullName(fullName: string) {
  const words = fullName.split(" ");

  if (words.length < 4) {
    return words
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" "); // Return the original full name if it has less than three parts
  }

  const firstName = words[0];
  const modifiedNames = words
    .slice(2)
    .map((name) => name.charAt(0).toUpperCase() + ".");

  const formattedName = [firstName, words[1], ...modifiedNames].join(" ");

  return formattedName;
}

export function isColor(text: string) {
  const colorNames = [
    "black",
    "orange",
    "lime",
    "cyan",
    "indigo",
    "violet",
    "purple",
    "rose",
    "yellow",
    "pink",
    "sky",
    "red",
    "blue",
    "green",
  ]; // Add more color names as needed
  return colorNames.includes(text.toLowerCase().trim());
}

export function detectLanguage(text) {
  if (!text) return "Unknown";

  // Check if the text contains Arabic characters
  if (/[\u0600-\u06FF]/.test(text)) {
    return "ar";
  }
  // Check if the text contains Latin characters
  else if (/^[a-zA-Z]*$/.test(text)) {
    return "en";
  }
  // Default to unknown language
  else {
    return "Unknown";
  }
}

export function searchItems(items, searchTerm, searchType) {
  return items.filter((item) => {
    // Convert searchTerm to lowercase for case-insensitive search
    const term = searchTerm.toLowerCase();

    // Determine the search behavior based on searchType
    switch (searchType) {
      case "name":
        return item?.customerData?.fullName?.toLowerCase().includes(term);
      case "phone":
        return item?.customerData?.phone?.toLowerCase().includes(term);
      case "id":
        return item?.id === +term;
      default:
        return [];
    }
  });
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

// billUtils.ts

export const calculateTotalSells = (bills: Bill[]) => {
  return bills.reduce((accumulator, bill) => {
    return (
      accumulator +
      bill.data.reduce((subtotalAccumulator, transaction) => {
        return subtotalAccumulator + transaction.subtotal;
      }, 0)
    );
  }, 0);
};

export const calculateTotalProfit = (bills: Bill[]) => {
  return bills.reduce((accumulator, bill) => {
    return (
      accumulator +
      bill.data.reduce((profitAccumulator, transaction) => {
        return (
          profitAccumulator +
          (transaction.subtotal -
            transaction.wholesalePrice * transaction.quantity)
        );
      }, 0)
    );
  }, 0);
};
