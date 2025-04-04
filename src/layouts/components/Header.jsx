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

  const selectTab = (path) => {
    console.log(path);
    let newPath;
    switch (path) {
      case "/home":
        newPath = "/";
        break;
      case "/services":
        newPath = path;
        break;
      case "/policy":
        newPath = path;
        break;
      case "/telecode":
        newPath = "/queuecode";
        break;
      case "/viewappointment":
        newPath = "/ViewAppointment";
        break;
      case "/getappointment":
        newPath = "/";
        break;
      case "/lab":
        newPath = "/";
        break;
      default:
        break;
    }
    if (path === "/lab") {
      window.location.reload();
      return;
    }
    // return;
    window.location.href = `https://jblmgh.info:70/opd/#${newPath}`;
  };

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
                      <a onClick={() => selectTab(nav.path)}>{nav.name}</a>
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
              {navItems.map((nav) => (
                <li key={nav.id}>
                  <a onClick={() => selectTab(nav.path)}>{nav.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
