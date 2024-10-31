import { Numbers, Web3 } from "web3"
import { Address, bytesToHex } from 'viem';
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import { deriveChildPublicKey, evm_derivation_path, najPublicKeyStrToUncompressedHexPoint, uncompressedHexPointToEvmAddress } from './kdf';
import type { BufferLike } from '@ethereumjs/util'
import { JsonRpcProvider } from "ethers";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { Wallet } from "./near";
import { MPC_CONTRACT } from "./utils";

export class Ethereum {
  web3: Web3;
  provider: JsonRpcProvider;
  chain_id: number;

  constructor(chain_rpc: string, chain_id: number) {
    this.web3 = new Web3(chain_rpc);
    this.provider = new JsonRpcProvider(chain_rpc);
    this.chain_id = chain_id;
  }

  async deriveAddress(accountId: string, derivation_path: string) {
    const publicKey = await deriveChildPublicKey(najPublicKeyStrToUncompressedHexPoint(), accountId, derivation_path);
    const address = await uncompressedHexPointToEvmAddress(publicKey);
    return { publicKey: Buffer.from(publicKey, 'hex'), address };
  }

  async queryGasPrice() {
    const maxFeePerGas = await this.web3.eth.getGasPrice();
    const maxPriorityFeePerGas = await this.web3.eth.getMaxPriorityFeePerGas();
    return { maxFeePerGas, maxPriorityFeePerGas };
  }

  async getBalance(accountId: string) {
    const balance = await this.web3.eth.getBalance(accountId);
    return this.web3.utils.fromWei(balance, "ether");
  }

  async createPayload(sender: Address, receiver: Address, amount: Numbers, data: BufferLike) {

    // Get the nonce & gas price
    const nonce = await this.web3.eth.getTransactionCount(sender);
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.queryGasPrice();

    // Construct transaction
    const transactionData = {
      nonce,
      gasLimit: 2_000_000,
      maxFeePerGas,
      maxPriorityFeePerGas,
      to: receiver,
      data: data,
      value: BigInt(this.web3.utils.toWei(amount, "ether")),
      chainId: this.chain_id,
    };
    console.log({transactionData});

    // Create a transaction
    const transaction = FeeMarketEIP1559Transaction.fromTxData(transactionData);
    const payload = transaction.getMessageToSign();

    return { transaction, payload };
  }

  async requestSignatureToMPC(wallet: Wallet, ethPayload: any, contractId=MPC_CONTRACT, path=evm_derivation_path) {
    // Ask the MPC to sign the payload
    const payload = Array.from(ethPayload);
    // @ts-ignore
    const { big_r, s, recovery_id } = await wallet.callMethod({ contractId, method: 'sign', args: { request: { payload, path, key_version: 0 } }, gas: '300000000000000', deposit: parseNearAmount('0.25')!});
    return { big_r, s, recovery_id };
  }

  async reconstructSignature(big_r: {affine_point: string}, S: {scalar: string}, recovery_id: number, transaction: FeeMarketEIP1559Transaction) {
    // reconstruct the signature
    const r = Buffer.from(big_r.affine_point.substring(2), 'hex');
    const s = Buffer.from(S.scalar, 'hex');
    const v = recovery_id;

    const signature = transaction._processSignature(BigInt(v), r, s);

    if (!signature.verifySignature()) throw new Error("Signature is not valid");
    return signature;
  }


  // This code can be used to actually relay the transaction to the Ethereum network
  async relayTransaction(serializedTx: string) {
    const relayed = await this.web3.eth.sendSignedTransaction(serializedTx);
    return relayed.transactionHash
  }
}