import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home_page/Home";
import Footer from "./components/footer/Footer";
import Space from "./pages/space/Space";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage-space-/:spaceId" element={<Space />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
