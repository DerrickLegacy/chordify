import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/header/Header";
import AddTask from "./components/createTask/AddTask";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import TaskDetails from "./pages/TaskDetails";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task-details-/:id" element={<TaskDetails />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
