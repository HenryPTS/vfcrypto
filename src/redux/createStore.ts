
import { Action, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import ReduxThunk, { ThunkAction } from 'redux-thunk'
import topList from "./slices/topList.slice"
import historicalData from './slices/historicalData.slice'

const rootReducer = combineReducers({
  topList,
  historicalData
});

const middleware = [...getDefaultMiddleware(), ReduxThunk];
const store = configureStore({ reducer: rootReducer, middleware });

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store;
