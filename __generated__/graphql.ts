/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  chain: { input: any; output: any; }
  contract_type: { input: any; output: any; }
  entity_type: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  tradetype: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to filter rows from the table "Pool". All fields are combined with a logical 'AND'. */
export type Pool_Bool_Exp = {
  _and?: InputMaybe<Array<Pool_Bool_Exp>>;
  _not?: InputMaybe<Pool_Bool_Exp>;
  _or?: InputMaybe<Array<Pool_Bool_Exp>>;
  chain?: InputMaybe<Chain_Comparison_Exp>;
  contract?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Int_Comparison_Exp>;
  createdBy?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  kickoff?: InputMaybe<Numeric_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  symbol?: InputMaybe<String_Comparison_Exp>;
  telegram?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  twitter?: InputMaybe<String_Comparison_Exp>;
  txId?: InputMaybe<String_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Pool". */
export type Pool_Order_By = {
  chain?: InputMaybe<Order_By>;
  contract?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdBy?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  kickoff?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  telegram?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  twitter?: InputMaybe<Order_By>;
  txId?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** select columns of table "Pool" */
export enum Pool_Select_Column {
  /** column name */
  Chain = 'chain',
  /** column name */
  Contract = 'contract',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Kickoff = 'kickoff',
  /** column name */
  Name = 'name',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  Telegram = 'telegram',
  /** column name */
  Token = 'token',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  TxId = 'txId',
  /** column name */
  Website = 'website'
}

/** Streaming cursor of the table "Pool" */
export type Pool_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Pool_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Pool_Stream_Cursor_Value_Input = {
  chain?: InputMaybe<Scalars['chain']['input']>;
  contract?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  kickoff?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  txId?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "Trade". All fields are combined with a logical 'AND'. */
export type Trade_Bool_Exp = {
  _and?: InputMaybe<Array<Trade_Bool_Exp>>;
  _not?: InputMaybe<Trade_Bool_Exp>;
  _or?: InputMaybe<Array<Trade_Bool_Exp>>;
  chain?: InputMaybe<Chain_Comparison_Exp>;
  createdAt?: InputMaybe<Int_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  ethAmount?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  tokenAmount?: InputMaybe<Numeric_Comparison_Exp>;
  tradeType?: InputMaybe<Tradetype_Comparison_Exp>;
  trader?: InputMaybe<String_Comparison_Exp>;
  txId?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Trade". */
export type Trade_Order_By = {
  chain?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  ethAmount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  tokenAmount?: InputMaybe<Order_By>;
  tradeType?: InputMaybe<Order_By>;
  trader?: InputMaybe<Order_By>;
  txId?: InputMaybe<Order_By>;
};

/** select columns of table "Trade" */
export enum Trade_Select_Column {
  /** column name */
  Chain = 'chain',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  EthAmount = 'ethAmount',
  /** column name */
  Id = 'id',
  /** column name */
  Token = 'token',
  /** column name */
  TokenAmount = 'tokenAmount',
  /** column name */
  TradeType = 'tradeType',
  /** column name */
  Trader = 'trader',
  /** column name */
  TxId = 'txId'
}

/** Streaming cursor of the table "Trade" */
export type Trade_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Trade_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Trade_Stream_Cursor_Value_Input = {
  chain?: InputMaybe<Scalars['chain']['input']>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  ethAmount?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  tokenAmount?: InputMaybe<Scalars['numeric']['input']>;
  tradeType?: InputMaybe<Scalars['tradetype']['input']>;
  trader?: InputMaybe<Scalars['String']['input']>;
  txId?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "chain". All fields are combined with logical 'AND'. */
export type Chain_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['chain']['input']>;
  _gt?: InputMaybe<Scalars['chain']['input']>;
  _gte?: InputMaybe<Scalars['chain']['input']>;
  _in?: InputMaybe<Array<Scalars['chain']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['chain']['input']>;
  _lte?: InputMaybe<Scalars['chain']['input']>;
  _neq?: InputMaybe<Scalars['chain']['input']>;
  _nin?: InputMaybe<Array<Scalars['chain']['input']>>;
};

/** Boolean expression to filter rows from the table "chain_metadata". All fields are combined with a logical 'AND'. */
export type Chain_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Chain_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  block_height?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  end_block?: InputMaybe<Int_Comparison_Exp>;
  first_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  is_hyper_sync?: InputMaybe<Boolean_Comparison_Exp>;
  latest_fetched_block_number?: InputMaybe<Int_Comparison_Exp>;
  latest_processed_block?: InputMaybe<Int_Comparison_Exp>;
  num_batches_fetched?: InputMaybe<Int_Comparison_Exp>;
  num_events_processed?: InputMaybe<Int_Comparison_Exp>;
  start_block?: InputMaybe<Int_Comparison_Exp>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "chain_metadata". */
export type Chain_Metadata_Order_By = {
  block_height?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  end_block?: InputMaybe<Order_By>;
  first_event_block_number?: InputMaybe<Order_By>;
  is_hyper_sync?: InputMaybe<Order_By>;
  latest_fetched_block_number?: InputMaybe<Order_By>;
  latest_processed_block?: InputMaybe<Order_By>;
  num_batches_fetched?: InputMaybe<Order_By>;
  num_events_processed?: InputMaybe<Order_By>;
  start_block?: InputMaybe<Order_By>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Order_By>;
};

/** select columns of table "chain_metadata" */
export enum Chain_Metadata_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  EndBlock = 'end_block',
  /** column name */
  FirstEventBlockNumber = 'first_event_block_number',
  /** column name */
  IsHyperSync = 'is_hyper_sync',
  /** column name */
  LatestFetchedBlockNumber = 'latest_fetched_block_number',
  /** column name */
  LatestProcessedBlock = 'latest_processed_block',
  /** column name */
  NumBatchesFetched = 'num_batches_fetched',
  /** column name */
  NumEventsProcessed = 'num_events_processed',
  /** column name */
  StartBlock = 'start_block',
  /** column name */
  TimestampCaughtUpToHeadOrEndblock = 'timestamp_caught_up_to_head_or_endblock'
}

/** Streaming cursor of the table "chain_metadata" */
export type Chain_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chain_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chain_Metadata_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  end_block?: InputMaybe<Scalars['Int']['input']>;
  first_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  is_hyper_sync?: InputMaybe<Scalars['Boolean']['input']>;
  latest_fetched_block_number?: InputMaybe<Scalars['Int']['input']>;
  latest_processed_block?: InputMaybe<Scalars['Int']['input']>;
  num_batches_fetched?: InputMaybe<Scalars['Int']['input']>;
  num_events_processed?: InputMaybe<Scalars['Int']['input']>;
  start_block?: InputMaybe<Scalars['Int']['input']>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Boolean expression to compare columns of type "contract_type". All fields are combined with logical 'AND'. */
export type Contract_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['contract_type']['input']>;
  _gt?: InputMaybe<Scalars['contract_type']['input']>;
  _gte?: InputMaybe<Scalars['contract_type']['input']>;
  _in?: InputMaybe<Array<Scalars['contract_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['contract_type']['input']>;
  _lte?: InputMaybe<Scalars['contract_type']['input']>;
  _neq?: InputMaybe<Scalars['contract_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['contract_type']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to filter rows from the table "dynamic_contract_registry". All fields are combined with a logical 'AND'. */
export type Dynamic_Contract_Registry_Bool_Exp = {
  _and?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  _not?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
  _or?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  contract_type?: InputMaybe<Contract_Type_Comparison_Exp>;
  registering_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  registering_event_block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  registering_event_contract_name?: InputMaybe<String_Comparison_Exp>;
  registering_event_log_index?: InputMaybe<Int_Comparison_Exp>;
  registering_event_name?: InputMaybe<String_Comparison_Exp>;
  registering_event_src_address?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "dynamic_contract_registry". */
export type Dynamic_Contract_Registry_Order_By = {
  chain_id?: InputMaybe<Order_By>;
  contract_address?: InputMaybe<Order_By>;
  contract_type?: InputMaybe<Order_By>;
  registering_event_block_number?: InputMaybe<Order_By>;
  registering_event_block_timestamp?: InputMaybe<Order_By>;
  registering_event_contract_name?: InputMaybe<Order_By>;
  registering_event_log_index?: InputMaybe<Order_By>;
  registering_event_name?: InputMaybe<Order_By>;
  registering_event_src_address?: InputMaybe<Order_By>;
};

/** select columns of table "dynamic_contract_registry" */
export enum Dynamic_Contract_Registry_Select_Column {
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  ContractType = 'contract_type',
  /** column name */
  RegisteringEventBlockNumber = 'registering_event_block_number',
  /** column name */
  RegisteringEventBlockTimestamp = 'registering_event_block_timestamp',
  /** column name */
  RegisteringEventContractName = 'registering_event_contract_name',
  /** column name */
  RegisteringEventLogIndex = 'registering_event_log_index',
  /** column name */
  RegisteringEventName = 'registering_event_name',
  /** column name */
  RegisteringEventSrcAddress = 'registering_event_src_address'
}

/** Streaming cursor of the table "dynamic_contract_registry" */
export type Dynamic_Contract_Registry_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dynamic_Contract_Registry_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dynamic_Contract_Registry_Stream_Cursor_Value_Input = {
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_address?: InputMaybe<Scalars['String']['input']>;
  contract_type?: InputMaybe<Scalars['contract_type']['input']>;
  registering_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  registering_event_block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  registering_event_contract_name?: InputMaybe<Scalars['String']['input']>;
  registering_event_log_index?: InputMaybe<Scalars['Int']['input']>;
  registering_event_name?: InputMaybe<Scalars['String']['input']>;
  registering_event_src_address?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "end_of_block_range_scanned_data". All fields are combined with a logical 'AND'. */
export type End_Of_Block_Range_Scanned_Data_Bool_Exp = {
  _and?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  _not?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
  _or?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "end_of_block_range_scanned_data". */
export type End_Of_Block_Range_Scanned_Data_Order_By = {
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
};

/** select columns of table "end_of_block_range_scanned_data" */
export enum End_Of_Block_Range_Scanned_Data_Select_Column {
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id'
}

/** Streaming cursor of the table "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input = {
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
};

/** order by aggregate values of table "entity_history" */
export type Entity_History_Aggregate_Order_By = {
  avg?: InputMaybe<Entity_History_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Entity_History_Max_Order_By>;
  min?: InputMaybe<Entity_History_Min_Order_By>;
  stddev?: InputMaybe<Entity_History_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Entity_History_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Entity_History_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Entity_History_Sum_Order_By>;
  var_pop?: InputMaybe<Entity_History_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Entity_History_Var_Samp_Order_By>;
  variance?: InputMaybe<Entity_History_Variance_Order_By>;
};

/** order by avg() on columns of table "entity_history" */
export type Entity_History_Avg_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "entity_history". All fields are combined with a logical 'AND'. */
export type Entity_History_Bool_Exp = {
  _and?: InputMaybe<Array<Entity_History_Bool_Exp>>;
  _not?: InputMaybe<Entity_History_Bool_Exp>;
  _or?: InputMaybe<Array<Entity_History_Bool_Exp>>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  entity_id?: InputMaybe<String_Comparison_Exp>;
  entity_type?: InputMaybe<Entity_Type_Comparison_Exp>;
  event?: InputMaybe<Raw_Events_Bool_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
  params?: InputMaybe<Jsonb_Comparison_Exp>;
  previous_block_number?: InputMaybe<Int_Comparison_Exp>;
  previous_block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  previous_chain_id?: InputMaybe<Int_Comparison_Exp>;
  previous_log_index?: InputMaybe<Int_Comparison_Exp>;
};

/** Boolean expression to filter rows from the table "entity_history_filter". All fields are combined with a logical 'AND'. */
export type Entity_History_Filter_Bool_Exp = {
  _and?: InputMaybe<Array<Entity_History_Filter_Bool_Exp>>;
  _not?: InputMaybe<Entity_History_Filter_Bool_Exp>;
  _or?: InputMaybe<Array<Entity_History_Filter_Bool_Exp>>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  entity_id?: InputMaybe<String_Comparison_Exp>;
  entity_type?: InputMaybe<Entity_Type_Comparison_Exp>;
  event?: InputMaybe<Raw_Events_Bool_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
  new_val?: InputMaybe<Jsonb_Comparison_Exp>;
  old_val?: InputMaybe<Jsonb_Comparison_Exp>;
  previous_block_number?: InputMaybe<Int_Comparison_Exp>;
  previous_log_index?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "entity_history_filter". */
export type Entity_History_Filter_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  entity_id?: InputMaybe<Order_By>;
  entity_type?: InputMaybe<Order_By>;
  event?: InputMaybe<Raw_Events_Order_By>;
  log_index?: InputMaybe<Order_By>;
  new_val?: InputMaybe<Order_By>;
  old_val?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** select columns of table "entity_history_filter" */
export enum Entity_History_Filter_Select_Column {
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  EntityId = 'entity_id',
  /** column name */
  EntityType = 'entity_type',
  /** column name */
  LogIndex = 'log_index',
  /** column name */
  NewVal = 'new_val',
  /** column name */
  OldVal = 'old_val',
  /** column name */
  PreviousBlockNumber = 'previous_block_number',
  /** column name */
  PreviousLogIndex = 'previous_log_index'
}

/** Streaming cursor of the table "entity_history_filter" */
export type Entity_History_Filter_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Entity_History_Filter_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Entity_History_Filter_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  entity_id?: InputMaybe<Scalars['String']['input']>;
  entity_type?: InputMaybe<Scalars['entity_type']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  new_val?: InputMaybe<Scalars['jsonb']['input']>;
  old_val?: InputMaybe<Scalars['jsonb']['input']>;
  previous_block_number?: InputMaybe<Scalars['Int']['input']>;
  previous_log_index?: InputMaybe<Scalars['Int']['input']>;
};

/** order by max() on columns of table "entity_history" */
export type Entity_History_Max_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  entity_id?: InputMaybe<Order_By>;
  entity_type?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "entity_history" */
export type Entity_History_Min_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  entity_id?: InputMaybe<Order_By>;
  entity_type?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "entity_history". */
export type Entity_History_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  entity_id?: InputMaybe<Order_By>;
  entity_type?: InputMaybe<Order_By>;
  event?: InputMaybe<Raw_Events_Order_By>;
  log_index?: InputMaybe<Order_By>;
  params?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** select columns of table "entity_history" */
export enum Entity_History_Select_Column {
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  EntityId = 'entity_id',
  /** column name */
  EntityType = 'entity_type',
  /** column name */
  LogIndex = 'log_index',
  /** column name */
  Params = 'params',
  /** column name */
  PreviousBlockNumber = 'previous_block_number',
  /** column name */
  PreviousBlockTimestamp = 'previous_block_timestamp',
  /** column name */
  PreviousChainId = 'previous_chain_id',
  /** column name */
  PreviousLogIndex = 'previous_log_index'
}

/** order by stddev() on columns of table "entity_history" */
export type Entity_History_Stddev_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "entity_history" */
export type Entity_History_Stddev_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "entity_history" */
export type Entity_History_Stddev_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "entity_history" */
export type Entity_History_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Entity_History_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Entity_History_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  entity_id?: InputMaybe<Scalars['String']['input']>;
  entity_type?: InputMaybe<Scalars['entity_type']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  params?: InputMaybe<Scalars['jsonb']['input']>;
  previous_block_number?: InputMaybe<Scalars['Int']['input']>;
  previous_block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  previous_chain_id?: InputMaybe<Scalars['Int']['input']>;
  previous_log_index?: InputMaybe<Scalars['Int']['input']>;
};

/** order by sum() on columns of table "entity_history" */
export type Entity_History_Sum_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "entity_history" */
export type Entity_History_Var_Pop_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "entity_history" */
export type Entity_History_Var_Samp_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "entity_history" */
export type Entity_History_Variance_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  previous_block_number?: InputMaybe<Order_By>;
  previous_block_timestamp?: InputMaybe<Order_By>;
  previous_chain_id?: InputMaybe<Order_By>;
  previous_log_index?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "entity_type". All fields are combined with logical 'AND'. */
export type Entity_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['entity_type']['input']>;
  _gt?: InputMaybe<Scalars['entity_type']['input']>;
  _gte?: InputMaybe<Scalars['entity_type']['input']>;
  _in?: InputMaybe<Array<Scalars['entity_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['entity_type']['input']>;
  _lte?: InputMaybe<Scalars['entity_type']['input']>;
  _neq?: InputMaybe<Scalars['entity_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['entity_type']['input']>>;
};

/** Boolean expression to filter rows from the table "event_sync_state". All fields are combined with a logical 'AND'. */
export type Event_Sync_State_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  _not?: InputMaybe<Event_Sync_State_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Boolean_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "event_sync_state". */
export type Event_Sync_State_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
};

/** select columns of table "event_sync_state" */
export enum Event_Sync_State_Select_Column {
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  IsPreRegisteringDynamicContracts = 'is_pre_registering_dynamic_contracts',
  /** column name */
  LogIndex = 'log_index'
}

/** Streaming cursor of the table "event_sync_state" */
export type Event_Sync_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Sync_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Sync_State_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Scalars['Boolean']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
};

export type Get_Entity_History_Filter_Args = {
  end_block?: InputMaybe<Scalars['Int']['input']>;
  end_chain_id?: InputMaybe<Scalars['Int']['input']>;
  end_log_index?: InputMaybe<Scalars['Int']['input']>;
  end_timestamp?: InputMaybe<Scalars['Int']['input']>;
  start_block?: InputMaybe<Scalars['Int']['input']>;
  start_chain_id?: InputMaybe<Scalars['Int']['input']>;
  start_log_index?: InputMaybe<Scalars['Int']['input']>;
  start_timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** Boolean expression to filter rows from the table "persisted_state". All fields are combined with a logical 'AND'. */
export type Persisted_State_Bool_Exp = {
  _and?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  _not?: InputMaybe<Persisted_State_Bool_Exp>;
  _or?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  abi_files_hash?: InputMaybe<String_Comparison_Exp>;
  config_hash?: InputMaybe<String_Comparison_Exp>;
  envio_version?: InputMaybe<String_Comparison_Exp>;
  handler_files_hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  schema_hash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "persisted_state". */
export type Persisted_State_Order_By = {
  abi_files_hash?: InputMaybe<Order_By>;
  config_hash?: InputMaybe<Order_By>;
  envio_version?: InputMaybe<Order_By>;
  handler_files_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  schema_hash?: InputMaybe<Order_By>;
};

/** select columns of table "persisted_state" */
export enum Persisted_State_Select_Column {
  /** column name */
  AbiFilesHash = 'abi_files_hash',
  /** column name */
  ConfigHash = 'config_hash',
  /** column name */
  EnvioVersion = 'envio_version',
  /** column name */
  HandlerFilesHash = 'handler_files_hash',
  /** column name */
  Id = 'id',
  /** column name */
  SchemaHash = 'schema_hash'
}

/** Streaming cursor of the table "persisted_state" */
export type Persisted_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Persisted_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Persisted_State_Stream_Cursor_Value_Input = {
  abi_files_hash?: InputMaybe<Scalars['String']['input']>;
  config_hash?: InputMaybe<Scalars['String']['input']>;
  envio_version?: InputMaybe<Scalars['String']['input']>;
  handler_files_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  schema_hash?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "raw_events". All fields are combined with a logical 'AND'. */
export type Raw_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  _not?: InputMaybe<Raw_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  block_fields?: InputMaybe<Jsonb_Comparison_Exp>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_name?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  event_history?: InputMaybe<Entity_History_Bool_Exp>;
  event_id?: InputMaybe<Numeric_Comparison_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
  params?: InputMaybe<Jsonb_Comparison_Exp>;
  src_address?: InputMaybe<String_Comparison_Exp>;
  transaction_fields?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "raw_events". */
export type Raw_Events_Order_By = {
  block_fields?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  contract_name?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  event_history_aggregate?: InputMaybe<Entity_History_Aggregate_Order_By>;
  event_id?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  params?: InputMaybe<Order_By>;
  src_address?: InputMaybe<Order_By>;
  transaction_fields?: InputMaybe<Order_By>;
};

/** select columns of table "raw_events" */
export enum Raw_Events_Select_Column {
  /** column name */
  BlockFields = 'block_fields',
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  ContractName = 'contract_name',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  EventId = 'event_id',
  /** column name */
  EventName = 'event_name',
  /** column name */
  LogIndex = 'log_index',
  /** column name */
  Params = 'params',
  /** column name */
  SrcAddress = 'src_address',
  /** column name */
  TransactionFields = 'transaction_fields'
}

/** Streaming cursor of the table "raw_events" */
export type Raw_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Raw_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Raw_Events_Stream_Cursor_Value_Input = {
  block_fields?: InputMaybe<Scalars['jsonb']['input']>;
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_name?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['numeric']['input']>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  params?: InputMaybe<Scalars['jsonb']['input']>;
  src_address?: InputMaybe<Scalars['String']['input']>;
  transaction_fields?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** Boolean expression to compare columns of type "tradetype". All fields are combined with logical 'AND'. */
export type Tradetype_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['tradetype']['input']>;
  _gt?: InputMaybe<Scalars['tradetype']['input']>;
  _gte?: InputMaybe<Scalars['tradetype']['input']>;
  _in?: InputMaybe<Array<Scalars['tradetype']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['tradetype']['input']>;
  _lte?: InputMaybe<Scalars['tradetype']['input']>;
  _neq?: InputMaybe<Scalars['tradetype']['input']>;
  _nin?: InputMaybe<Array<Scalars['tradetype']['input']>>;
};

export type AllPoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPoolsQuery = { __typename?: 'query_root', Pool: Array<{ __typename?: 'Pool', id: string, chain: any, name: string, symbol: string, description: string, image: string, twitter: string, telegram: string, website: string, txId: string, token: string, contract: string, createdAt: number, createdBy: string, db_write_timestamp?: any | null }> };

export type AllTradesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTradesQuery = { __typename?: 'query_root', Trade: Array<{ __typename?: 'Trade', createdAt: number, db_write_timestamp?: any | null, ethAmount: any, id: string, token: string, tokenAmount: any, tradeType: any, trader: string, txId: string }> };


export const AllPoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Pool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"telegram"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"txId"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"db_write_timestamp"}}]}}]}}]} as unknown as DocumentNode<AllPoolsQuery, AllPoolsQueryVariables>;
export const AllTradesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllTrades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"db_write_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"ethAmount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAmount"}},{"kind":"Field","name":{"kind":"Name","value":"tradeType"}},{"kind":"Field","name":{"kind":"Name","value":"trader"}},{"kind":"Field","name":{"kind":"Name","value":"txId"}}]}}]}}]} as unknown as DocumentNode<AllTradesQuery, AllTradesQueryVariables>;