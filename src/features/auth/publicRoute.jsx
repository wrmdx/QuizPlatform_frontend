import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectCurrentRole} from "@/features/auth/authSlice.jsx";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
    const role = useSelector(selectCurrentRole) ;

        if (role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        } else if (role === 'manager') {
            return <Navigate to="/manager/dashboard" replace />;
        } else if (role === 'dev') {
            return <Navigate to="/dev" replace />;
        }
    return children;
};

export default PublicRoute;
