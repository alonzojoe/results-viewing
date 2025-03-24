import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import Results from "./pages/Results.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Results />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
