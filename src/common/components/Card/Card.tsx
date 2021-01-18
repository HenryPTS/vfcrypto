import { FC, HTMLAttributes } from 'react'
import styles from './Card.module.scss'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  header: string
  text: string | number
}

const Card: FC<CardProps> = ({
  header,
  text,
  ...rest
}) => (
  <div className={styles.container} {...rest}>
    <div className={styles.header}>
      {header}
    </div>
    <div className={styles.text}>
      {text}
    </div>
  </div>
)

export default Card
