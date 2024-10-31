import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContracts, useNearWallet } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function Launch() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  const storage = getStorage();

  const [name, setName] = useState<string>("AnTomato");
  const [symbol, setSymbol] = useState<string>("ATOM");
  const [description, setDescription] = useState<string>("who doesn't love tomatoes again?");
  const [image, setImage] = useState<string>();
  const [twitter, setTwitter] = useState<string>();
  const [telegram, setTelegram] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [moreOptions, setMoreOptions] = useState(false);
  const [assetId, setAssetId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [txHash, setTxHash] = useState<string>("");
  const {isConnected} = useNearWallet();
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

  const {yeetFinance} = useContracts(getTxHash);

  const resetFields = () => {
    setName("");
    setSymbol("");
    setDescription("");
    setImage("");
    setTwitter("");
    setTelegram("");
    setWebsite("");
    setSelectedFile(null);
    setAssetId("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files;
    if (uploadedFile?.length) {
      setSelectedFile(uploadedFile[0]);
      if (!uploadedFile[0].type.includes("image")) {
        toast.error("Invalid image format. Please upload a valid image format");
        return;
      } else {
        setSelectedFile(uploadedFile[0]);
      }
    }
  };

  const onLaunchPress = async () => {
    if (!yeetFinance) {
      return toast.error("contract not loaded");
    }

    if (!isConnected) {
      return toast.error("Wallet not connected");
    }

    if (!name || !symbol || !description || !selectedFile) {
      return toast.error("Name, Symbol, description and image required");
    }
    setLoading(true);
    try {
      const fileRef = ref(storage, `uploads/${selectedFile.name}`);
      const result = await uploadBytes(fileRef, selectedFile);
      const downloadURL = await getDownloadURL(result.ref);
      setImage(downloadURL);
      console.log("File available at:", downloadURL);
  
      const tx = await yeetFinance.write.yeet([
        name,
        symbol,
        description,
        downloadURL,
        twitter ?? "",
        telegram ?? "",
        website ?? "",
        BigInt(0)
      ]);
      console.log(tx);
    } catch (error) {console.log(error)}
    setLoading(false);
  };


  return (
    <div className="flex flex-col gap-2 items-stretch max-w-[400px] mx-auto">
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
      <DialogContent className="sm:max-w-md bg-black">
        <DialogHeader>
          <DialogTitle>Confirm Transaction</DialogTitle>
          <DialogDescription>
            Enter Near Trransaction hash here
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="tx_hash" className="sr-only">
              tx hash:
            </Label>
            <Input
              id="tx_hash"
              placeholder="TxHash"
              value={txHash}
              onChange={(e) => {setTxHash(e.target.value); localStorage.setItem("txHash", e.target.value)}}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={()=>{localStorage.setItem(TX_HASH_CLICKED,"true")}} type="button" variant="secondary">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-gray-300">
              Asset successfully launched
            </DialogTitle>
            <DialogDescription className="text-gray-400 break-all">
              Congrats, your asset has been deployed. You can now view your
              asset in the homepage [board]
            </DialogDescription>
          </DialogHeader>
          <div>
            {!!assetId && (
              <>
                <Link href={`/${assetId}`}>View Asset</Link>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowSuccess(false);
              }}
            >
              [close]
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h3 className="text-2xl font-semibold mb-2 text-center">launch a token</h3>

      <div className="flex flex-col justify-center">
        <label htmlFor="token-name" className="text-gray-400">
          Name:
        </label>
        <Input
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ETHEREUM"
          id="token-name"
          readOnly={!!loading}
        />
      </div>

      <div className="flex flex-col justify-center">
        <label htmlFor="token-symbol" className="text-gray-400">
          Symbol:
        </label>
        <Input
          className="w-full"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="ETH"
          id="token-symbol"
          readOnly={!!loading}
        />
      </div>

      <div className="flex flex-col justify-center">
        <label htmlFor="token-description" className="text-gray-400">
          Description:
        </label>
        <Textarea
          className="w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          id="token-description"
          readOnly={!!loading}
        ></Textarea>
      </div>

      <div className="flex flex-col justify-center">
        <label htmlFor="token-image" className="text-gray-400">
          Image:
        </label>
        <Input
          className="w-full"
          onChange={handleFileChange}
          placeholder="ETH"
          id="token-image"
          readOnly={!!loading}
          type="file"
          accept="image/*"
        />
      </div>

      <button
        onClick={() => {
          setMoreOptions(!moreOptions);
        }}
        className="text-base text-stone-700 self-start hover:underline transition-all"
      >
        {moreOptions ? "Less Options ↑" : "More options ↓"}
      </button>

      {moreOptions ? (
        <>
          <div className="flex flex-col justify-center">
            <label htmlFor="twitter-socials" className="text-gray-400">
              Twitter:
            </label>
            <Input
              className="w-full"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="optional"
              id="twitter-socials"
              readOnly={!!loading}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="telegram-socials" className="text-gray-400">
              Telegram:
            </label>
            <Input
              className="w-full"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="optional"
              id="telegram-socials"
              readOnly={!!loading}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="website-socials" className="text-gray-400">
              Website:
            </label>
            <Input
              className="w-full"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="optional"
              id="website-socials"
              readOnly={!!loading}
            />
          </div>
        </>
      ) : null}

      <Button
        disabled={loading}
        onClick={onLaunchPress}
        className="mt-4"
      >
        &gt;&gt; yeet &lt;&lt;
      </Button>
    </div>
  );
}
