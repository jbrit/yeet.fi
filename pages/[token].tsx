import { useRef } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { ALL_POOLS_QUERY, ALL_TRADES_QUERY } from "@/queries";
import { Progress } from "@/components/ui/progress";
import { getTruncatedAddress } from "@/lib/utils";
import { TradeTable } from "@/components/trade-table";
import { TradeTab } from "@/components/trade-tab";
import CandlestickChart from "@/components/candlestick";

export const getServerSideProps = (async ({ query }) => {
  return { props: { token: query.token as string } };
}) satisfies GetServerSideProps<{ token: string }>;

export default function Token({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    data: poolsData,
  } = useQuery(ALL_POOLS_QUERY);
  const {
    data: tradesData,
  } = useQuery(ALL_TRADES_QUERY, { pollInterval: 500 });

  const filteredPoolInfos = poolsData?.Pool.filter(
    (pool) => pool.token === token
  );
  const poolInfo = filteredPoolInfos?.length ? filteredPoolInfos[0] : null;

  const totalSupply = 500_000_000;
  const BONDING_CURVE_TOTAL_SUPPLY = 700_000_000;
  const tokensAvailable =
    totalSupply && BONDING_CURVE_TOTAL_SUPPLY - totalSupply;
  const ethInCurve = tradesData?.Trade.reduce(
    (acc, trade) =>
      trade.token !== token
        ? acc
        : trade.tradeType === "BUY"
        ? acc + (Number(trade.ethAmount))
        : acc - (Number(trade.ethAmount)),
    Number(0)
  );
  const curvePercent =
    totalSupply && Math.floor((100 * totalSupply) / BONDING_CURVE_TOTAL_SUPPLY);

  const getOhlc = (minutes: number) =>
    tradesData?.Trade.filter((trade) => trade.token === token).reduce(
      (acc, trade) => {
        acc.totalSupply =
          trade.tradeType === "BUY"
            ? acc.totalSupply + parseInt(trade.tokenAmount)
            : acc.totalSupply - parseInt(trade.tokenAmount);
        const minute =
          60 * minutes * Math.floor(trade.createdAt / (60 * minutes));
        let price = (3 * acc.totalSupply ** 2) / (343 * 1e24);
        const inversePrice = (343 * 1e24) / (3 * acc.totalSupply ** 2);
        price = parseFloat((1 / inversePrice).toFixed(11));

        const currentDate = moment.unix(minute).toDate();
        if (acc.ohlc.length === 0) {
          acc.ohlc.push({
            x: currentDate,
            y: [price, price, price, price],
          });
        } else {
          const lastOhlc = acc.ohlc[acc.ohlc.length - 1];
          if (currentDate.getTime() === lastOhlc.x.getTime()) {
            if (price > lastOhlc.y[1]) {
              // high
              lastOhlc.y[1] = price;
            } else if (price < lastOhlc.y[2]) {
              // low
              lastOhlc.y[2] = price;
            }
            lastOhlc.y[3] = price; // close
          } else {
            acc.ohlc.push({
              x: currentDate,
              y: [
                lastOhlc.y[3],
                Math.max(lastOhlc.y[3], price),
                Math.min(lastOhlc.y[3], price),
                price,
              ],
            });
          }
        }

        return acc;
      },
      {
        totalSupply: 0,
        ohlc: [] as { x: Date; y: [number, number, number, number] }[],
      }
    ).ohlc;
  return (
    <div>
      {!!poolInfo && !!tradesData && (
        <>
          {curvePercent === 100 ? (
            <p className="px-4 py-2 bg-green-400 text-slate-900 rounded-sm mb-4 w-fit text-base font-medium">
              Bonding curve filled, DEX launch pending
            </p>
          ) : null}
          <div className="mb-4 md:mb-8 lg:mb-10 w-full flex flex-col lg:flex-row flex-nowrap gap-5 md:gap-10 xl:gap-20">
            <div className="w-full lg:w-2/3">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between gap-3 flex-wrap items-center">
                  <div className="flex flex-wrap gap-3 items-center">
                    <p className="text-sm text-gray-600 lowercase">
                      {poolInfo.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ticker: {poolInfo.symbol}
                    </p>
                    <p className="text-sm text-gray-600">token address:</p>
                    <p className="flex text-sm font-bold text-gray-600 items-center gap-1 border border-gray-400 h-7">
                      <span className="p-1">
                        {getTruncatedAddress(token)}
                      </span>
                      <span className="inline-block h-full bg-gray-400 w-[1px]">
                        {" "}
                      </span>
                      <button
                        ref={buttonRef}
                        className="cursor-pointer p-1"
                        onClick={() => {
                          navigator.clipboard.writeText(token);
                          const buttonCurrent = buttonRef?.current;
                          if (!buttonCurrent) return;
                          buttonCurrent.textContent = "copied";
                          setTimeout(() => {
                            buttonCurrent.textContent = "copy";
                          }, 1000);
                        }}
                      >
                        copy
                      </button>
                    </p>
                  </div>
                  <p className="text-green-700">
                    created by{" "}
                    <span className="p-1 bg-green-600 bg-opacity-20 text-gray-600">
                      {getTruncatedAddress(poolInfo.createdBy)}
                    </span>{" "}
                    about {moment(poolInfo.createdAt * 1000).fromNow()}
                  </p>
                </div>
                <CandlestickChart getOhlc={getOhlc} />
              </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <TradeTab
                symbol={poolInfo.symbol}
                asset={token}
                poolImg={poolInfo.image}
                isBondingCuveFull={curvePercent === 100}
              />
              <div className="flex flex-col gap-2">
                <p className="text-gray-500">
                  bonding curve progress: {curvePercent}%
                </p>
                <Progress value={curvePercent} />
              </div>
              <p className="text-gray-500">
                when the bonding curve liquidity reaches 1 ETH, 300M $
                {poolInfo.symbol} will be deposited into the DEX
              </p>
              <p className="text-gray-500">
                there are {tokensAvailable?.toLocaleString()} tokens still
                available for sale in the bonding curve and there is{" "}
                {ethInCurve && ethInCurve / 1e9} ETH in the bonding curve.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {poolInfo.twitter && (
                  <a
                    href={poolInfo.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-600 hover:underline transition-all"
                  >
                    [Twitter]
                  </a>
                )}
                {poolInfo.website && (
                  <a
                    href={poolInfo.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-600 hover:underline transition-all"
                  >
                    [Website]
                  </a>
                )}
                {poolInfo.telegram && (
                  <a
                    href={poolInfo.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-600 hover:underline transition-all"
                  >
                    [Telegram]
                  </a>
                )}
              </div>
            </div>
          </div>
          <h2 className="border-b-2 border-b-stone-600 text-stone-600 text-lg font-bold p-1 w-fit mb-6">
            Trades
          </h2>
          <TradeTable
            tokenName={poolInfo.symbol}
            trades={tradesData.Trade.filter((t) => t.token === token)
              .map((trade) => ({
                id: trade.id,
                trador: trade.trader,
                type: trade.tradeType,
                ethAmount: "" + (trade.ethAmount / 1e9).toFixed(9),
                tokenAmount: parseInt(trade.tokenAmount)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                createdAt: trade.createdAt,
                txId: trade.txId,
              }))
              .toReversed()}
          />
        </>
      )}
    </div>
  );
}
