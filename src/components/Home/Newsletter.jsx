const Newsletter = () => {
    return (
        <section className="bg-red-50 dark:bg-gray-900 py-12 px-6 md:px-12 rounded-lg shadow-md text-center transition-all duration-500">
            <h2 className="text-2xl md:text-3xl font-bold text-red-700 dark:text-red-400">
                Stay Updated, Save Lives!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
                Subscribe to our newsletter for updates on blood donation camps and urgent requests.
            </p>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full md:w-1/2 px-4 py-2 border border-red-300 dark:border-gray-700 rounded-lg 
                    bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                    focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
                />
                <button className="bg-red-600 dark:bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition">
                    Subscribe
                </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                We respect your privacy. No spam, only important updates.
            </p>
        </section>
    );
};

export default Newsletter;
