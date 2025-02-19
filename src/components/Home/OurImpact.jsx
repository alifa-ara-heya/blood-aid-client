const OurImpact = () => {
    return (
        <section className="relative py-16 bg-gradient-to-r from-red-200 via-white to-red-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 my-8 xl:my-12 px-8" data-aos='fade-up'>
            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto text-center text-gray-800 dark:text-gray-100">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    Our Impact
                </h2>
                <p className="mb-8 w-full md:w-3/4 mx-auto text-gray-600 dark:text-gray-300">
                    Together, we are creating a world where no life is lost due to a shortage of blood. Here’s a look at the difference we’ve made through your generosity and support.
                </p>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {/* Stat Card 1 */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-300 dark:border-gray-700">
                        <h3 className="text-4xl font-bold text-red-600 dark:text-red-400">10,000+</h3>
                        <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Lives Saved</p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-300 dark:border-gray-700">
                        <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">15,000+</h3>
                        <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Blood Units Donated</p>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-300 dark:border-gray-700">
                        <h3 className="text-4xl font-bold text-green-600 dark:text-green-400">20+</h3>
                        <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Active Communities</p>
                    </div>
                </div>

                {/* Call-to-Action */}
                <div className="mt-12">
                    <button className="btn bg-gradient-to-r from-red-600 to-red-500 dark:from-red-500 dark:to-red-400 text-white px-8 py-4 rounded-full shadow-lg hover:from-red-500 hover:to-red-400 dark:hover:from-red-400 dark:hover:to-red-300 transition">
                        Join the Movement
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OurImpact;
