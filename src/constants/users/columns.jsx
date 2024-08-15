import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown} from "lucide-react";
import {EditUserSheet} from "@/components/users/EditUserSheet.jsx"
import {DeleteUserSheet} from "@/components/users/DeleteUserSheet.jsx"


export const columns = [
    {
        accessorKey: "id",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
    },
    {
        accessorKey: "first_name",
        header: "First Name",
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
    },
    {
        accessorKey: "role",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Role
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
    },
    {
        accessorKey: "email",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
    },
    {
        id: "action",
        header: "Action",
        cell: ({row}) => (
            <div className="flex space-x-2">
                <EditUserSheet
                    id={row.original.id}
                    firstName={row.original.first_name}
                    lastName={row.original.last_name}
                    email={row.original.email}
                />
                <DeleteUserSheet id={row.original.id}/>
            </div>
        ),
    }
];

