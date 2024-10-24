import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { ALL_POOLS_QUERY, ALL_TRADES_QUERY } from "@/queries";

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
      {!!poolsData &&
        !!tradesData &&
        poolsData.Pool.map((pool) => (
          <Link
            className="no-underline hover:no-underline"
            href={`/${pool.asset}`}
          >
            <Card className="hover:no-underline flex flex-col md:flex-row items-stretch md:items-center h-full">
              <div className="py-2 px-4">
                <img
                  className="w-full md:w-44 h-auto object-cover"
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
                  fuelled by {getTruncatedAddress(pool.createdBy)} [
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
