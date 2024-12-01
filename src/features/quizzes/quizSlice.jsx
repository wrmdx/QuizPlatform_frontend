import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        questions: [],
        currentQuestionIndex: 0,
        selectedAnswers: {},
        timeLeft: 0,
        isQuizActive: true
    },
    reducers: {
        setQuestions: (state, action) => {
            console.log('Setting questions:', action.payload);
            state.questions = action.payload;
            if (action.payload.length > 0) {
                state.timeLeft = action.payload[0].question.duration;
                state.isQuizActive = true;
            }
            console.log('Updated state:', state);
        },
        setCurrentQuestionIndex: (state, action) => {
            state.currentQuestionIndex = action.payload;
            if (state.questions[action.payload]) {
                state.timeLeft = state.questions[action.payload].question.duration;
            }
        },
        setSelectedAnswer: (state, action) => {
            state.selectedAnswers[state.currentQuestionIndex] = action.payload;
        },
        decrementTimeLeft: (state) => {
            if (state.timeLeft > 0) {
                state.timeLeft -= 1;
            }
        },
        endQuiz: (state) => {
            state.isQuizActive = false;
        }
    }
});

export const {
    setQuestions,
    setCurrentQuestionIndex,
    setSelectedAnswer,
    decrementTimeLeft,
    endQuiz
} = quizSlice.actions;

export default quizSlice.reducer;