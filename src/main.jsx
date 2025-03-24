import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fontawesome/css/fontawesome.min.css";
import "./assets/custom/main.css";
import "./assets/css/main.css";
import "./assets/bootstrap/js/bootstrap.bundle.min.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
