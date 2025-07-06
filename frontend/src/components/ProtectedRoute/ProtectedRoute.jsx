import { Navigate } from "react-router-dom";
import useAuthStatus from "../../hooks/useAuthStatus";

function ProtectedRoute({ children }) {
  const isAuthorized = useAuthStatus();

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
