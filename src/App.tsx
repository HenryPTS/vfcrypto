import { useEffect, useState } from 'react';
import {Switch, Route} from 'react-router-dom'
import styles from './App.module.scss'
import './App.css';
import Dashboard from 'home/Dashboard/Dashboard';
import Currency from 'home/Currency/Currency'
import Header from 'home/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { fetchToplistByMarketCap } from 'redux/slices/topList.slice';
import { getTopListStatus } from 'redux/selectors';
import useInterval from 'common/hooks/useInterval';
 
function App() {
  const status = useSelector(getTopListStatus)
  // status.tsym holds the chosen currency
  const [tsym, setTsym] = useState(status.tsym)
  const dispatch = useDispatch()
  // Fetched top ten coins by market cap on load, on change of tsym, and every 60 seconds
  useEffect(() => {
    dispatch(fetchToplistByMarketCap(tsym))
  }, [tsym])
  // useInterval(() => {
  //   dispatch(fetchToplistByMarketCap(tsym))
  // }, 60 * 1000)
  
  return (
    <div className="App">
      <Header tsym={tsym} lastUpdate={status.lastUpdate} onSelectTsym={setTsym}/>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/:currency" exact>
          {/* Container outside of currency component to avoid background flickering during loads */}
          <div className={styles.currencyOuterContainer}>
            <Currency />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
