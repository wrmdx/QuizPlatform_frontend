import { store } from '@/store/store';
import { setQuestions } from '@/features/questions/questionsSlice';
import { setResponses } from '@/features/responses/responsesSlice';
import { questionsApiSlice } from '@/features/questions/questionsApiSlice';
import { responsesApiSlice } from "@/features/responses/responsesApiSlice";


export const QALoader = async (searchQuery) => {
    try {
        const questionsResult = await store.dispatch(
            questionsApiSlice.endpoints.searchQuestions.initiate(searchQuery)
        );
        if (questionsResult.error) {
            throw new Error('Failed to load questions');
        }

        const questions = questionsResult.data ;
        store.dispatch(setQuestions(questions));

        const allResponses = {}

        for(const question of questions){
            const responsesResult  = await store.dispatch(
                responsesApiSlice.endpoints.getResponses.initiate(question.id)
            );
            if (!responsesResult.error) {
                // Store responses corresponding to each question's ID
                allResponses[question.id] = responsesResult.data;
            }
        }
        store.dispatch(setResponses(allResponses));


    }
    catch (error){
        console.error('Error loading Q&A Data : ',error)
    }
};
