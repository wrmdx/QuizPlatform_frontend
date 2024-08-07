import HttpService from '@/services/HttpService';

export const authLoader = async () => {
    try {
        const response = await HttpService.get('/auth/check');
        return response;
    } catch (error) {
        console.error('Authentication check failed', error);
        return null;
    }
};
