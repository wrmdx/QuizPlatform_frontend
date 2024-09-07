import {Button}  from "@/components/ui/button.jsx";

export const Pagination = ({ pagination, onPaginationChange }) => {
    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPaginationChange('prev')}
                disabled={!pagination.canPreviousPage}
            >
                Previous
            </Button>
            <span>
                Page {pagination.pageIndex} of {pagination.pageCount}
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPaginationChange('next')}
                disabled={!pagination.canNextPage}
            >
                Next
            </Button>
        </>
    );
};


