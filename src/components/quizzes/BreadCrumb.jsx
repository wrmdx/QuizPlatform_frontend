import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.jsx";
import {Link} from "react-router-dom";


export const BreadCrumb = ({ route, role , text  , action}) =>{
    return (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to={`/${role}/${route}`}>{text}</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                {action} {text}
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
    );
}