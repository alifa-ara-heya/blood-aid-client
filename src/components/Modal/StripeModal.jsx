import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../CheckoutForm/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
import PropTypes from 'prop-types';


const StripeModal = ({ refetch }) => {
    return (
        <dialog id="my_stripe_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>

                {/* checkout form */}
                <Elements stripe={stripePromise}>
                    {/* checkout form component */}
                    <CheckoutForm refetch={refetch} />
                </Elements>


                <div className="modal-action ">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};
StripeModal.propTypes = {
    refetch: PropTypes.func.isRequired, // Required function prop
};
export default StripeModal;