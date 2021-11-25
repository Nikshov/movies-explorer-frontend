import { Navigate } from "react-router-dom";

export function Auth({ children, redirectTo, loggedIn }) {
  
  return loggedIn ? children : <Navigate to={redirectTo} />;
}
