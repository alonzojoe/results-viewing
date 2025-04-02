import appLogo from "../../assets/images/appLogo.png";
import useToggle from "../../hooks/useToggle";
import LanguageContext from "../../context/Global/language-context";
import { useContext } from "react";

const Header = () => {
  const [header, toggleHeader] = useToggle();
  const { language } = useContext(LanguageContext);

  const navObject = language?.data[0].nav[0];

  // const navLinks = useMemo(() => {
  //   return Object.entries(navObject) ?? [];
  // }, [navObject]);

  console.log("nav", language);
  console.log("navObject", navObject);
  console.log("navObject type", typeof navObject);

  const navItems =
    typeof navObject === "object"
      ? Object.entries(navObject).map(([key, value], index) => ({
          id: index + 1,
          path: `/${key}`,
          name: value,
        }))
      : [];

  console.log("navItems", navItems);

  return (
    <>
      <div className="header-menu">
        <div className="container header-container">
          <div className="row">
            <div className="col-2 d-flex align-items-center gap-2">
              <img src={appLogo} width="30" height="30" />
              <a className="logo">JBLMGH</a>
            </div>
            <div className="col-10">
              <nav className="main-menu">
                <ul>
                  {navItems.map((nav) => (
                    <li key={nav.id}>
                      <a>{nav.name}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div id="mobile-menu-wrap" className="row">
                <div className="col-11 text-end">
                  <a>OKOPD Queue</a>
                </div>
                <div className="col-1">
                  <a className="burger-menu" onClick={() => toggleHeader()}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {header && (
        <div className="mobile-menu">
          <div className="container mobile-container">
            <i
              className="fa fa-times close-button"
              aria-hidden="true"
              onClick={() => toggleHeader()}
            ></i>
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Services</a>
              </li>
              <li>
                <a>Policy</a>
              </li>
              <li>
                <a>OKOPD Queue</a>
              </li>
              <li>
                <a>View Appointment</a>
              </li>
              <li>
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Get Appointment
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
