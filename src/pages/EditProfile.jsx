import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function EditProfile() {
    const [formData, setFormData] = useState({
        phone: '',
        bio: '',
        linkedin_url: '',
        investment_min: '',
        investment_max: '',
        investment_industries: '',
        portfolio_companies: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    const username = localStorage.getItem('username')?.trim()
    const role = localStorage.getItem('role')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
            return
        }
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const res = await API.get('/api/auth/profile/')
            setFormData({
                phone: res.data.phone || '',
                bio: res.data.bio || '',
                linkedin_url: res.data.linkedin_url || '',
                investment_min: res.data.investment_min || '',
                investment_max: res.data.investment_max || '',
                investment_industries: res.data.investment_industries || '',
                portfolio_companies: res.data.portfolio_companies || ''
            })
            setLoading(false)
        } catch(err) {
            navigate('/login')
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        setSaving(true)
        setError('')
        setSuccess('')
        try {
            await API.put('/api/auth/profile/update/', formData)
            setSuccess('Profile updated successfully!')
            setTimeout(() => navigate('/dashboard'), 1500)
        } catch(err) {
            setError('Failed to update profile! Please try again.')
        }
        setSaving(false)
    }

    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-lg mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mb-4 transition duration-200"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Profile
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Update your profile information
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                            {username?.[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-lg">{username}</p>
                            <p className="text-gray-500 text-sm capitalize">{role}</p>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ✅ {success}
                        </div>
                    )}

                    {/* Common Fields */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            📱 Phone Number
                        </label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            📝 Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            rows={3}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            💼 LinkedIn Profile
                            <span className="text-gray-400 font-normal ml-1">(optional)</span>
                        </label>
                        <input
                            name="linkedin_url"
                            value={formData.linkedin_url}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    {/* Investor Specific Fields */}
                    {role === 'investor' && (
                        <>
                            <div className="border-t border-gray-100 pt-6 mt-6 mb-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                    💼 Investment Details
                                </h3>
                                <p className="text-gray-500 text-sm mb-4">
                                    Help entrepreneurs understand your investment preferences
                                </p>

                                {/* Investment Range */}
                                <div className="grid grid-cols-2 gap-4 mb-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Min Investment ($)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                            <input
                                                name="investment_min"
                                                type="number"
                                                value={formData.investment_min}
                                                onChange={handleChange}
                                                placeholder="50000"
                                                className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Max Investment ($)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                            <input
                                                name="investment_max"
                                                type="number"
                                                value={formData.investment_max}
                                                onChange={handleChange}
                                                placeholder="5000000"
                                                className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Investment Industries */}
                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        🏭 Industries of Interest
                                    </label>
                                    <input
                                        name="investment_industries"
                                        value={formData.investment_industries}
                                        onChange={handleChange}
                                        placeholder="e.g. Tech, Health, Finance"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        Separate industries with commas
                                    </p>
                                </div>

                                {/* Portfolio Companies */}
                                <div className="mb-5">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        📊 Portfolio Companies
                                        <span className="text-gray-400 font-normal ml-1">(optional)</span>
                                    </label>
                                    <textarea
                                        name="portfolio_companies"
                                        value={formData.portfolio_companies}
                                        onChange={handleChange}
                                        placeholder="e.g. TechStartup Inc (2022), HealthApp Ltd (2023)"
                                        rows={3}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        List companies you have invested in
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50"
                        >
                            {saving ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </span>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile