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
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";
import TermsAndConditions from "./pages/policy/TermsAndConditions";
import MainAuthPage from "./pages/auth/MainAuthPage";
import UserProfile from "./pages/useProfile/UserProfile";
import EventDetails from "./pages/events/EventDetails";
import { Toaster } from 'react-hot-toast';


function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <BrowserRouter>
      <TopHeader />
      <div className="min-h-[77vh]">
        <Toaster/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<MainAuthPage />} />
          <Route path="/register" element={<MainAuthPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/event-details" element={<EventDetails />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/user-profile/" element={<UserProfile />} />
                  <Route path="/team" element={<Team />}>
                    <Route path="one" element={<TeamOne />} />
                    <Route path="two" element={<TeamTwo />} />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="*" element={<h4>404 - Page Not Found</h4>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
