import { useState, useEffect, useCallback } from "react";
import {
    useGetUsersQuery,
    useGetUsersByRoleQuery,
    useGetUsersByEmailQuery,
} from "@/features/users/usersApiSlice";

const useUsersData = ({ queryParams, selectedRole, debouncedEmailFilter }) => {
    const [pagination, setPagination] = useState(null);

    const { data: allUsersData, isLoading: isLoadingAllUsers, isError: isErrorAllUsers } =
        useGetUsersQuery(queryParams, { skip: !!selectedRole || !!debouncedEmailFilter });
    const { data: filteredUsersData, isLoading: isLoadingFilteredUsers, isError: isErrorFilteredUsers } =
        useGetUsersByRoleQuery({ ...queryParams, roleName: selectedRole }, { skip: !selectedRole || !!debouncedEmailFilter });
    const { data: searchedUsersData, isLoading: isLoadingSearchUsers, isError: isErrorSearchUsers } =
        useGetUsersByEmailQuery({ ...queryParams, email: debouncedEmailFilter }, { skip: !debouncedEmailFilter });

    const data = debouncedEmailFilter ? searchedUsersData : (selectedRole ? filteredUsersData : allUsersData);
    const isLoading = isLoadingSearchUsers || isLoadingFilteredUsers || isLoadingAllUsers;
    const isError = isErrorSearchUsers || isErrorFilteredUsers || isErrorAllUsers;

    const handlePaginationChange = useCallback(
        (direction) => {
            if (direction === 'next' && data?.next_page_url) {
                setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
            } else if (direction === 'prev' && data?.prev_page_url) {
                setQueryParams((prev) => ({ ...prev, page: prev.page - 1 }));
            }
        },
        [data]
    );

    useEffect(() => {
        if (data) {
            setPagination({
                pageIndex: data.current_page,
                pageSize: data.per_page,
                pageCount: data.last_page,
                canNextPage: !!data.next_page_url,
                canPreviousPage: !!data.prev_page_url,
            });
        }
    }, [data]);

    return { data, isLoading, isError, handlePaginationChange, pagination };
};

export default useUsersData;