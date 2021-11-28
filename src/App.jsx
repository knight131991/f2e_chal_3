import { useEffect } from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import Home from "./home/Home";
import BusStopInfo from "./busStopInfo/BusStopInfo";
import SearchBusPage from "./searchBusPage/SearchBusPage";
import StationNearby from "./stationNearby/StationNearby";
import StationBusList from "./stationBusList/StationBusList";
import initAxios from "./utils/initAxios";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  useEffect(() => {
    initAxios();
  }, []);
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path={`/home`} component={Home} />
          <Route path={`/search-bus`} component={SearchBusPage} />
          <Route path={`/bus-stop-info`} component={BusStopInfo} />
          <Route path={`/nearby-stations`} component={StationNearby} />
          <Route path={`/station-bus-list`} component={StationBusList} />
          <Redirect to={`/home`} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
