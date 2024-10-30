import { gql } from "./__generated__";

export const ALL_POOLS_QUERY = gql(`query AllPools {
  Pool {
    id
    chain
    name
    symbol
    description
    image
    twitter
    telegram
    website
    txId
    token
    contract
    createdAt
    createdBy
    db_write_timestamp
  }
}`)

export const ALL_TRADES_QUERY = gql(`query AllTrades {
  Trade {
    createdAt
    db_write_timestamp
    ethAmount
    id
    token
    tokenAmount
    tradeType
    trader
    txId
  }
}`);