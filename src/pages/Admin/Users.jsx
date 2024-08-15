import { useEffect } from "react";
import { usersLoader } from "@/loaders/usersLoader.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import { DataTable } from "@/components/users/dataTable.jsx";
import { useGetUsersQuery } from "@/features/users/usersApiSlice";
import {columns} from "@/constants/users/columns"

const Users = () => {

    const { data: users, isLoading, isError } = useGetUsersQuery();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                await usersLoader();
            } catch (err) {
                console.error('Error loading users:', err);
            }
        };
        loadUsers();
    },[]);

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
