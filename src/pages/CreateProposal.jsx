import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function CreateProposal() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        industry: 'tech',
        funding_needed: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    if(role !== 'entrepreneur') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-6xl mb-4">🚫</p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Access Denied!
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Only entrepreneurs can create proposals.
                    </p>
                    <button
                        onClick={() => navigate('/proposals')}
                        className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200"
                    >
                        Browse Proposals
                    </button>
                </div>
            </div>
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if(!formData.title || !formData.description || !formData.funding_needed) {
            setError('Please fill in all required fields!')
            return
        }
        setLoading(true)
        setError('')
        try {
            await API.post('/api/proposals/create/', formData)
            navigate('/dashboard')
        } catch(err) {
            setError('Failed to create proposal! Please try again.')
        }
        setLoading(false)
    }

    const industries = [
        { value: 'tech', label: '💻 Technology' },
        { value: 'health', label: '🏥 Healthcare' },
        { value: 'finance', label: '💰 Finance' },
        { value: 'education', label: '📚 Education' },
        { value: 'retail', label: '🛍️ Retail' },
        { value: 'other', label: '🌐 Other' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mb-4 transition duration-200"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Proposal
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Share your business idea with investors
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Title */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Proposal Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. EcoTech Solar Solutions"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your business idea, target market, and growth potential..."
                            rows={5}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                        />
                    </div>

                    {/* Industry */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Industry <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {industries.map(ind => (
                                <button
                                    key={ind.value}
                                    onClick={() => setFormData({...formData, industry: ind.value})}
                                    className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition duration-200 ${
                                        formData.industry === ind.value
                                            ? 'bg-blue-700 text-white border-blue-700'
                                            : 'bg-white text-gray-600 border-gray-300 hover:border-blue-700'
                                    }`}
                                >
                                    {ind.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Funding */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Funding Needed ($) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                $
                            </span>
                            <input
                                name="funding_needed"
                                type="number"
                                value={formData.funding_needed}
                                onChange={handleChange}
                                placeholder="500000"
                                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating...
                                </span>
                            ) : 'Create Proposal'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProposal