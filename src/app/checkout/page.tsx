import React from 'react'
import PaymentForm from '@/components/PaymentForm'

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          Checkout
        </h1>
        <p className="text-center text-gray-600">
          Please enter your payment details below.
        </p>
        <PaymentForm />
      </div>
    </div>
  )
}

export default CheckoutPage
