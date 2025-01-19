import { useParams } from "react-router-dom";
import Heading from "../../components/Shared/Heading";

const UpdateDonation = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            <Heading title={'Update Donation Request'} subtitle={'Thank you for being a hero and saving lives through your selfless donations. Your generosity brings hope and strength to those in need—thank you for making a difference!'} />
        </div>
    );
};

export default UpdateDonation;