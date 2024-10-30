import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getContract } from "viem";
import { yeetFinanceAbi } from "./abi";
import { useWalletClient } from "wagmi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTruncatedAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const INDEXER_GRAPHQL_URL = process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL as string;

export const useContracts = () => {
  const {data: walletClient} = useWalletClient();
  
  const baseYeetFinance = walletClient && getContract({
    address: '0x2D2Fd1C08865eAAcb930b7F31a46e42Bb7742A05',
    abi: yeetFinanceAbi,
    client: {
      wallet: walletClient,
    }
  })
  const auroraYeetFinance = walletClient && getContract({
    address: '0xEc87C5619A31665100e3d4d588f1a8B2a20275C0',
    abi: yeetFinanceAbi,
    client: {
      wallet: walletClient,
    }
  })
  
  const yeetFinance = walletClient?.chain.id === 84532 ? baseYeetFinance : auroraYeetFinance;

  return {yeetFinance}
}