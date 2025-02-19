

const AboutUs = () => {
    return (
        <section className="relative bg-gradient-to-r from-yellow-200 to-red-300 py-16 my-8 xl:my-12 px-8" data-aos='fade-up'>
            {/* Decorative Shape */}
            <div
                className="absolute top-0 left-0 w-full h-full z-0"
                style={{
                    clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0 100%)",
                    background: "linear-gradient(135deg, #BE123C, #C71A42)", // Red gradient
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto text-center text-gray-200">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-100">
                    About Us
                </h2>
                <p className=" mb-8 w-full md:w-3/4 mx-auto">
                    At <strong>Blood Aid</strong>, our mission is to save lives by
                    connecting blood donors with those in need. We aim to simplify the
                    donation process and create a seamless, impactful experience for our
                    community.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Mission Card */}
                    <div className="bg-white dark:bg-cyan-700 rounded-lg shadow-md p-6 dark:text-white">
                        <h3 className="text-2xl font-bold text-blue-600 dark:text-white mb-4">Our Mission</h3>
                        <p className='text-gray-600 dark:text-white'>
                            To ensure a reliable, accessible blood donation network, bringing
                            hope and saving lives through efficient technology.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 dark:bg-cyan-700 ">
                        <h3 className="text-2xl font-bold text-green-600 mb-4 dark:text-white">Our Vision</h3>
                        <p className='text-gray-600 dark:text-white'>
                            A world where no life is lost due to a shortage of blood. We strive
                            for a healthier, safer future for everyone.
                        </p>
                    </div>

                    {/* Values Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 dark:bg-cyan-700 ">
                        <h3 className="text-2xl font-bold text-red-600 mb-4 dark:text-white">Our Values</h3>
                        <p className='text-gray-600 dark:text-white'>
                            Compassion, integrity, and innovation drive us to support
                            communities and create a life-saving impact.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
