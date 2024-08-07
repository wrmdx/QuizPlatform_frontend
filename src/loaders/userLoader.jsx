import HttpService from '@/services/HttpService';

export const userLoader = async ({ params }) => {
    try {
        const response = await HttpService.get(`/users/${params.userId}`);
        return response;
    } catch (error) {
        console.error('Failed to fetch user data', error);
        return null;
    }
};
