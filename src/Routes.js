import React, { Suspense } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
// import App from "./App";
// import SeeNews from "./Components/SeeNews";
// import Cardss from "./Components/Cardss";
import "./Components/spinner.css";

const App = React.lazy(() => import("./App"));
const SeeNews = React.lazy(() => import("./Components/SeeNews"));
const Cardss = React.lazy(() => import("./Components/Cardss"));
const VaccineAppointment = React.lazy(() =>
  import("./Components/VaccineAppointment")
);
const CovidStatesHome = React.lazy(() =>
  import("./Components/CovidStatesHome")
);
const WeatherHome = React.lazy(() => import("./Components/WeatherHome"));

function Routes() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="container">
            <div className="circle circle-red"></div>
            <div className="circle circle-blue"></div>
            <div className="circle circle-green"></div>
          </div>
        }
      >
        <HashRouter>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/Seenews" component={Cardss} />
            <Route path="/news/:data" component={SeeNews} />
            <Route path="/Covid/States" component={CovidStatesHome} />
            <Route path="/VaccineAppoint" component={VaccineAppointment} />
            <Route path="/Weather" component={WeatherHome} />
          </Switch>
        </HashRouter>
      </Suspense>
    </div>
  );
}

export default Routes;
