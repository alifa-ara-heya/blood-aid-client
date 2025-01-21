

import Heading from './../components/Shared/Heading';

import { BiSolidDonateHeart } from 'react-icons/bi';
import StripeModal from '../components/Modal/StripeModal';

const Funding = () => {

    return (
        <div className='w-11/12 mx-auto'>
            <Heading title={'Funding'} />

            <div className='text-center my-10'>
                <button onClick={() => document.getElementById('my_stripe_modal').showModal()} className='btn btn-primary text-lg'>Give Fund <BiSolidDonateHeart /></button>
            </div>
            <StripeModal />



        </div>
    );
};

export default Funding;