
import { useQuery } from '@tanstack/react-query';
import Heading from './../components/Shared/Heading';

import { BiSolidDonateHeart } from 'react-icons/bi';
import StripeModal from '../components/Modal/StripeModal';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Funding = () => {
    const axiosSecure = useAxiosSecure();

    const { data: funds = [], refetch } = useQuery({
        queryKey: ['fundings'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/fundings`);
            return data;
        },
    });
    console.log(funds.length);

    return (
        <div className='w-11/12 mx-auto mt-5'>
            <Heading title={'Funding'} />

            <div className='text-center my-10'>
                <button onClick={() => document.getElementById('my_stripe_modal').showModal()} className='btn btn-primary text-lg'>Give Fund <BiSolidDonateHeart /></button>
            </div>
            <StripeModal refetch={refetch} />

            {/* fundings */}
            <span className='divider'></span>
            <div className="overflow-x-auto my-8">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>AMOUNT (USD)</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {funds.map((fund, index) => <tr key={fund._id}>
                            <th>{index + 1}</th>
                            <td>{fund.name}</td>
                            <td>{fund.amount}</td>
                            <td>{new Date(fund.date).toLocaleDateString()}</td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Funding;