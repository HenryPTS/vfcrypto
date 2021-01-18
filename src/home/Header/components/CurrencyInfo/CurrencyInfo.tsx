import BackSvg from "common/images/BackSvg";
import { FC, HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "redux/createStore";
import { getCurrencyMetadata } from "redux/selectors";
import styles from "./CurrencyInfo.module.scss";

export interface CurrencyInfoProps extends HTMLAttributes<HTMLElement> {}

const CurrencyInfo: FC<CurrencyInfoProps> = ({ ...rest }) => {
  const params = useParams<{ currency: string }>();
  const data = useSelector((state: RootState) =>
    getCurrencyMetadata(state, params.currency)
  );
  return (
    <div className={styles.container}>
      <Link to="/">
        <BackSvg />
      </Link>
      <div className={styles.titleContainer}>
        <img className={styles.logo} src={data.imageUrl} alt={data.name} />
        <h3 className={styles.title}>{data.fullName}</h3>
        <h6 className={styles.subtitle}>{data.name}</h6>
      </div>
      <div>
        <h2 className={styles.price} style={{ color: "#b5b1bd" }}>
          {data.toSym}
        </h2>
        <h2 className={styles.price}>{data.price}</h2>
      </div>
    </div>
  );
};

export default CurrencyInfo;
