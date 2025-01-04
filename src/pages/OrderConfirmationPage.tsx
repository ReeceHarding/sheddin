import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const OrderConfirmationPage: React.FC = () => {
  const { user } = useAuth();
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <img 
            src="/images/logo.png" 
            alt="Studio Shed" 
            className="h-8"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-medium mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600 text-lg mb-8">
            We're excited to help you create your dream space.
          </p>
          <p className="text-gray-500">
            Order Reference: #{orderId?.slice(0, 8)}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-xl font-medium mb-6">What Happens Next?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#B87503] text-white rounded-full flex items-center justify-center font-medium">
                1
              </div>
              <div>
                <h3 className="font-medium mb-2">Order Confirmation</h3>
                <p className="text-gray-600">
                  You'll receive an email confirmation with your order details within the next hour.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#B87503] text-white rounded-full flex items-center justify-center font-medium">
                2
              </div>
              <div>
                <h3 className="font-medium mb-2">Design Review</h3>
                <p className="text-gray-600">
                  Our design team will review your configuration and reach out within 1-2 business days to discuss next steps.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#B87503] text-white rounded-full flex items-center justify-center font-medium">
                3
              </div>
              <div>
                <h3 className="font-medium mb-2">Payment Processing</h3>
                <p className="text-gray-600">
                  We'll send you a secure payment link for your deposit to begin production.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Image */}
        <div className="mb-12">
          <img 
            src="/images/home/fastTrackADUPeoplePic.jpg"
            alt="Studio Shed Team"
            className="w-full rounded-lg"
          />
          <p className="text-center text-gray-600 mt-4">
            Our dedicated team is here to support you every step of the way
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-xl font-medium mb-4">Questions?</h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is available Monday through Friday, 9am-5pm MT
          </p>
          <div className="space-y-2">
            <p className="font-medium">Call us: (888) 900-3933</p>
            <p className="font-medium">Email: design@studioshed.com</p>
          </div>
          <div className="mt-8">
            <Link
              to="/account/orders"
              className="inline-flex items-center text-[#B87503] hover:text-[#9A6203]"
            >
              View all orders →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}; 