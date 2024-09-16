import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown} from "lucide-react";
import {DeleteQuizSheet} from "@/components/quizzes/DeleteQuizSheet.jsx";
import {Link} from 'react-router-dom'
import EditQuizDialog from "@/components/quizzes/EditQuizDialog.jsx";



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
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "difficulty",
        header: "Quiz Difficulty",
    },
    {
        accessorKey: "skill",
        header: "Skill"
    },
    {
        accessorFn: (row) => `${row.creator.first_name} ${row.creator.last_name}`,
        id: "creatorName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Creator
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        id: "action",
        header: "Action",
        cell: ({row}) => (
            <div className="flex space-x-2">
                <Link
                    to={{pathname: `assign_qa`,
                        search: `?id=${row.original.id}&name=${row.original.title}`}}
                >
                    <Button variant="ghost" className="text-blue-500 hover:text-white hover:bg-blue-500">
                        Assign Questions
                    </Button>
                </Link>
                <Link to={`view_qa/${row.original.id}`}>
                    <Button variant="ghost" className="text-blue-500 hover:text-white hover:bg-blue-500">
                        View Questions
                    </Button>
                </Link>
                <EditQuizDialog
                    id = {row.original.id}
                    title = {row.original.title}
                />
                <DeleteQuizSheet id={row.original.id}/>
            </div>
        ),
    }
];

