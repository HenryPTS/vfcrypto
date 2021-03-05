import React, { FC, HTMLAttributes, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/createStore'
import { fetchDailyHistoricalDataPair, HistoricalDataState } from 'redux/slices/historicalData.slice';
import isEmpty from 'lodash/isEmpty'
import { getCurrencyData, getTopListStatus, selectHistoricalData } from 'redux/selectors'
import styles from './Currency.module.scss'
import { Redirect,useParams } from 'react-router'
import Card from 'common/components/Card/Card'
import LoadingSpinnerSvg from 'common/images/LoadingSpinnerSvg'
import { TopListApi } from 'apis/TopListsApi'
import { Tsym } from 'types'
import StockChart from 'common/charts/StockChart/StockChart';
export interface CurrencyData {
  price: number,
  rank: number,
  id: string  
  name: string  
  fullName: string  
  marketCap: string 
  volume24Hour: string;
  high24Hour: string;
  low24Hour: string
}

export interface CurrencyProps extends HTMLAttributes<HTMLElement> {
  currencyData: CurrencyData
  historicalData: HistoricalDataState
}

const Currency: FC<CurrencyProps> = ({
  currencyData,
  historicalData,
  ...rest
}) => {
  return (
    <div className={styles.container} {...rest}>
      <div className={styles.largeGrid}>
        <div className={styles.rank}>
          <div className={styles.text}>
            Rank
          </div>
          <div className={styles.circle}>{currencyData.rank}</div>
        </div>
        <Card header="Market Cap" text={currencyData.marketCap} />
        <Card header="Volume (24h)" text={abbreviateNumber(currencyData.volume24Hour)} />
        <Card header="Price" text={`${abbreviateNumber(currencyData.high24Hour)}`} />
        <Card header="Price" text={`${abbreviateNumber(currencyData.high24Hour)}`} />
      </div>
      <StockChart data={historicalData.pairData} />
    </div>
  )
}

const CurrencyContainer = () => {
  const dispatch = useDispatch()
  const params = useParams<{currency:string}>()
  const status = useSelector(getTopListStatus)
  const currencyData = useSelector((state: RootState) => getCurrencyData(state, params.currency))
  const historicalData = useSelector(selectHistoricalData)

  useEffect(() => {
    dispatch(fetchDailyHistoricalDataPair(status.tsym, params.currency))
  }, [status.tsym, params.currency])
  if (!isEmpty(currencyData) && !isEmpty(historicalData.pairData)){
    return(
      <Currency
        historicalData={historicalData}
        currencyData={currencyData as CurrencyData}
      />
    )
  }
  // if (status.loading || historicalData.loading)
    return <LoadingSpinnerSvg fill="#ffffff" />
  // if data object for currency is empty and no data is loading
  // then params.currency is invalid currency, so redirect to dash
  // return <Redirect to="/" />
}

export default CurrencyContainer

function abbreviateNumber(value: string): string {
  const re = /\d.+/ig
  const match = value.replace(',', '').match(re)
  if (!match || !match.length){
    return "Invalid number"
  }
  const intValue = Number.parseInt(match[0])
  var newValue = intValue.toString();
  if (intValue >= 1000) {
      var suffixes = ["", "k", "m", "b","t"];
      var suffixNum = Math.floor( newValue.length/3 );
      var shortValue;
      for (var precision = 2; precision >= 1; precision--) {
          shortValue = parseFloat( (suffixNum != 0 ? (intValue / Math.pow(1000,suffixNum) ) : intValue).toPrecision(precision));
          var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
          if (dotLessShortValue.length <= 2) { break; }
      }
      if (shortValue && shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
      newValue = shortValue+suffixes[suffixNum];
  }
  return `$ ${newValue}`;
}
