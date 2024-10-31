import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { bytesToHex, createWalletClient, custom, getContract, hexToBytes, keccak256, recoverAddress, toHex } from "viem";
import { fakeWethAbi, yeetFinanceAbi } from "@/lib/abi";
import { auroraTestnet, baseSepolia } from "viem/chains";
import { Ethereum } from "@/lib/ethereum";
import { createContext, useContext, useState } from "react";
import { Wallet } from "@/lib/near";
import { deriveAddress } from "./kdf";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTruncatedAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const INDEXER_GRAPHQL_URL = process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL as string;

export const useNearWallet = () => {
  const [signedAccountId, setSignedAccountId] = useState('');
  const wallet = new Wallet({});
  wallet.startUp((signedAccountId) => setSignedAccountId(signedAccountId));
  return {signedAccountId, isConnected: !!signedAccountId, wallet}
}

export const useContracts = (getTxHash?: () => Promise<string>) => {
  const {wallet, signedAccountId} = useNearWallet();
  const { chain } = useContext(AppContext);

  const base = new Ethereum(baseSepolia.rpcUrls.default.http[0], baseSepolia.id)
  const aurora = new Ethereum(auroraTestnet.rpcUrls.default.http[0], auroraTestnet.id)

  const nearWalletClient = createWalletClient({
    chain: chain === "BASE" ? baseSepolia : auroraTestnet,
    account: deriveAddress(signedAccountId).address,
    transport: custom({
      async request({ method, params }) {
        switch (method) {
          case "eth_chainId":
            return chain === "BASE" ? baseSepolia.id : auroraTestnet.id;
          case "eth_sendTransaction":
            const ether = chain === "BASE" ? base : aurora;
            const [{data, from, to}] = params;
            const {transaction: unsignedTx, payload} = await ether.createPayload(from, to, 0, data);
            try {
              const preimage =  keccak256(unsignedTx.getMessageToSign(false));

              const {big_r, s, recovery_id} = await new Promise<{big_r: {affine_point: string}, s: {scalar: string}, recovery_id: number}>(async (resolve, reject) => {
                try {
                  const {big_r, s, recovery_id}: {big_r: {affine_point: string}, s: {scalar: string}, recovery_id: number} = await ether.requestSignatureToMPC(wallet, hexToBytes(preimage));
                  console.log("fetched from mpc sign")
                  return resolve({big_r, s, recovery_id});
                } catch (error) {
                  if (!getTxHash) return reject("getTxHash not implemented");
                  const txHash = await getTxHash();
                  //@ts-ignore
                  const {big_r, s, recovery_id}: {big_r: {affine_point: string}, s: {scalar: string}, recovery_id: number} = await wallet.getTransactionResult(txHash);
                  console.log("fetched from tx hash")
                  return resolve({big_r, s, recovery_id})
                }
                
              })
              console.log({big_r, s, recovery_id})
              const address = await recoverAddress({hash: preimage, signature: {
                r: toHex(Buffer.from(big_r.affine_point.substring(2), 'hex')),
                s: toHex(Buffer.from(s.scalar, 'hex')),
                yParity: recovery_id
              }})
              console.log({address})
              const signedTx = await ether.reconstructSignature(big_r,s,recovery_id+27,unsignedTx);
              const hash = await ether.relayTransaction(bytesToHex(signedTx.serialize()))
              console.log({hash})
              return toHex(hash)
            } catch (error) {
              console.log(error)
              console.error(`couldn't get mpc signature: ${error}`)
            }
            // end create tx
            return "signed tx";
          default:
            console.log({ method, params })
            alert(`unimplemented method ${method}`)
            break;
        }
        return {}
      }
    })
  })

  const walletClient = nearWalletClient;
  
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

  const baseFakeWeth = walletClient && getContract({
    address: '0xe49751FAE8412909ABa9cB953786c5F93D552CCa',
    abi: fakeWethAbi,
    client: {
      wallet: walletClient,
    }
  })
  const auroraFakeWeth = walletClient && getContract({
    address: '0xb3b2672C13c7F6087b7Da830FCc8E2754212f1B5',
    abi: fakeWethAbi,
    client: {
      wallet: walletClient,
    }
  })
  
  const yeetFinance = chain === "BASE" ? baseYeetFinance : auroraYeetFinance;
  const fakeWeth = chain === "BASE" ? baseFakeWeth : auroraFakeWeth;

  return {yeetFinance, fakeWeth}
}

export const MPC_CONTRACT = 'v1.signer-prod.testnet';

export const AppContext = createContext<{
  chain: "AURORA" | "BASE",
  setChain: (chain: "AURORA" | "BASE") => void
}>(null!);