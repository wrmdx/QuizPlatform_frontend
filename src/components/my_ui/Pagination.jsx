import {Button}  from "@/components/ui/button.jsx";

export const Pagination = ({ pagination, onPaginationChange }) => {
    return (
        <section className="mr-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPaginationChange('prev')}
                disabled={!pagination.canPreviousPage}
            >
                Previous
            </Button>
            <span className="mx-3">
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
        </section>
    );
};


