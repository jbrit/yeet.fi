import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTruncatedAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const INDEXER_GRAPHQL_URL = process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL as string;