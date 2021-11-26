import { useEffect } from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import useBreakPoint from "./hooks/useBreakPoint";
import Home from "./home/Home";
import BusStopInfo from "./busStopInfo/BusStopInfo";
import SearchBusPage from "./searchBusPage/SearchBusPage";
import StationNearby from "./stationNearby/StationNearby";
import StationBusList from "./stationBusList/StationBusList";
import initAxios from "./utils/initAxios";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  const [bpoint] = useBreakPoint();
  const Router = () => {
    return (
      <Switch>
        <Route path={`/home`} render={() => <Home bpoint={bpoint} />} />
        <Route
          path={`/search-bus`}
          render={() => <SearchBusPage bpoint={bpoint} />}
        />
        <Route
          path={`/bus-stop-info`}
          render={() => <BusStopInfo bpoint={bpoint} />}
        />
        <Route
          path={`/nearby-stations`}
          render={() => <StationNearby bpoint={bpoint} />}
        />
        <Route
          path={`/station-bus-list`}
          render={() => <StationBusList bpoint={bpoint} />}
        />
        <Redirect to={`/home`} />
      </Switch>
    );
  };

  useEffect(() => {
    initAxios();
  }, []);

  initAxios();
  return (
    <div className="App">
      <HashRouter>
        <Router />
      </HashRouter>
    </div>
  );
}

export default App;
