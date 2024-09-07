import { useCallback } from "react";
import {
    useGetQuizzesQuery,
    useGetQuizzesBySkillQuery,
    useSearchQuizzesByTitleQuery,
    useGetQuizzesByDifficultyQuery,
} from "@/features/quizzes/quizzesApiSlice";

export const useQuizzes = ({ queryParams, setQueryParams, selectedSkill, debouncedTitleFilter, difficultyFilter }) => {
    const { data: allQuizzesData, isLoading: isLoadingAllQuizzes, isError: isErrorAllQuizzes } =
        useGetQuizzesQuery(queryParams, { skip: !!selectedSkill || !!debouncedTitleFilter || !!difficultyFilter });

    const { data: filteredBySkillData, isLoading: isLoadingFilteredBySkill, isError: isErrorFilteredBySkill } =
        useGetQuizzesBySkillQuery({ ...queryParams, skill: selectedSkill }, { skip: !selectedSkill || !!debouncedTitleFilter || !!difficultyFilter });

    const { data: searchedByTitleData, isLoading: isLoadingSearchByTitle, isError: isErrorSearchByTitle } =
        useSearchQuizzesByTitleQuery({ ...queryParams, title: debouncedTitleFilter }, { skip: !debouncedTitleFilter || !!selectedSkill || !!difficultyFilter });

    const { data: filteredByDifficultyData, isLoading: isLoadingFilteredByDifficulty, isError: isErrorFilteredByDifficulty } =
        useGetQuizzesByDifficultyQuery({ ...queryParams, difficulty: difficultyFilter }, { skip: !difficultyFilter || !!selectedSkill || !!debouncedTitleFilter });

    const data = debouncedTitleFilter ? searchedByTitleData :
        (selectedSkill ? filteredBySkillData :
            (difficultyFilter ? filteredByDifficultyData : allQuizzesData));

    const isLoading = isLoadingSearchByTitle || isLoadingFilteredBySkill || isLoadingFilteredByDifficulty || isLoadingAllQuizzes;
    const isError = isErrorSearchByTitle || isErrorFilteredBySkill || isErrorFilteredByDifficulty || isErrorAllQuizzes;

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