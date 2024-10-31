import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { bytesToHex, createWalletClient, custom, getContract, hexToBytes, keccak256, parseSignature, recoverAddress, recoverPublicKey, serializeTransaction, toHex } from "viem";
import { yeetFinanceAbi } from "./abi";
import { useWalletClient } from "wagmi";
import { baseSepolia } from "viem/chains";
import { Ethereum } from "./ethereum";
import { useState } from "react";
import { Wallet } from "./near";

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
  const {wallet} = useNearWallet();
  const base = new Ethereum(baseSepolia.rpcUrls.default.http[0], baseSepolia.id)
  const nearWalletClient = createWalletClient({
    chain: baseSepolia,
    account: "0x0f7679550a1ec9307c98848d291dba45f56194a7",
    transport: custom({
      async request({ method, params }) {
        switch (method) {
          case "eth_chainId":
            return baseSepolia.id;
          case "eth_sendTransaction":
            const [{data, from, to}] = params;
            const {transaction: unsignedTx, payload} = await base.createPayload(from, to, 0, data);
            try {
              const preimage =  keccak256(unsignedTx.getMessageToSign(false));

              const {big_r, s, recovery_id} = await new Promise<{big_r: {affine_point: string}, s: {scalar: string}, recovery_id: number}>(async (resolve, reject) => {
                try {
                  const {big_r, s, recovery_id}: {big_r: {affine_point: string}, s: {scalar: string}, recovery_id: number} = await base.requestSignatureToMPC(wallet, hexToBytes(preimage));
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
              const signedTx = await base.reconstructSignature(big_r,s,recovery_id+27,unsignedTx);
              const hash = await base.relayTransaction(bytesToHex(signedTx.serialize()))
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
  const {data} = useWalletClient();
  let walletClient = data;
  walletClient = nearWalletClient;
  
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

export const MPC_CONTRACT = 'v1.signer-prod.testnet';