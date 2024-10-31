import { base_decode } from 'near-api-js/lib/utils/serialize';
import { ec as EC } from 'elliptic';
import { keccak256 } from "viem";
import { sha3_256 } from 'js-sha3'

const rootPublicKey = 'secp256k1:4NfTiv3UsGahebgTaHyD9vF8KYKMBnfd6kh94mK6xv8fGBiJB8TBtFMP5WWXz6B89Ac1fbpzPwAvoyQebemHFwx3';
export const evm_derivation_path = "ethereum-1";

export function najPublicKeyStrToUncompressedHexPoint() {
  const res = '04' + Buffer.from(base_decode(rootPublicKey.split(':')[1])).toString('hex');
  return res;
}

export function deriveChildPublicKey(
  parentUncompressedPublicKeyHex: string,
  signerId: string,
  path = evm_derivation_path
) {
  const ec = new EC("secp256k1");
  const scalarHex = sha3_256(
    `near-mpc-recovery v0.1.0 epsilon derivation:${signerId},${path}`
  );

  const x = parentUncompressedPublicKeyHex.substring(2, 66);
  const y = parentUncompressedPublicKeyHex.substring(66);

  // Create a point object from X and Y coordinates
  const oldPublicKeyPoint = ec.curve.point(x, y);

  // Multiply the scalar by the generator point G
  const scalarTimesG = ec.g.mul(scalarHex);

  // Add the result to the old public key point
  const newPublicKeyPoint = oldPublicKeyPoint.add(scalarTimesG);
  const newX = newPublicKeyPoint.getX().toString("hex").padStart(64, "0");
  const newY = newPublicKeyPoint.getY().toString("hex").padStart(64, "0");
  return "04" + newX + newY;
}

export function uncompressedHexPointToEvmAddress(uncompressedHexPoint: string) {
  const addressHash = keccak256(`0x${uncompressedHexPoint.slice(2)}`);

  // Ethereum address is last 20 bytes of hash (40 characters), prefixed with 0x
  return ("0x" + addressHash.substring(addressHash.length - 40)) as `0x${string}`;
}

export const deriveAddress = (accountId: string) => {
    const publicKey = deriveChildPublicKey(najPublicKeyStrToUncompressedHexPoint(), accountId);
    const address = uncompressedHexPointToEvmAddress(publicKey);
    return { publicKey: Buffer.from(publicKey, 'hex'), address };
}