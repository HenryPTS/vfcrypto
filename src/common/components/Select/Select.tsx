import React, { FC } from 'react'
import styles from './Select.module.scss'
import InnerAbsolute from './styled/InnerAbsolute'
import SvgArrow from './styled/SvgArrow'

export interface SelectProps {
  options: string[],
  onOpen?: () => void
  onSelect: (s: any) => void
  isOpen: boolean
  valueSelected: string
}

const Select: FC<SelectProps> = ({
  options,
  isOpen,
  onOpen,
  onSelect,
  valueSelected,
  ...rest
}) => (
  <div className={styles.selectContainer} onClick={onOpen} {...rest}>
    <SvgArrow viewBox="0 0 80 60" width="8" height="6" isOpen={isOpen}>
      <path d="M0 0 L60 0 L30 60 Z" fill="#333333" />
    </SvgArrow>
    <InnerAbsolute isOpen={isOpen}>
      <h4 className={styles.defaultHeader}>
        {valueSelected}
      </h4>
      <ul className={styles.selectList}>
        {isOpen && options.map((value) => (
          <li onClick={() => onSelect(value)} className={styles.selectListItem} value={value} key={value}>
            {value}
          </li>
        ))}
      </ul>
    </InnerAbsolute>
  </div>
)

export default Select
