import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
// import BasicSpinner from "./BasicSpinner";

function Layout() {
  //   const { state } = useNavigation();
  return (
    <>
      <Sidebar />
      <main>
        {/* {state === "loading" ? <BasicSpinner /> : <Outlet />} */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;