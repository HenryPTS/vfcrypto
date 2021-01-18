import { FC, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Tsym } from "types";
import styles from "./Header.module.scss";
import Select from "common/components/Select/Select";
import CurrencyInfo from "./components/CurrencyInfo/CurrencyInfo";

export interface HeaderProps {
  onSelectTsym: (s: any) => void
  tsym: Tsym
  lastUpdate?: number
}

const Header: FC<HeaderProps> = ({ onSelectTsym, tsym, lastUpdate }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <header className={styles.header}>
      <Switch>
        <Route path="/" exact>
          <h2>VFCrypto</h2>
        </Route>
        <Route path="/:currency" exact>
          <CurrencyInfo />
        </Route>
      </Switch>
      <div className={styles.rightContainer}>
      <Select
        onSelect={(s: any) => onSelectTsym(s)}
        valueSelected={tsym}
        isOpen={filterOpen}
        onOpen={() => setFilterOpen((open) => !open)}
        options={["GBP", "USD", "EUR", "JPY", "KRW"]}
      />
      {lastUpdate ? (
        <div className={styles.lastUpdate}>
        <h4 className={styles.label}>Last update:</h4>
        <h4 className={styles.time}>{new Date(lastUpdate).toLocaleTimeString()}</h4>
        </div>) : ''}
      </div>
    </header>
  );
};
export default Header;
