import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatFullName(fullName: string) {
  const words = fullName.split(' ');

  if (words.length < 4) {
    return words.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' '); // Return the original full name if it has less than three parts
  }

  const firstName = words[0];
  const modifiedNames = words.slice(2).map(name => name.charAt(0).toUpperCase() + '.');

  const formattedName = [firstName, words[1], ...modifiedNames].join(' ');

  return formattedName;
}

export function isColor(text: string) {
  const colorNames = ['black', 'orange', 'lime', 'cyan', 'indigo', 'violet', 'purple', 'rose', 'yellow', 'pink', 'sky', 'red', 'blue', 'green']; // Add more color names as needed
  return colorNames.includes(text.toLowerCase().trim());
};
