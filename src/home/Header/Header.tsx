import { FC, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Tsym } from "types";
import styles from "./Header.module.scss";
import Select from "common/components/Select/Select";
import CurrencyInfo from "./components/CurrencyInfo/CurrencyInfo";
import useMouseDown from "common/hooks/useMouseDown";

export interface HeaderProps {
  onSelectTsym: (s: any) => void
  tsym: Tsym
  lastUpdate?: number
}

const Header: FC<HeaderProps> = ({ onSelectTsym, tsym, lastUpdate }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  // closes the filter if clicked outside
  const closeFilter = (ev: MouseEvent, isFilterOpen: boolean, clearFilters: () => void) => {
    const eventTargets = ev.composedPath() as Element[];
    const outsideClick = !eventTargets.some(
      (target) =>
        typeof target.id === "string" &&
        target.id === "selectTsym"
    );
    if (outsideClick && isFilterOpen) clearFilters();
  }
  useMouseDown((ev) => closeFilter(ev, filterOpen, () => setFilterOpen(false)), [filterOpen])


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
        id="selectTsym"
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
