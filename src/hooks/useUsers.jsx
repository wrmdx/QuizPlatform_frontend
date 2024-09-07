import {  useCallback } from "react";
import {
    useGetUsersQuery,
    useGetUsersByRoleQuery,
    useGetUsersByEmailQuery,
} from "@/features/users/usersApiSlice";

export const useUsers = ({ queryParams, setQueryParams, selectedRole, debouncedEmailFilter }) => {

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
        [data, setQueryParams]
    );


    return { data, isLoading, isError, handlePaginationChange };
};

