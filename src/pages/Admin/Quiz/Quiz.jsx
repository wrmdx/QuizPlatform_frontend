import { useState, useEffect } from "react";
import Spinner from "@/components/ui/Spinner.jsx";
import { DataTable } from "@/components/users/dataTable.jsx";
import { columns } from "@/constants/quizzes/columns.jsx";
import { DifficultyFilter } from "@/components/quizzes/DifficultyFilter.jsx";
import { TitleFilter } from "@/components/quizzes/TitleFilter.jsx";
import { SkillFilter } from "@/components/quizzes/SkillFilter.jsx";
import { useQuizzes } from '@/hooks/useQuizzes.jsx';
import { useDebouncedValue } from "@/hooks/useDebouncedValue.jsx";
import {AddQuizLink} from "@/components/quizzes/AddQuizLink.jsx";

const Quiz = () => {

    const [queryParams, setQueryParams] = useState({ page: 1, per_page: 6 });
    const [selectedSkill, setSelectedSkill] = useState("");
    const [titleFilter, setTitleFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const debouncedTitleFilter = useDebouncedValue(titleFilter, 1500);

    const { data, isLoading, isError, handlePaginationChange } = useQuizzes({
        queryParams,
        setQueryParams,
        selectedSkill,
        debouncedTitleFilter,
        difficultyFilter,
    });

    useEffect(() => {
        setQueryParams((prev) => ({
            ...prev,
            page: 1,
        }));
    }, [debouncedTitleFilter, selectedSkill, difficultyFilter]);

    const handleSkillChange = (value) => {
        setSelectedSkill(value);
        setTitleFilter("");
        setDifficultyFilter("");
    };

    const handleTitleFilterChange = (value) => {
        setTitleFilter(value);
        setSelectedSkill("");
        setDifficultyFilter("");
    };

    const handleDifficultyFilterChange = (value) => {
        setDifficultyFilter(value);
        setSelectedSkill("");
        setTitleFilter("");
    };


    return (
        <div className="w-screen p-4">
            <div className="flex justify-between mb-4">
                <div className="flex space-x-4">
                    <DifficultyFilter value={difficultyFilter} onChange={handleDifficultyFilterChange}/>
                    <SkillFilter value={selectedSkill} onChange={handleSkillChange}/>
                    <TitleFilter value={titleFilter} onChange={handleTitleFilterChange}/>
                </div>
                <div>
                    <AddQuizLink/>
                </div>
            </div>
            {isLoading ? (
                <div className="flex w-full justify-center items-center">
                    <Spinner />
                </div>
            ) : isError ? (
                <div className="text-red-500">Failed to load questions.</div>
            ) : (
                <>
                    <DataTable
                        columns={columns}
                        data={data?.data || []}
                        pagination={data ? {
                            pageIndex: data.current_page,
                            pageSize: data.per_page,
                            pageCount: data.last_page,
                            canNextPage: !!data.next_page_url,
                            canPreviousPage: !!data.prev_page_url,
                        } : {}}
                        onPaginationChange={handlePaginationChange}
                    />
                    <div className="flex justify-end mt-4">
                        <p className="text-white bg-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Total: {data?.total || 0}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Quiz;