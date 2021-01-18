import axios from "axios";
import HttpService from "../../services/HttpService";
import { Tsym } from "../../types";
import { IToplistData } from "./TopListsApi.types";

export abstract class TopListApi {

  public static async getToplistByMarketCap(tsym: Tsym) {
    const url = HttpService.generateUrl(
      '/data/top/mktcapfull',
      { tsym }
    )
    const res = await axios.get<IToplistData.Response>(url.toString())
    return res.data.Data as IToplistData.Datum[]
  }

}