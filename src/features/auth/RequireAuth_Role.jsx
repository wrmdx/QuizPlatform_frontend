import {Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";
import {selectCurrentRole} from "@/features/auth/authSlice.jsx";

// eslint-disable-next-line react/prop-types
const RequireAuth_Role = ({ allowedRoles }) => {
    const role = useSelector(selectCurrentRole);

    // eslint-disable-next-line react/prop-types
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />

};

export default RequireAuth_Role;
