import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fontawesome/css/fontawesome.min.css";
import "./assets/custom/main.css";
import "./assets/css/main.css";
import "./assets/bootstrap/js/bootstrap.bundle.min.js";
import "./index.css";
import "sweetalert2/dist/sweetalert2.min.css";

import App from "./App.jsx";
import PatientProvider from "./context/Patient/patient-provider.jsx";
import LanguageProvider from "./context/Global/language-provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <PatientProvider>
        <App />
      </PatientProvider>
    </LanguageProvider>
  </StrictMode>
);
