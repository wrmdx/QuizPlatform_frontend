import { useCallback } from 'react';
import { useGetQuestionsQuery, useSearchQuestionsQuery } from "@/features/questions/questionsApiSlice.jsx";

export function useQA({ queryParams, setQueryParams, searchQuery }) {


    const { data: allQuestionsData, isLoading: isLoadingAllQuestions, isError: isErrorAllQuestions }
        = useGetQuestionsQuery(queryParams, { skip: !!searchQuery });

    const { data: searchQuestionsData, isLoading: isLoadingSearchQuestions, isError: isErrorSearchQuestions }
        = useSearchQuestionsQuery({ search: searchQuery, ...queryParams }, { skip: !searchQuery });

    const data = searchQuery ? searchQuestionsData : allQuestionsData;
    const isLoading = isLoadingAllQuestions || isLoadingSearchQuestions;
    const isError = isErrorSearchQuestions || isErrorAllQuestions;

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

    return {
        data,
        isLoading,
        isError,
        handlePaginationChange,
    };
}
