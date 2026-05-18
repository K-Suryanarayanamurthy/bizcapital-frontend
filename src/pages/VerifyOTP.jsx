import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import API from '../api/axios'

function VerifyOTP() {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email

    // If no email passed redirect to forgot password
    if(!email) {
        navigate('/forgot-password')
        return null
    }

    const handleVerifyOTP = async () => {
        if(!otp) {
            setError('Please enter the OTP!')
            return
        }
        if(otp.length !== 6) {
            setError('OTP must be 6 digits!')
            return
        }
        setLoading(true)
        setError('')
        try {
            await API.post('/api/auth/verify-otp/', { email, otp })
            setSuccess('OTP verified successfully!')
            setTimeout(() => {
                navigate('/reset-password', { state: { email } })
            }, 1500)
        } catch(err) {
            setError(err.response?.data?.error || 'Invalid or expired OTP!')
        }
        setLoading(false)
    }

    const handleResendOTP = async () => {
        setError('')
        try {
            await API.post('/api/auth/send-otp/', { email })
            setSuccess('New OTP sent to your email!')
            setTimeout(() => setSuccess(''), 3000)
        } catch(err) {
            setError('Failed to resend OTP!')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">

                    {/* Icon */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📧</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Enter OTP
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                            We sent a 6 digit OTP to
                        </p>
                        <p className="text-blue-700 dark:text-blue-300 font-medium text-sm">
                            {email}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-600 dark:text-green-300 px-4 py-3 rounded-lg mb-6 text-sm">
                            ✅ {success}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                            6 Digit OTP
                        </label>
                        <input
                            type="number"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6 digit OTP"
                            maxLength={6}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-center text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 text-2xl tracking-widest font-bold"
                        />
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-center">
                            OTP expires in 10 minutes
                        </p>
                    </div>

                    <button
                        onClick={handleVerifyOTP}
                        disabled={loading}
                        className="w-full bg-blue-700 dark:bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 dark:hover:bg-blue-700 transition duration-200 disabled:opacity-50 mb-3"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Verifying...
                            </span>
                        ) : 'Verify OTP'}
                    </button>

                    <button
                        onClick={handleResendOTP}
                        className="w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200 py-2.5 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                    >
                        Resend OTP
                    </button>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        <span
                            onClick={() => navigate('/forgot-password')}
                            className="text-blue-700 dark:text-blue-300 font-medium cursor-pointer hover:underline"
                        >
                            ← Change Email
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP