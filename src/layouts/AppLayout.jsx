import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import LogoContainer from "../components/LogoContainer";
import LogoImg from "../assets/images/okopdlogo.png";
import MedcertContainer from "../assets/images/medcertlogo.png";
import { useLocation } from "react-router-dom";

const AppLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <div>
        <LogoContainer>
          {pathname === "/hims" ? (
            <img src={MedcertContainer} alt="MERCERT - APPOINTMENT" />
          ) : (
            <img src={LogoImg} alt="JBLMGH - OKOPD" />
          )}
        </LogoContainer>
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
