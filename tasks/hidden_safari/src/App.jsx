import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import TopHeader from "./components/header/TopHeader";
import Footer from "./components/footer/Footer";
import Events from "./pages/events/Events";
import AboutUs from "./pages/about/AboutUs";
import Team from "./pages/team/Team";
import Contact from "./pages/contact/Contact";
import TeamOne from "./pages/team/TeamOne";
import TeamTwo from "./pages/team/TeamTwo";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <TopHeader />
      <div className="min-h-[72vh]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/events" element={<Events />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/team" element={<Team />}>
                    <Route path="one" element={<TeamOne />} />
                    <Route path="two" element={<TeamTwo />} />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<h4>404 - Page Not Found</h4>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
