import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import MenuComponent from "./components/Menu";
import RoutesTree from "./components/RoutesTree";

interface IApp {}

const App = (props: IApp) => {
  const [basename, setBasename] = useState("");

  useEffect(() => {
    setBasename(`/${window.location.pathname.split("/")[1]}`);
  }, []);

  return (
    <Router basename={basename}>
      <MenuComponent />
      <RoutesTree />
    </Router>
  );
};

export default App;
