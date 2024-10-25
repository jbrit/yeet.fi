import localFont from "next/font/local";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { ALL_POOLS_QUERY, ALL_TRADES_QUERY } from "@/queries";
import { Skeleton } from "@/components/ui/skeleton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function Home() {

  const {
    data: poolsData,
    loading: poolsLoading,
    error: poolsError,
  } = useQuery(ALL_POOLS_QUERY);
  const {
    data: tradesData,
    loading: tradesLoading,
    error: tradesError,
  } = useQuery(ALL_TRADES_QUERY);
  const getTradeCount = (assetId: string) =>
    tradesData?.Trade.filter((trade) => trade.token === assetId).length;
  const getTruncatedAddress = (address: string) => "user.near"

  return (
    <div className="grid grid-cols md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-stretch">
      {(poolsLoading || tradesLoading) && ([1,1,1,1,1]).map((_, idx) => <div key={idx} className="h-52 p-4 grid grid-cols-5 gap-6">
        <Skeleton className="h-full col-span-2 rounded-lg" />
        <div className="h-full col-span-3">
          <Skeleton className="h-6 mb-2" />
          <Skeleton className="h-6 w-20 mb-2" />
          <Skeleton className="h-32 mb-2" />
        </div>
      </div>)}
      {!!poolsData &&
        !!tradesData &&
        poolsData.Pool.map((pool) => (
          <Link
            key={pool.id}
            className="no-underline hover:no-underline"
            href={`/${pool.asset}`}
          >
            <Card className="hover:no-underline flex flex-col md:flex-row items-stretch md:items-center h-full border">
              <div className="py-2 px-4 max-h-52 overflow-hidden">
                <img
                  className="w-full md:w-44 h-auto object-contain"
                  alt=""
                  src={pool.image ?? ""}
                />
              </div>
              <div>
                <CardHeader>
                  {pool.name} [symbol: ${pool.symbol}]
                  <CardDescription>
                    {getTradeCount(pool.asset)!} trades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  yeeted by {getTruncatedAddress(pool.createdBy)} [
                  {moment(pool.createdAt * 1000).fromNow()}]
                </CardContent>
                <CardFooter className="text-gray-400 text-sm">
                  {pool.description}
                </CardFooter>
              </div>
            </Card>
          </Link>
        ))}
    </div>
  );
}
