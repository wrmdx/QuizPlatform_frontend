import Spinner from "@/components/ui/Spinner.jsx";
import { DataTable } from "@/components/users/dataTable.jsx";
import {columns} from "@/constants/quizzes/columns.jsx"
import {useGetQuizzesQuery} from "@/features/quizzes/quizzesApiSlice.jsx";

const Quiz = () => {

    const { data: users, isLoading, isError, isSuccess } = useGetQuizzesQuery();

    if(isSuccess){
        console.log("Fetching quizzes from query done")

    }
    if (isLoading) return (
        <div className="flex w-screen justify-center items-center">
            <Spinner />
        </div>
    );

    if (isError) return <div className="text-red-500">Failed to load quizzes.</div>;

    return (
        <div className="w-screen p-4">
            <DataTable
                columns={columns}
                data={users}
            />
        </div>
    );
};

export default Quiz;
