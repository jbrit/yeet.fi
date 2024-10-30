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
import { useContracts } from "@/lib/utils";

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

  const [name, setName] = useState<string>();
  const [symbol, setSymbol] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [image, setImage] = useState<string>();
  const [twitter, setTwitter] = useState<string>();
  const [telegram, setTelegram] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [moreOptions, setMoreOptions] = useState(false);
  const [assetId, setAssetId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isConnected } = useAccount();
  const {yeetFinance} = useContracts();

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
    } catch (error) {}
    setLoading(false);
  };

  const onFinishLaunchPress = async () => {};

  const newCurve = "";

  return (
    <div className="flex flex-col gap-2 items-stretch max-w-[400px] mx-auto">
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
          readOnly={!!newCurve}
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
          readOnly={!!newCurve}
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
          readOnly={!!newCurve}
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
          readOnly={!!newCurve}
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
              readOnly={!!newCurve}
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
              readOnly={!!newCurve}
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
              readOnly={!!newCurve}
            />
          </div>
        </>
      ) : null}

      <Button
        disabled={loading}
        // loading={loading}
        onClick={onLaunchPress}
        className="mt-4"
      >
        &gt;&gt; yeet &lt;&lt;
      </Button>

      {!!newCurve && (
        <>
          <div className="flex flex-col gap-2 items-center">
            <div>token deployed at</div>
          </div>
          <Button
            disabled={loading}
            onClick={onFinishLaunchPress}
            className="mt-6"
          >
            &gt;&gt; Finalize Launch &lt;&lt;
          </Button>
        </>
      )}
    </div>
  );
}
