import { createSelector } from 'reselect'
import { TableDatum } from 'common/components/CoinTable/CoinTable'
import { RootState } from '../createStore'
import { Tsym } from 'types'
import { pick } from 'lodash'

export const getCoinTableData = createSelector(
  (state: RootState) => ({coins: state.topList.coins, tsym: state.topList.tsym}),
  ({coins, tsym}) =>  coins.reduce<TableDatum[]>(
      (p,c) => p.concat([{
        price: c.DISPLAY[tsym].PRICE,
        changePct24Hour: Math.round( c.RAW[tsym].CHANGEPCT24HOUR * 100 + Number.EPSILON ) / 100,
        imageUrl: process.env.REACT_APP_STATIC_URI + c.CoinInfo.ImageUrl,
        id: c.CoinInfo.Id,
        name: c.CoinInfo.Name,
        fullName: c.CoinInfo.FullName,
        marketCap: c.DISPLAY[tsym].MKTCAP
      }]), []
    )
)

export const getCurrencyData = createSelector(
  (state: RootState, currency: string) => (
    {
      currency: state.topList.coins.find(c => c.CoinInfo.Name === currency),
      rank: state.topList.coins.findIndex(c => c.CoinInfo.Name === currency) + 1,
      tsym: state.topList.tsym
    }),
  ({ currency,tsym, rank }) => !currency ? {} : ({
        price: currency.RAW[tsym].PRICE,
        rank,
        id: currency.CoinInfo.Id,
        name: currency.CoinInfo.Name,
        fullName: currency.CoinInfo.FullName,
        marketCap: currency.DISPLAY[tsym].MKTCAP,
        volume24Hour: currency.DISPLAY[tsym].VOLUME24HOURTO,
        high24Hour: currency.DISPLAY[tsym].HIGH24HOUR,
        low24Hour: currency.DISPLAY[tsym].LOW24HOUR
    })
)

export const getCurrencyMetadata = createSelector(
  (state: RootState, currency: string) => ({currency: state.topList.coins.find(c => c.CoinInfo.Name === currency), tsym: state.topList.tsym}),
  ({ currency,tsym }) => !currency ? {} : ({
        price: currency.RAW[tsym].PRICE,
        imageUrl: process.env.REACT_APP_STATIC_URI + currency.CoinInfo.ImageUrl,
        name: currency.CoinInfo.Name,
        fullName: currency.CoinInfo.FullName,
        fromSym: currency.DISPLAY[tsym].FROMSYMBOL,
        toSym: currency.DISPLAY[tsym].TOSYMBOL
    })
)


export const getTopListStatus = createSelector(
  (state: RootState) => state.topList,
  topList => pick(topList, ['tsym', 'loading', 'lastUpdate'])
)