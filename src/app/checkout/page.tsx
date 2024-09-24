// import React from 'react'
// import PaymentForm from '@/components/PaymentForm'

// const CheckoutPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <h1 className="text-3xl font-extrabold text-gray-900 text-center">
//           Checkout
//         </h1>
//         <p className="text-center text-gray-600">
//           Please enter your payment details below.
//         </p>
//         <PaymentForm />
//       </div>
//     </div>
//   )
// }

// export default CheckoutPage
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentForm from '@/components/PaymentForm';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [variantId, setVariantId] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const variantIdParam = searchParams.get('variantId');
    const priceParam = searchParams.get('price');
    
    // Log the variantId and price to check if they are being captured correctly
    console.log('Checkout variantId:', variantIdParam);
    console.log('Checkout price:', priceParam);

    if (variantIdParam && priceParam) {
      setVariantId(variantIdParam);
      setPrice(parseFloat(priceParam));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          Checkout
        </h1>
        <p className="text-center text-gray-600">
          You are purchasing Product Variant ID: {variantId} for ${price}
        </p>
        {/* Pass the variantId and price to the PaymentForm */}
        <PaymentForm variantId={variantId} amount={price} />
      </div>
    </div>
  );
}
