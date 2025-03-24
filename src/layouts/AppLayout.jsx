import { Outlet } from "react-router-dom";
import Header from "./components/Header";
const AppLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
