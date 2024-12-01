import {Outlet, useLocation} from "react-router-dom";
import SideBar from "@/components/ui/sideBar.jsx";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "@/features/auth/authSlice.jsx";


const Layout = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation() ;
    const isPage = (path) => location.pathname === path;

    const showSidebar = token && !isPage('/dev/test') && !isPage('/dev/conditions');
    return (
        <div className="flex h-screen">
            {showSidebar && <SideBar className="flex-none w-1/5"/>}
            <Outlet classname="flex-grow w-screen"/>
        </div>
    );
}

export default Layout