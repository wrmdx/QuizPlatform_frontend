import { store } from '@/store/store';
import { setUsers } from '@/features/users/usersSlice';
import { usersApiSlice } from "@/features/users/usersApiSlice.jsx";

export const usersLoader = async () => {
    try {
        const result = await store.dispatch(
            usersApiSlice.endpoints.getUsers.initiate()
        );
        if (result.error) {
            throw new Error('Failed to load users');
        }
        store.dispatch(setUsers(result.data));
    } catch (error) {
        console.error('Error loading users:', error);
        throw error;
    }
};
