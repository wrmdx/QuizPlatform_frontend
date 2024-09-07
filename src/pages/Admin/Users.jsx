import { useState, useEffect } from "react";
import Spinner from "@/components/ui/Spinner.jsx";
import { DataTable } from "@/components/users/dataTable.jsx";
import { AddUserForm } from "@/components/users/AddUserForm.jsx";
import { EmailFilter } from "@/components/users/EmailFilter.jsx";
import { RoleSelect } from "@/components/users/RoleSelect.jsx";
import { useUsers } from '@/hooks/useUsers.jsx';
import { columns } from '@/constants/users/columns.jsx';
import {useDebouncedValue} from "@/hooks/useDebouncedValue.jsx";


const Users = () => {

    const [queryParams, setQueryParams] = useState({ page: 1, per_page: 6 });
    const [selectedRole, setSelectedRole] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const debouncedEmailFilter = useDebouncedValue(emailFilter, 1000);


    const { data, isLoading, isError, handlePaginationChange } = useUsers({
        queryParams,
        setQueryParams,
        selectedRole,
        debouncedEmailFilter,
    });

    useEffect(() => {
        setQueryParams((prev) => ({
            ...prev,
            page: 1,
        }));
    }, [debouncedEmailFilter, selectedRole]);

    const handleRoleChange = (value) => {
        setSelectedRole(value);
        setEmailFilter("");
    };

    const handleEmailFilterChange = (value) => {
        setEmailFilter(value);
        setSelectedRole("");
    };

    return (
        <div className="w-screen p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                    <EmailFilter value={emailFilter} onChange={handleEmailFilterChange}/>
                    <RoleSelect value={selectedRole} onChange={handleRoleChange}/>
                </div>
                <AddUserForm/>
            </div>
            {isLoading ? (
                <div className="flex w-full justify-center items-center">
                    <Spinner />
                </div>
            ) : isError ? (
                <div className="text-red-500">Failed to load questions.</div>
            ) : (
                <>
                    <DataTable
                        columns={columns}
                        data={data?.data || []}
                        pagination={data ? {
                            pageIndex: data.current_page,
                            pageSize: data.per_page,
                            pageCount: data.last_page,
                            canNextPage: !!data.next_page_url,
                            canPreviousPage: !!data.prev_page_url,
                        } : {}}
                        onPaginationChange={handlePaginationChange}
                    />
                    <div className="flex justify-end mt-4">
                        <p className=" text-white bg-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                            Total : {data.total || 0}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Users;
