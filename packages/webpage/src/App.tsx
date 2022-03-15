import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RoutesTree from "./components/RoutesTree";
import BackTop from "./components/back-top/BactToTop";
import initStore from "./config/store";
import { Provider as StoreProvider } from "react-redux";

interface IApp {}

const App = (props: IApp) => {
  const [basename, setBasename] = useState("");
  const store = initStore();

  useEffect(() => {
    setBasename(`/${window.location.pathname.split("/")[1]}`);
  }, []);

  return (
    <StoreProvider store={store}>
      <Router basename={basename}>
        <BackTop key="back-to-top" />
        <RoutesTree />
      </Router>
    </StoreProvider>
  );
};

export default App;
