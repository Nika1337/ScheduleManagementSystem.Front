import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../hooks/useAuth";

const PrivateRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    const userRole = getUserRole();

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
