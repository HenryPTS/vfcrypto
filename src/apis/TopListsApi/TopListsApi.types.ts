import { Tsym } from "types";

type Rating = "A+" | "A" | "A-" |"B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" |"E+" | "E" | "E-" | "F" | "U"

export module IToplistData {
  interface Weiss {
    Rating: Rating,
    TechnologyAdoptionRating: Rating
    MarketPerformanceRating: Rating
  }
  export interface CoinInfo {
    Id: string
    Name: string
    FullName: string
    Internal: string
    ImageUrl: string
    Url: string
    Algorithm: 'SHA-256' | 'Scrypt' | "Ouroboros" | "Equihash" | "N/A" | string
    ProofType: "PoW" | "(PoB)" | "POS" | "SCP" | "DPoS" | "N/A" | string
    Rating: { Weiss: Weiss }
    NetHashesPerSecond: number
    BlockNumber: number
    BlockTime: number
    BlockReward: number
    AssetLaunchDate: string
    MaxSupply: number
    Type: number
    DocumentType: string
  }
  interface DisplayRawShared {
    MARKET: string
    TOSYMBOL: string
    FROMSYMBOL: string
    LASTUPDATE: number
    LASTVOLUME: number
    LASTVOLUMETO: number
    PRICE: number,
    MEDIAN: number,
    LASTTRADEID: string
    VOLUMEDAY: number,
    VOLUMEDAYTO: number,
    VOLUME24HOUR: number,
    VOLUME24HOURTO: number,
    OPENDAY: number,
    HIGHDAY: number,
    LOWDAY: number,
    OPEN24HOUR: number,
    HIGH24HOUR: number,
    LOW24HOUR: number,
    LASTMARKET: string
    VOLUMEHOUR: number,
    VOLUMEHOURTO: number,
    OPENHOUR: number,
    HIGHHOUR: number,
    LOWHOUR: number,
    TOPTIERVOLUME24HOUR: number,
    TOPTIERVOLUME24HOURTO: number,
    CHANGE24HOUR: number,
    CHANGEPCT24HOUR: number,
    CHANGEDAY: number,
    CHANGEPCTDAY: number,
    CHANGEHOUR: number
    CHANGEPCTHOUR: number
    CONVERSIONTYPE: string
    CONVERSIONSYMBOL: string
    SUPPLY: number
    MKTCAP: number
    MKTCAPPENALTY: number
    TOTALVOLUME24H: number,
    TOTALVOLUME24HTO: number,
    TOTALTOPTIERVOLUME24H: number,
    TOTALTOPTIERVOLUME24HTO: number,
    IMAGEURL: string
  }
  export interface Raw extends DisplayRawShared {
    TYPE: string
    FLAGS: string
  }
  export interface Display extends Record<keyof DisplayRawShared, string>{}
  export interface Datum {
    CoinInfo: CoinInfo
    RAW: {[key in Tsym]: Raw}
    DISPLAY: {[key in Tsym]: Display}
  }
  export interface Response {
    Data: Datum[]
  }
}

export module IHistoricalDataPairData {
  export interface Datum  {
      time: number
      high: number
      low: number
      open: number
      volumefrom: number
      volumeto: number
      close: number
      conversionType: string
      conversionSymbol: string  
  }

  export interface Response {
    Data: {
    Aggregated: boolean
    TimeFrom: number
    TimeTo: number
    Data: Datum[]}
  }
}
