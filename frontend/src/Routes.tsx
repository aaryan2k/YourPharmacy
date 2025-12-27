import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./login/Register";
import Profile from "./login/Profile";
import ProfileEdit from "./login/ProfileEdit";

// // import Standings from "./standings/Standings";
// // import StandingsLoader from "./standings/StandingsLoader";
// // import Stats from "./stats/Stats";
// // import StatsGraph from "./stats/StatsGraph";
// // import StatsLoader from "./stats/StatsLoader";
// // import ErrorPage from "./ErrorPage";

const RoutesJSX = (
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} index />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/edit" element={<ProfileEdit />} />

    {/* <Route path="standings" element={<Standings />} loader={StandingsLoader}>
      errorElement={<ErrorPage />} 
    </Route>
    <Route path="/stats/:stat" loader={StatsLoader} element={<StatsGraph />}/>
    <Route path="/stats" element={<Stats />} />  */}
  </Route>
);

export const router = createHashRouter(createRoutesFromElements(RoutesJSX));