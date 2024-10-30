import {
  YeetFinance,
  Pool,
  Trade,
} from "generated";
import { Chain_t } from "generated/src/db/Enums.gen";

const getChain = (chainId: number): Chain_t => chainId === 84532 ? "BASE" : "AURORA";

YeetFinance.CurveInitialized.handler(async ({ event, context }) => {
  const entity: Pool = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    chain: getChain(event.chainId),
    createdBy: event.params.dev,
    token: event.params.token,
    name: event.params.name,
    symbol: event.params.symbol,
    description: event.params.description,
    image: event.params.image,
    twitter: event.params.twitter,
    telegram: event.params.telegram,
    website: event.params.website,
    kickoff: event.params.kickoff,
    createdAt: event.block.timestamp,
    contract: event.srcAddress,
    txId: event.transaction.hash,
  };
  
  context.Pool.set(entity);
});

YeetFinance.TokenBought.handler(async ({ event, context }) => {
  const entity: Trade = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    chain: getChain(event.chainId),
    tradeType: "BUY",
    trader: event.params.trader,
    token: event.params.token,
    tokenAmount: event.params.amount,
    ethAmount: event.params.ethIn,
    createdAt: event.block.timestamp,
    txId: event.transaction.hash,
  };
  
  context.Trade.set(entity);
});

YeetFinance.TokenSold.handler(async ({ event, context }) => {
  const entity: Trade = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    chain: getChain(event.chainId),
    tradeType: "BUY",
    trader: event.params.trader,
    token: event.params.token,
    tokenAmount: event.params.amount,
    ethAmount: event.params.ethOut,
    createdAt: event.block.timestamp,
    txId: event.transaction.hash,
  };

  context.Trade.set(entity);
});
