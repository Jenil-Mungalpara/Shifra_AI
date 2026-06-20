import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

const Billing = ({ user , setUser }) => {

  const ServerUrl = "http://localhost:8000"

  const navigate = useNavigate()

  useEffect(() => {
    if (user && !user.isSetupComplete) {
      toast.error("setup your assistant first");
      navigate("/builder")
    }
  }, [])

  const remainingMessages = Math.max(
    0,
    (user?.requestLimit || 0) - (user?.totalMessages || 0)
  )

  const remainingDays =
    user?.proExpiresAt
      ? Math.max(
        0,
        Math.ceil(
          (
            new Date(
              user.proExpiresAt
            ) - new Date()
          ) /
          (1000 * 60 * 60 * 24)
        )
      )
      : 0;

  const handlePay = async () => {
  try {
    const res = await axios.post(
      `${ServerUrl}/api/billing/order`, 
      { plan: "pro" }, 
      { withCredentials: true }
    );

    const order = res.data.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: order.amount,
      currency: order.currency,
      name: "ShifraAI",
      description: "Pro Plan",
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyRes = await axios.post(
            `${ServerUrl}/api/billing/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );

          if (verifyRes.data.success) {
            toast.success("Welcome to Pro Plan!");
            setUser(verifyRes.data.user)
          } else {
            toast.error(verifyRes.data.message || "Verification failed");
          }
        } catch (err) {
          console.error(err);
          toast.error("Error verifying payment");
        }
      },
      theme: {
        color: "#7c3aed",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    toast.error("Could not complete order setup");
    console.log(error);
  }
};

  return (

    <div className='min-h-screen bg-gray-50 px-4 py-10'>

      <div className='max-w-5xl mx-auto'>

        <div className='mb-8 text-center sm:text-left'>
          <p className='text-gray-500 mt-1'>Manage your AI assistant plan and usage.</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>

          <div className='bg-white rounded-3xl p-6 border border-gray-100 shadow-sm'>
            <p className='text-sm text-gray-400'>Current Plan</p>
            <h2 className='text-xl font-bold text-[#081028] mt-1 capitalize'>{user?.plan || "Free"}</h2>
          </div>

          <div className='bg-white rounded-3xl p-6 border border-gray-100 shadow-sm'>
            <p className='text-sm text-gray-400'>Gemini Status</p>
            <h2 className={`text-xl font-bold mt-1 capitalize ${user?.geminiStatus === "active"
              ? "text-emerald-500"
              : user?.geminiStatus === "invalid"
                ? "text-red-500"
                : "text-amber-500"
              }`}>{user?.geminiStatus || "Active"}</h2>
          </div>

          <div className='bg-white rounded-3xl p-6 border border-gray-100 shadow-sm'>
            <p className='text-sm text-gray-400'>{user?.plan
              === "pro"
              ? "Plan Expiry"
              : "Messages Left"}</p>
            <h2 className='text-xl font-bold text-[#081028] mt-1 capitalize'>
              {user?.plan === "pro"
                ? `${remainingDays} Days`
                : remainingMessages || "191"}
            </h2>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 '>
          {/* free */}

          <div className='bg-white rounded-3xl p-8 border border-gray-100 shadow-sm'>
            <h2 className="text-2xl font-bold text-[#081028]">
              Free Plan
            </h2>

            <h3 className="text-5xl font-bold mt-5 text-[#081028]">
              ₹0
            </h3>

            <ul className="mt-8 space-y-4 text-gray-500 text-sm">
              <li>200 AI messages</li>
              <li>Voice assistant</li>
              <li>Navigation support</li>
              <li>Basic customization</li>
            </ul>

          </div>

          {/* Pro */}
          <div className='rounded-3xl p-8 bg-gradient-to-br from-[#8B5CF6] to-[#10B981] text-white shadow-lg relative overflow-hidden'>
            <h2 className="text-2xl font-bold text-gray-900 relative z-10">
              Pro Plan
            </h2>
            <h3 className="text-5xl font-bold mt-5 text-gray-900 relative z-10">
              ₹99
            </h3>

            <p className='mt-2 text-sm text-white/90 relative z-10'>3 Months Access</p>

            <ul className='mt-6 space-y-4 text-white/90 text-sm relative z-10'>
              <li>Unlimited AI messages</li>
              <li>Advanced AI assistant</li>
              <li>Priority performance</li>
              <li>Unlimited navigation</li>
              <li>Premium support</li>
            </ul>

            <button onClick={handlePay}
              disabled={user?.plan === "pro"} className={`mt-8 h-12 w-full rounded-xl text-sm font-semibold transition relative z-10 ${user?.plan === "pro"
                ? "bg-emerald-200 text-black cursor-default"
                : "bg-white text-gray-900 hover:bg-gray-50 cursor-pointer shadow-sm"
                }`}>
              {user?.plan === "pro" ? "Active Plan" : "Upgrade Now"}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Billing