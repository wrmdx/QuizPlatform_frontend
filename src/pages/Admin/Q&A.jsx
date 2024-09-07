import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input.jsx";
import QA_Card from "@/components/q&a/Q&A_Card.jsx";
import { AddQuestionForm } from "@/components/q&a/AddQuestionForm.jsx";
import { useDebouncedValue } from "@/hooks/useDebouncedValue.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import { useQA } from "@/hooks/useQA.jsx";

const QA = () => {

    const [queryParams, setQueryParams] = useState({ page: 1, per_page: 10 });
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 1000);

    const {  data, isLoading, isError, handlePaginationChange } = useQA({
        queryParams,
        setQueryParams,
        searchQuery : debouncedSearchQuery,
    });

    useEffect(() => {
        setQueryParams((prev) => ({
            ...prev,
            page: 1,
        }));
    }, [debouncedSearchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (isError) {
        return <div className="text-red-500">Failed to load questions.</div>;
    }

    return (
        <div className="w-screen p-6 h-screen flex flex-col">
            <div className="flex space-x-2">
                <Input
                    type="text"
                    placeholder="Search for questions..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border rounded"
                />
                <AddQuestionForm/>
            </div>
            <section
                id="qa_card"
                className="mt-4 flex-1 overflow-y-auto"
            >
                {isLoading ? (
                    <div className="flex w-full justify-center items-center">
                        <Spinner />
                    </div>
                ) : isError ? (
                    <div className="text-red-500">Failed to load questions.</div>
                ) : (
                    <>
                        <QA_Card
                            data={data}
                            pagination={
                                data
                                    ? {
                                        pageIndex: data.current_page,
                                        pageSize: data.per_page,
                                        pageCount: data.last_page,
                                        canNextPage: !!data.next_page_url,
                                        canPreviousPage: !!data.prev_page_url,
                                    }
                                    : {}
                            }
                            onPaginationChange={handlePaginationChange}
                        />
                        <div className="flex justify-end mt-4">
                            <p className="text-white bg-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Total: {data?.total || 0}
                            </p>
                        </div>
                    </>
                )}
            </section>
        </div>

    );
}

export default QA ;

