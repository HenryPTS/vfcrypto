import { createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import { TopListApi } from "../../apis/TopListsApi";
import { IHistoricalDataPairData } from "../../apis/TopListsApi/TopListsApi.types";
import { Tsym } from "../../types";
import { AppThunk } from "../createStore";

export interface HistoricalDataState {
  loading: boolean
  tsym: Tsym
  pairData: IHistoricalDataPairData.Datum[]
}

const initialState: HistoricalDataState = {
  loading: false,
  tsym: 'USD',
  pairData: []
}
const historicalData = createSlice({
  name: 'historicalData',
  initialState,
  reducers: {
    fetchHistoricalDataStart(state, { payload }:  PayloadAction<Tsym>) {
      state.loading = true
      state.tsym = payload
      state.pairData = []
    },
    fetchHistoricalDataSuccess(state, { payload }: PayloadAction<IHistoricalDataPairData.Datum[]>){
      state.loading = false
      state.pairData = payload
    }
  }
})

export const {
  fetchHistoricalDataStart,
  fetchHistoricalDataSuccess
} = historicalData.actions

export const fetchDailyHistoricalDataPair = (tsym: Tsym, fsym: string): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchHistoricalDataStart(tsym))
    const dataPair = await TopListApi.getDailyHistoricalDataPair(tsym, fsym)
    dispatch(fetchHistoricalDataSuccess(dataPair))
  } catch (error) {
    console.error(error)
  }
}

export default historicalData.reducer