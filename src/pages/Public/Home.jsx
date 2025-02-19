import AboutUs from "../../components/Home/AboutUs";
import Banner from "../../components/Home/Banner";
import ContactUs from "../../components/Home/ContactUs";
import FeaturedBlogs from "../../components/Home/FeaturedBlogs";
import LatestRequests from "../../components/Home/LatestRequests";
import Newsletter from "../../components/Home/Newsletter";
import OurImpact from "../../components/Home/OurImpact";
import Reviews from "../../components/Home/Reviews";
import ToggleTheme from "../../components/Home/ToggleTheme";

const Home = () => {
    return (
        <div>
            <ToggleTheme />
            <Banner />
            <AboutUs />
            <OurImpact />
            <FeaturedBlogs />
            <Reviews />
            <LatestRequests />
            <ContactUs />
            <Newsletter />
        </div>
    );
};

export default Home;