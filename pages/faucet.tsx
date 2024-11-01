import { TxModal } from "@/components/txmodal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContracts, useNearWallet } from "@/lib/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function Faucet() {
  const {isConnected, derivedAddress} = useNearWallet();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const TX_HASH_CLICKED = "TX_HASH_CLICKED";

  const getTxHash = () => new Promise<string>((res, rej) => {
    localStorage.setItem(TX_HASH_CLICKED,"");
    setIsConfirmDialogOpen(true);
    const interval = setInterval(function() {  
      if (!!localStorage.getItem(TX_HASH_CLICKED)) {
        clearInterval(interval);
        res(localStorage.getItem("txHash") ?? "")
        setIsConfirmDialogOpen(false)
      };
    }, 1000)
  })
  const {fakeWeth} = useContracts(getTxHash);

  const [receiverAddress, setReceiverAddress] = useState<`0x${string}`>("" as `0x${string}`);
  const [amountToSend, setAmountToSend] = useState<string>("5");

  useEffect(() => {
    if (derivedAddress) {
      setReceiverAddress(derivedAddress);
    }
  }, [derivedAddress]);

  const sendFunds = async () => {
    if (!isConnected) {
      return toast.error("Wallet not connected.");
    }

    if (!receiverAddress) {
      return toast.error("Receiver address not set");
    }

    if (!amountToSend) {
      return toast.error("Amount cannot be empty");
    }

    await fakeWeth.write.mint([receiverAddress, BigInt(amountToSend)])

    toast.success("Funds sent!");

    // await refreshWalletBalance?.();
  };

  return (
    <>
        <TxModal {...{isConfirmDialogOpen, setIsConfirmDialogOpen }} />
        <div className="flex flex-col gap-5 items-stretch max-w-[400px] mx-auto">
          <h3 className="text-2xl font-semibold">Local Faucet</h3>

          <div className="flex gap-4 items-center">
            <label htmlFor="receiver-address-input" className="text-gray-400">
              Receiving address:
            </label>
            <Input
              className="w-full"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value as `0x${string}`)}
              placeholder="0x..."
              id="receiver-address-input"
            />
          </div>

          <div className="flex gap-4 items-center">
            <label htmlFor="amount-input" className="text-gray-400">
              Amount (FAKEETH):
            </label>
            <Input
              className="w-full"
              value={amountToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
              placeholder="5"
              type="number"
              id="amount-input"
            />
          </div>

          <Button onClick={sendFunds}>Send Funds</Button>
        </div>
    </>
  );
}
