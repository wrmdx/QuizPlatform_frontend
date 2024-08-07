import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentRole } from "@/features/auth/authSlice.jsx";

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ allowedRoles }) => {
    const token = useSelector(selectCurrentToken);
    const role = useSelector(selectCurrentRole);
    const location = useLocation();

    console.log("Token:", token);
    console.log("Role:", role);

    return (
        // eslint-disable-next-line react/prop-types
        token && allowedRoles.includes(role)
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
};

export default RequireAuth;
