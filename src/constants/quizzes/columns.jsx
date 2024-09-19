import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown} from "lucide-react";
import {DeleteQuizSheet} from "@/components/quizzes/DeleteQuizSheet.jsx";
import {Link} from 'react-router-dom'
import EditQuizDialog from "@/components/quizzes/EditQuizDialog.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast.js";
import QuestionsButton from "@/components/quizzes/QuestionsButton.jsx";


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
        accessorKey: "token",
        header: "Token"
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
                <QuestionsButton
                    action="Assign"
                    path="assign_qa"
                    quizId={row.original.id}
                    quizTitle = {row.original.title}
                />
                <QuestionsButton
                    action="View"
                    path="view_qa"
                    quizId={row.original.id}
                    quizTitle = {row.original.title}
                />
                <EditQuizDialog
                    id = {row.original.id}
                    title = {row.original.title}
                />
                <DeleteQuizSheet id={row.original.id}/>
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const quiz = row.original
            const { toast } = useToast();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(quiz.token);
                                    toast({
                                        description: "Token copied to clipboard!",
                                    });
                                } catch (err) {
                                    console.error("Failed to copy token:", err);
                                    toast({
                                        title: "Error",
                                        description: "Failed to copy token.",
                                        variant: "destructive",
                                    });
                                }
                            }}
                        >
                            Copy token
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

