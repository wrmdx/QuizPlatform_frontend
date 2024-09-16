import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.jsx";
import {Link} from "react-router-dom";


export const BreadCrumb = ({ route, role , origin  , action , action_text}) => {
    return (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to={`/${role}/${route}`}>{origin}</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                {action} {action_text}
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
    );
}