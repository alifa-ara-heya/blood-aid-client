// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web


import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import './CheckoutForm.css'
import { BiSolidDonateHeart } from 'react-icons/bi';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/UseAuth';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CheckoutForm = ({ refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // getPaymentIntent()
  }, [clientSecret]);

  const handleAmountChange = e => {
    setAmount(e.target.value);
  }

  // console.log(clientSecret);

  const getPaymentIntent = async () => {
    if (!amount || isNaN(amount)) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid amount.',
        icon: 'error',
        position: 'top-end',
        showConfirmButton: true, // Requires the user to click "OK"
      });
      return;
    }

    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        amount,
        name: user?.displayName,
        email: user?.email
      });
      setClientSecret(data.clientSecret)
      Swal.fire({
        title: 'Success',
        text: 'Payment intent created. Please proceed to payment.',
        icon: 'success',
        position: 'top-end',
        showConfirmButton: true, // Requires the user to click "OK"
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to initialize payment. Please try again.',
        icon: 'error',
        position: 'top-end',
        showConfirmButton: true, // Requires the user to click "OK"
      });
    }
  }


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      Swal.fire({
        title: 'Error',
        text: 'Stripe.js has not initialized yet.',
        icon: 'error',
        position: 'top-end',
        showConfirmButton: true, // Requires the user to click "OK"
      });
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid payment method. Please check again.',
        icon: 'error',
        position: 'top-end',
        showConfirmButton: true, // Requires the user to click "OK"
      });
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        }
      }
    });

    if (error) {
      // console.log("Payment error:", error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'Failed to process payment.',
        icon: 'error',
        position: 'top-end',
        showConfirmButton: true, // Requires the user to click "OK"
      });

    } else if (paymentIntent.status === "succeeded") {
      Swal.fire({
        title: 'Success',
        text: 'Payment successful!',
        icon: 'success',
        position: 'top-end',
        showConfirmButton: true, // Requires the user to click "OK"
      });

      //saving data in db after successful payment

      const fundingDetails = {
        name: user?.displayName,
        email: user?.email,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      };

      await axiosSecure.post('/save-funding', fundingDetails)
      // Optionally, you can log paymentIntent or update your UI.
      console.log("Payment Intent:", paymentIntent);
      setClientSecret(""); // Reset clientSecret after successful payment
      refetch();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          className='input input-bordered'
          placeholder='Payment amount'
          name='amount'
          value={amount}
          onChange={handleAmountChange} />

        <button
          type="button"
          className="btn btn-secondary mt-3 text-black ml-4"
          onClick={getPaymentIntent}
        >
          Initialize Payment
        </button>

        {clientSecret && (
          <>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button
              className="btn btn-primary text-lg mt-4"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              Pay <BiSolidDonateHeart />
            </button>
          </>
        )}
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  refetch: PropTypes.func // Required function prop
};

export default CheckoutForm;