import HttpService from '@/services/HttpService';

export const quizLoader = async ({ params }) => {
    try {
        const response = await HttpService.get(`/quiz/${params.quizId}`);
        return response;
    } catch (error) {
        console.error('Failed to fetch quiz data', error);
        return null;
    }
};
