import { FC, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import styles from './CoinTable.module.scss'

export interface TableDatum {
  price: string,
  changePct24Hour: number,
  imageUrl: string  
  id: string  
  name: string  
  fullName: string  
  marketCap: string 
}

export interface CoinTableProps extends HTMLAttributes<HTMLElement> {
  data: TableDatum[]
}

const CoinTable: FC<CoinTableProps> = ({
  data,
  ...rest
}) => (
  <table className={styles.coinTable} {...rest}>
    <thead>
      <tr>
        <th className={styles.spacer} />
        <th>Cryptocurrency</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>24h Change</th>
        <th className={styles.spacer} />
      </tr>
    </thead>
    <tbody>
      {data.map(datum => (
        <tr key={datum.id}>
          <td className={styles.spacer} />  
          <td>
            <img className={styles.logo} src={datum.imageUrl} alt={datum.name} />
            <span>{datum.fullName}</span>
          </td>
          <td>{datum.price}
          </td>
          <td>
            {datum.marketCap}
          </td>
          <td className={datum.changePct24Hour > 0 ? styles.green : styles.red}>
            {datum.changePct24Hour}
          </td>
          <td className={styles.spacer} />
          {/* Positioning trick puts Link above td elements w/o disrupting table layout */}
          <Link to={`/${datum.name}`} style={{position: 'absolute', left:0, right:0, height: "inherit"}} />
        </tr>
      ))}
    </tbody>
  </table>
)

export default CoinTable
