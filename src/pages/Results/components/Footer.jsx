const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="container footer-container">
        <div className="row">
          <div className="col-12 left-content">
            {" "}
            All Rights Reserved {currentYear}
          </div>
          <div className="col-12 right-content">
            <ul>
              <li>
                <a href="https://jblmgh.doh.gov.ph/" target="_blank">
                  JOSE B. LINGAD MEMORIAL GENERAL HOSPITAL
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
