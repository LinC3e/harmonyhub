import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/authContext";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth("state");
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}