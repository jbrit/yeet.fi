import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContracts } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { TxModal } from "@/components/txmodal";

type Props = {
  symbol: string;
  token: `0x${string}`;
  poolImg: string;
  isBondingCuveFull: boolean;
};

export function TradeTab({ symbol, token, poolImg, isBondingCuveFull }: Props) {
  const [currency, setCurrency] = useState(symbol);
  const [showSlippage, setShowSlippage] = useState(false);
  const [slippage, setSlippage] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [ethIn, setEthIn] = useState(0);
  const [ethOut, setEthOut] = useState(0);
  const MAX_U256 = BigInt(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const TX_HASH_CLICKED = "TX_HASH_CLICKED";

  const getTxHash = () =>
    new Promise<string>((res, rej) => {
      localStorage.setItem(TX_HASH_CLICKED, "");
      setIsConfirmDialogOpen(true);
      const interval = setInterval(function () {
        if (!!localStorage.getItem(TX_HASH_CLICKED)) {
          clearInterval(interval);
          res(localStorage.getItem("txHash") ?? "");
          setIsConfirmDialogOpen(false);
        }
      }, 1000);
    });
  const { yeetFinance, wethAllowance, bondingCurve, fakeWeth } = useContracts(
    getTxHash,
    token
  );
  console.log({ wethAllowance, bondingCurve });
  return (
    <>
      <TxModal {...{ isConfirmDialogOpen, setIsConfirmDialogOpen }} />
      <Dialog open={showSlippage} onOpenChange={setShowSlippage}>
        <DialogContent className="sm:max-w-[425px] bg-black">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Set max. slippage (%)
            </DialogTitle>
            <DialogDescription className="text-foreground">
              This is the maximum amount of slippage you are willing to accept
              when placing trades
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="name"
              value={slippage}
              onChange={(e) => setSlippage(parseInt(e.target.value))}
              type="number"
              className="text-black"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setSlippage(0);
                setShowSlippage(false);
              }}
              type="submit"
            >
              [close]
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {!!bondingCurve && wethAllowance != MAX_U256 && (
        <Button
          onClick={async () => {
            await fakeWeth.write.approve([bondingCurve!, MAX_U256]);
            toast.success(`Bonding Curve Allowed to trade WETH!`);
          }}
          className="bg-green-600 w-full"
        >
          Bonding Curve Allow WETH
        </Button>
      )}
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black border border-gray-200 text-foreground">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <Card>
            <CardHeader>
              <CardTitle>
                Buy {currency !== "ETH" ? `$${symbol}` : "ETH"}
              </CardTitle>
              {/* <CardDescription>...</CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setCurrency((prev) => (prev === "ETH" ? symbol : "ETH"));
                    }}
                    className="bg-slate-600 px-2 py-1 text-xs font-medium bg-opacity-70 hover:bg-opacity-100 transition-all text-white rounded-sm"
                  >
                    switch to {currency === "ETH" ? `$${symbol}` : "ETH"}
                  </button>
                  <button
                    onClick={() => {
                      setShowSlippage(true);
                    }}
                    className="bg-green-600 px-2 py-1 text-xs font-medium bg-opacity-50 hover:bg-opacity-100 transition-all text-white rounded-sm"
                  >
                    Set max slippage
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="buyAmount"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(parseInt(e.target.value))}
                    type="number"
                    className="appearance-none"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-200 text-lg font-bold flex items-center gap-3">
                    {currency !== "ETH" ? `$${symbol}` : <span>ETH</span>}
                    <img
                      src={
                        currency === "ETH"
                          ? "https://png.pngtree.com/png-vector/20210522/ourmid/pngtree-vector-illustration-of-crytocurrency-ethereum-png-image_3314668.jpg"
                          : poolImg
                      }
                      width={20}
                      height={20}
                    />
                  </span>
                </div>
                {currency === "ETH" ? (
                  <div className="flex items-center gap-2">
                    {[0, 1, 5, 10].map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          setBuyAmount(n);
                        }}
                        className="bg-green-600 px-2 py-1 text-xs font-medium bg-opacity-50 hover:bg-opacity-100 transition-all text-white rounded-sm"
                      >
                        {n ? `${n} ETH` : "reset"}
                      </button>
                    ))}
                  </div>
                ) : null}
                <p className="text-base text-gray-500">...</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={async () => {
                  await yeetFinance.write.buyToken([
                    token,
                    BigInt(buyAmount) * BigInt(1e18),
                    BigInt(1e18),
                  ]);
                  toast.success(`Bought ${buyAmount} ${symbol} for ETH`);
                }}
                className="bg-green-600 w-full"
              >
                Buy Token
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle>Sell ${symbol}</CardTitle>
              {/* <CardDescription>...</CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowSlippage(true);
                  }}
                  className="bg-red-600 px-2 py-1 text-xs font-medium bg-opacity-70 hover:bg-opacity-100 transition-all text-white rounded-sm"
                >
                  Set max slippage
                </button>

                <div className="relative">
                  <Input
                    id="sellAmount"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(parseInt(e.target.value))}
                    type="number"
                  />

                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-200 text-lg font-bold flex gap-3 items-center">
                    ${symbol}
                    <img src={poolImg} width={20} height={20} />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[0, 25, 50, 75, 100].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setSellAmount((prev) => (n / 100) * prev);
                      }}
                      className="bg-red-600 px-2 py-1 text-xs font-medium bg-opacity-70 hover:bg-opacity-100 transition-all text-white rounded-sm"
                    >
                      {n ? `${n}%` : "reset"}
                    </button>
                  ))}
                </div>
                <p className="text-base text-gray-500">...</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={async () => {
                  await yeetFinance.write.sellToken([
                    token,
                    BigInt(sellAmount) * BigInt(1e18),
                    BigInt(0),
                  ]);
                  toast.success(`Sold ${sellAmount} ${symbol} for ETH`);
                }}
                className="bg-red-500 w-full"
              >
                Sell Token
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
