import React, { FC, HTMLAttributes } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/createStore'
import isEmpty from 'lodash/isEmpty'
import { getCurrencyData, getTopListStatus } from 'redux/selectors'
import styles from './Currency.module.scss'
import { Redirect,useParams } from 'react-router'
import Card from 'common/components/Card/Card'
import LoadingSpinnerSvg from 'common/images/LoadingSpinnerSvg'

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
  data: CurrencyData
}

const Currency: FC<CurrencyProps> = ({
  data,
  ...rest
}) => (
  <div className={styles.container} {...rest}>
    <div className={styles.largeGrid}>
      <div className={styles.rank}>
        <div className={styles.text}>
          Rank
        </div>
        <div className={styles.circle}>{data.rank}</div>
      </div>
      <Card header="Market Cap" text={data.marketCap} size="small" />
      <Card header="Volume (24h)" text={data.volume24Hour} size="small" />
      <Card header="Price" text={`${data.high24Hour}`} size="small" />
      <Card header="Price" text={`${data.high24Hour}`} size="small" />
    </div>
  </div>
)

const CurrencyContainer = () => {
  const params = useParams<{currency:string}>()
  const status = useSelector(getTopListStatus)
  const currencyData = useSelector((state: RootState) => getCurrencyData(state, params.currency))
  if (!isEmpty(currencyData)) return <Currency data={currencyData as CurrencyData} />
  if (isEmpty(currencyData) && status.loading) return <LoadingSpinnerSvg />
  return <Redirect to="/" />
}

export default CurrencyContainer
