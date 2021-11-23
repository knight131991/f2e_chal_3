import { useEffect } from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import Home from "./home/Home";
import BusStopInfo from "./busStopInfo/BusStopInfo";
import SearchBusPage from "./searchBusPage/SearchBusPage";
import "antd/dist/antd.css";
import "./App.css";
import initAxios from "./utils/initAxios";

function App() {
  const Router = () => {
    return (
      <Switch>
        <Route path={`/home`} component={Home} />
        <Route path={`/search-bus`} component={SearchBusPage} />
        <Route path={`/bus-stop-info`} component={BusStopInfo} />
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
