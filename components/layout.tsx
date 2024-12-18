import { Toaster } from "react-hot-toast";
import React, { ReactNode, useContext } from "react";
import { Navbar } from "./navbar";
import { Button } from "@/components/ui/button";
import { AppContext, useContracts, useNearWallet } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { wallet, isConnected, signedAccountId, derivedAddress } =
    useNearWallet();
  const { chain, setChain } = useContext(AppContext);
  const { displayedWETHBalance } = useContracts();
  return (
    <>
      <Toaster />
      <div className="flex flex-col px-4 lg:px-12 bg-background text-foreground">
        <div className="min-h-screen py-4 flex flex-col gap-6">
          <Navbar />
          <div className="relative">
            <div className="relative mb-8">
              <Select
                value={chain}
                onValueChange={(value) => setChain(value as "AURORA" | "BASE")}
              >
                <SelectTrigger className="w-[120px] h-[30px] bg-background relative z-[10000] translate-y-[30px]">
                  <SelectValue placeholder="Chain" />
                </SelectTrigger>
                <SelectContent className="bg-black text-foreground">
                  <SelectItem value="AURORA">AURORA</SelectItem>
                  <SelectItem value="BASE">BASE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {!isConnected ? (
              <Button
                onClick={async () => {
                  await wallet.signIn();
                }}
              >
                Near Connect Wallet
              </Button>
            ) : (
              <>
                <div>
                  {derivedAddress} (derived from {signedAccountId})
                  <Button
                    className="ml-4"
                    onClick={async () => {
                      await wallet.signOut();
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
                <div>
                  {chain} Balance: {displayedWETHBalance} WETH
                </div>
              </>
            )}
          </div>
          <div className="">{children}</div>
          <footer className="mt-auto flex justify-between items-center">
            <p>&copy; yeet finance 2024</p>
            <a
              href="https://x.com/jibolaojo"
              target="_blank"
              className="no-underline hover:text-stone-400 hover:underline"
            >
              Twitter
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
