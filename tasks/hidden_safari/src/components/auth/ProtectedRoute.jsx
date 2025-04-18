import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const userData = localStorage.getItem("hidden_safari_user");
  const user = userData ? JSON.parse(userData) : null;

  const currentUrl = location.pathname;

  if (!user || !user.loggedIn) {
    return <Navigate to="/login" replace state={{ from: currentUrl }} />;
  }

  return children;
};

export default ProtectedRoute;
