import { Outlet } from "react-router";
import Header from "../Header/Header";
import "./Layout.css";
import { useSelector } from "react-redux";

import { useLocation, Navigate } from "react-router-dom";
import { selectUserLoading, selectUsername } from "../../../store/store";

const Layout = () => {
  const location = useLocation();

  const isLoading = useSelector(selectUserLoading);
  const username = useSelector(selectUsername);

 
  if (!username && location.pathname !== "/")
    return <Navigate to="/" replace />;

  const Loading = () => (
    <div className="layout-loading">
      <h3>Loading...</h3>
    </div>
  );

  return (
    <>
      <Header />
      {isLoading ? <Loading /> : <Outlet />}
    </>
  );
};

export default Layout;
