import { Navigate } from "react-router-dom";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
const [logginStatus, setLogginStatus]= useState(true)
if(logginStatus==false){
return <Navigate to="/login" replace />
}

return children

};

export default ProtectedRoute;
