import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Landing } from "./pages/Landing";
import { AreasWeServe } from "./pages/AreasWeServe";
import { RegionPage } from "./pages/RegionPage";
import { CityPage } from "./pages/CityPage";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/locations" element={<AreasWeServe />} />
        <Route path="/locations/:region" element={<RegionPage />} />
        <Route path="/locations/:region/:city" element={<CityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
