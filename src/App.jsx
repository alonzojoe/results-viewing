import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import Results from "./pages/Results/Results.jsx";
import Hims from "./pages/Hims/Hims.jsx";

function App() {
  return (
    <>
      <BrowserRouter basename="/opd/lab">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Results />} />
            <Route path="hims" element={<Hims />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
