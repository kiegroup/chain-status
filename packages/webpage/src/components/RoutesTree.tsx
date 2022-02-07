import { Routes, Route } from "react-router-dom";
import CurrentStatus from "../screens/CurrentStatus";
import History from "../screens/History";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<CurrentStatus />} />
      <Route path="/status" element={<CurrentStatus />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

export default RoutesTree;
