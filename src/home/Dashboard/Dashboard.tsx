import React, { FC, HTMLAttributes } from 'react'
import CoinTable, { TableDatum } from 'common/components/CoinTable/CoinTable'
import { useSelector } from 'react-redux'
import { getCoinTableData, getTopListStatus } from 'redux/selectors'
import LoadingSpinnerSvg from 'common/images/LoadingSpinnerSvg'

export interface DashboardProps extends HTMLAttributes<HTMLElement> {
  data: TableDatum[]
}

export const Dashboard: FC<DashboardProps> = ({
  data,
}) => {
  return (
  <div>
    <CoinTable data={data}/>
  </div>
)
}

const DashboardContainer = () => {
  const tableData = useSelector(getCoinTableData)
  const status = useSelector(getTopListStatus)
  if (status.loading) return <LoadingSpinnerSvg />
  return <Dashboard data={tableData} />
}
export default DashboardContainer
