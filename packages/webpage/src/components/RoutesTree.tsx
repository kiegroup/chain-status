import { Routes, Route } from "react-router-dom";
import CurrentStatus from "../views/CurrentStatus";
import JobView from "../views/JobView";
import EmptyScreen from "../views/EmptyScreen";
import History from "../views/History";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<EmptyScreen />} />
      <Route path="/status/:id" element={<CurrentStatus />} />
      <Route path="/job/:id" element={<JobView />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

export default RoutesTree;
