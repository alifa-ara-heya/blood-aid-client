
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    console.error(error); // Log the error for debugging

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
            <p className="text-lg mt-4">
                Sorry, an unexpected error has occurred.
            </p>
            <p className="text-sm mt-2 text-gray-500">
                <i>{error.statusText || error.message}</i>
            </p>
            <a
                href="/"
                className="mt-6 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
            >
                Go Back Home
            </a>
        </div>
    );
};

export default ErrorPage;
