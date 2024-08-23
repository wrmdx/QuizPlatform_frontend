import Spinner from "@/components/ui/Spinner.jsx";
import { DataTable } from "@/components/users/dataTable.jsx";
import { useGetUsersQuery } from "@/features/users/usersApiSlice";
import {columns} from "@/constants/users/columns"

const Users = () => {

    const { data: users, isLoading, isError, isSuccess } = useGetUsersQuery();

    if(isSuccess){
        console.log("Fetching users from query done")

    }
    if (isLoading) return (
        <div className="flex w-screen justify-center items-center">
            <Spinner />
        </div>
    );

    if (isError) return <div className="text-red-500">Failed to load users.</div>;

    return (
        <div className="w-screen p-4">
            <DataTable
                columns={columns}
                data={users}
            />
        </div>
    );
};

export default Users;
