import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const { state } = location;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Error</h1>
            <p className="mt-4 text-xl">{state?.message || 'An unexpected error occurred.'}</p>
        </div>
    );
};

export default ErrorPage;
