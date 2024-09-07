import {Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";
import {selectCurrentRole} from "@/features/auth/authSlice.jsx";
import PropTypes from "prop-types";

const RequireAuthRole = ({ allowedRoles }) => {
    const role = useSelector(selectCurrentRole);

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />

};

RequireAuthRole.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RequireAuthRole;
