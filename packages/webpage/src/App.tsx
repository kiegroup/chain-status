import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import RoutesTree from "./components/RoutesTree";
import BackTop from "./components/back-top/BactToTop";

interface IApp {}

const App = (props: IApp) => {
  const [basename, setBasename] = useState("");

  useEffect(() => {
    setBasename(`/${window.location.pathname.split("/")[1]}`);
  }, []);

  return (
    <Router basename={basename}>
      {/* <MenuComponent /> */}
      <BackTop key="back-to-top" />
      <RoutesTree />
    </Router>
  );
};

export default App;
