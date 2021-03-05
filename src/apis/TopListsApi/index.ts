import axios from "axios";
import HttpService from "../../services/HttpService";
import { Tsym } from "../../types";
import { IHistoricalDataPairData, IToplistData } from "./TopListsApi.types";

export abstract class TopListApi {
  public static async getToplistByMarketCap(tsym: Tsym) {
    const url = HttpService.generateUrl(
      '/data/top/mktcapfull',
      { tsym }
    )
    const res = await axios.get<IToplistData.Response>(url.toString())
    return res.data.Data as IToplistData.Datum[]
  }

  public static async getDailyHistoricalDataPair(tsym: Tsym, fsym: string) {
    const url = HttpService.generateUrl(
      '/data/v2/histoday',
      { tsym, fsym }
    )
    const res = await axios.get<IHistoricalDataPairData.Response>(url.toString())
    console.log({res})
    return res.data.Data.Data as IHistoricalDataPairData.Datum[]
  }
}