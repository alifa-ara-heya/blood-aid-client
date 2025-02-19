import PropTypes from 'prop-types';

const Heading = ({ title, subtitle, color }) => {
    return (
        <div className={`text-center px-2 text-${color}`} data-aos='fade-in'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-primary'>
                {title}
            </h1>
            <p className='font-medium w-full md:w-1/2 lg:w-1/3 mx-auto opacity-65 border-b pb-3 capitalize  border-b-gray-500 '>
                {subtitle}
            </p>

        </div>
    );
};


Heading.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};


export default Heading;