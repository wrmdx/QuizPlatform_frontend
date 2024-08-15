import {Outlet} from "react-router-dom";
import SideBar from "@/components/ui/sideBar.jsx";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "@/features/auth/authSlice.jsx";


const Layout = () => {
    const token = useSelector(selectCurrentToken);
    return (
        <div className="flex h-screen">
            {token && <SideBar className="flex-none w-1/5"/>}
            <Outlet classname="flex-grow w-screen"/>
        </div>
    );
}

export default Layout