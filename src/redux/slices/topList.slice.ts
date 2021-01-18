import { createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import { TopListApi } from "../../apis/TopListsApi";
import { IToplistData } from "../../apis/TopListsApi/TopListsApi.types";
import { Tsym } from "../../types";
import { AppThunk } from "../createStore";

interface TopListState {
  loading: boolean
  tsym: Tsym
  coins: IToplistData.Datum[]
  lastUpdate?: number
}

const initialState: TopListState = {
  loading: false,
  tsym: 'USD',
  coins: []
}
const topList = createSlice({
  name: 'topList',
  initialState,
  reducers: {
    fetchListStart(state, { payload }:  PayloadAction<Tsym>) {
      state.loading = true
      state.tsym = payload
      state.coins = []
    },
    fetchListSucccess(state, { payload }: PayloadAction<IToplistData.Datum[]>){
      state.loading = false
      state.coins = payload
      state.lastUpdate = Date.now()
    }
  }
})

export const {
  fetchListStart,
  fetchListSucccess
} = topList.actions

export const fetchToplistByMarketCap = (tsym: Tsym): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchListStart(tsym))
    const coins = await TopListApi.getToplistByMarketCap(tsym)
    dispatch(fetchListSucccess(coins))
  } catch (error) {
    console.error(error)
  }
}

export default topList.reducer