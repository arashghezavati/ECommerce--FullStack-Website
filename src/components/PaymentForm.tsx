// 'use client'

// import React, { useState } from 'react'
// import { loadStripe } from '@stripe/stripe-js'
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js'

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
// )

// const PaymentForm = () => {
//   const stripe = useStripe()
//   const elements = useElements()
//   const [error, setError] = useState<string | null>(null)

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault()

//     if (!stripe || !elements) {
//       return
//     }

//     const cardElement = elements.getElement(CardElement)
//     if (!cardElement) return

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     })

//     if (error) {
//       setError(error.message || 'An unknown error occurred')
//       return
//     }

//     const response = await fetch('/api/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         amount: 50.0,
//         paymentMethodId: paymentMethod.id,
//         orderData: {
//           lineItems: [
//             {
//               variantId: 'gid://shopify/ProductVariant/44060494594245',
//               quantity: 1,
//             },
//           ],
//         },
//       }),
//     })

//     const paymentResponse = await response.json()

//     if (paymentResponse.error) {
//       setError(paymentResponse.error)
//     } else {
//       console.log('Payment successful!', paymentResponse)
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto space-y-6"
//     >
//       <h2 className="text-2xl font-semibold text-gray-800 text-center">
//         Payment Details
//       </h2>
//       <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
//         <CardElement className="p-4 bg-white border rounded-md shadow-sm" />
//       </div>
//       {error && <div className="text-red-500 text-sm">{error}</div>}
//       <button
//         type="submit"
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
//         disabled={!stripe}
//       >
//         Pay
//       </button>
//     </form>
//   )
// }

// const Payment = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm />
//   </Elements>
// )

// export default Payment
'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface PaymentFormProps {
  amount: number;
  variantId: string;
}

const PaymentForm = ({ amount, variantId }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message || 'An unknown error occurred');
      return;
    }

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount, // Dynamic amount from the product
        paymentMethodId: paymentMethod.id,
        orderData: {
          lineItems: [
            {
              variantId: variantId, // Dynamically passed variant ID
              quantity: 1,
            },
          ],
        },
      }),
    });

    const paymentResponse = await response.json();

    if (paymentResponse.error) {
      setError(paymentResponse.error);
    } else {
      console.log('Payment successful!', paymentResponse);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Payment Details
      </h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <CardElement className="p-4 bg-white border rounded-md shadow-sm" />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
        disabled={!stripe}
      >
        Pay ${amount}
      </button>
    </form>
  );
};

const Payment = ({ amount, variantId }: PaymentFormProps) => (
  <Elements stripe={stripePromise}>
    <PaymentForm amount={amount} variantId={variantId} />
  </Elements>
);

export default Payment;
