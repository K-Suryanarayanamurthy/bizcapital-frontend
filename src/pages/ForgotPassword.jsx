import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleSendOTP = async () => {
        if(!email) {
            setError('Please enter your email!')
            return
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address!')
            return
        }
        setLoading(true)
        setError('')
        try {
            await API.post('/api/auth/send-otp/', { email })
            setSuccess('OTP sent to your email successfully!')
            setTimeout(() => {
                navigate('/verify-otp', { state: { email } })
            }, 1500)
        } catch(err) {
            setError('No account found with this email!')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                    {/* Icon */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔐</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Forgot Password?
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            Enter your email and we'll send you an OTP to reset your password
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ✅ {success}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your registered email"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <button
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending OTP...
                            </span>
                        ) : 'Send OTP'}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Remember your password?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-blue-700 font-medium cursor-pointer hover:underline"
                        >
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword