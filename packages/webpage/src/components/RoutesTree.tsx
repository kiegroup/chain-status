import { Routes, Route } from "react-router-dom";
import CurrentStatus from "../screens/CurrentStatus";
import EmptyScreen from "../screens/EmptyScreen";
import History from "../screens/History";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<EmptyScreen />} />
      <Route path="/status/:id" element={<CurrentStatus />} />
      <Route path="/job/:id" element={<CurrentStatus />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

export default RoutesTree;
