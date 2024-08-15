import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

function Navmenu({ routes }) {
    const { pathname } = useLocation();
    const menu = routes.map(({ url, name, icon }, index) => {
        return (
            <Link key={index} to={url}>
                <Button
                    className="w-full inline-flex justify-start"
                    variant={pathname === url ? "default" : "ghost"}
                >
                    {icon} {name}
                </Button>
            </Link>
        );
    });

    return <div className="flex flex-col gap-1">{menu}</div>;
}

export default Navmenu;
