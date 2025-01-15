
const SignUpFooter = () => {
    return (
        <footer className="bg-rose-700 text-white py-6">
            <div className="container mx-auto px-4 text-center">
                <blockquote className="text-lg italic font-semibold border-l-2 xl:border-none border-white pl-4 xl:-ml-4">
                    &quot;A single pint of blood can save three lives. A single gesture of kindness can create endless hope.&quot;
                </blockquote>
                <p className="mt-4 text-sm">
                    © {new Date().getFullYear()} Blood Aid. Saving lives, one drop at a time.
                </p>
            </div>
        </footer>
    );
};

export default SignUpFooter;