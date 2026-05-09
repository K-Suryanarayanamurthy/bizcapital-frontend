import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

function ProposalDetail() {
    const [proposal, setProposal] = useState(null)
    const [entrepreneur, setEntrepreneur] = useState(null)
    const [loading, setLoading] = useState(true)
    const [interestSent, setInterestSent] = useState(false)
    const [sending, setSending] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const role = localStorage.getItem('role')
    const username = localStorage.getItem('username')?.trim()

    useEffect(() => {
        fetchProposal()
    }, [])

    const fetchProposal = async () => {
        try {
            const res = await API.get(`/api/proposals/${id}/`)
            setProposal(res.data)
            fetchEntrepreneur(res.data.entrepreneur)
        } catch(err) {
            navigate('/proposals')
        }
    }

    const fetchEntrepreneur = async (entrepreneurId) => {
        try {
            const res = await API.get('/api/auth/users/?role=entrepreneur')
            const found = res.data.find(u => u.id === entrepreneurId)
            setEntrepreneur(found)
            setLoading(false)
        } catch(err) {
            setLoading(false)
        }
    }

    const handleExpressInterest = async () => {
        setSending(true)
        try {
            await API.post('/api/messaging/send/', {
                receiver: proposal.entrepreneur,
                content: `Hi! I am ${username} and I am interested in your proposal "${proposal.title}". Let's connect and discuss further! 🚀`
            })
            setInterestSent(true)
        } catch(err) {
            console.log(err)
        }
        setSending(false)
    }

    const industryColors = {
        tech: 'bg-blue-100 text-blue-700',
        health: 'bg-green-100 text-green-700',
        finance: 'bg-yellow-100 text-yellow-700',
        education: 'bg-purple-100 text-purple-700',
        retail: 'bg-pink-100 text-pink-700',
        other: 'bg-gray-100 text-gray-700',
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
            <div className="max-w-3xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/proposals')}
                    className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mb-6 transition duration-200"
                >
                    ← Back to Proposals
                </button>

                {/* Proposal Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                                {proposal.title[0].toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {proposal.title}
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                                        industryColors[proposal.industry] || 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {proposal.industry}
                                    </span>
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                        proposal.status === 'open'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {proposal.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
                            About this Proposal
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {proposal.description}
                        </p>
                    </div>

                    {/* Funding */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-600 font-medium mb-1">
                            Funding Required
                        </p>
                        <p className="text-3xl font-bold text-blue-700">
                            ${Number(proposal.funding_needed).toLocaleString()}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                Industry
                            </p>
                            <p className="font-medium text-gray-800 capitalize">
                                {proposal.industry}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                Status
                            </p>
                            <p className="font-medium text-gray-800 capitalize">
                                {proposal.status}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                Posted By
                            </p>
                            <p className="font-medium text-gray-800">
                                {proposal.entrepreneur_name}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                Posted On
                            </p>
                            <p className="font-medium text-gray-800">
                                {new Date(proposal.created_at).toLocaleDateString()}
                            </p>
                        </div>

                        {/* New Fields */}
                        {proposal.founded_year && (
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                    📅 Founded Year
                                </p>
                                <p className="font-medium text-gray-800">
                                    {proposal.founded_year}
                                </p>
                            </div>
                        )}
                        {proposal.team_size && (
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                    👥 Team Size
                                </p>
                                <p className="font-medium text-gray-800">
                                    {proposal.team_size} members
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Revenue Milestone */}
                    {proposal.revenue_milestone && (
                        <div className="bg-green-50 rounded-xl p-4 mb-4">
                            <p className="text-xs text-green-600 uppercase tracking-wide mb-1 font-medium">
                                📈 Revenue / Growth
                            </p>
                            <p className="font-medium text-green-800">
                                {proposal.revenue_milestone}
                            </p>
                        </div>
                    )}

                    {/* Achievements */}
                    {proposal.achievements && (
                        <div className="bg-yellow-50 rounded-xl p-4 mb-6">
                            <p className="text-xs text-yellow-600 uppercase tracking-wide mb-1 font-medium">
                                🏆 Achievements
                            </p>
                            <p className="font-medium text-yellow-800">
                                {proposal.achievements}
                            </p>
                        </div>
                    )}

                    {/* Express Interest - Investors Only */}
                    {role === 'investor' && proposal.entrepreneur_name !== username && (
                        <div>
                            {interestSent ? (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl text-center">
                                    <p className="text-lg">🎉</p>
                                    <p className="font-bold mt-1">Interest Expressed!</p>
                                    <p className="text-sm mt-1">
                                        Your message has been sent to {proposal.entrepreneur_name}
                                    </p>
                                    <button
                                        onClick={() => navigate('/messaging')}
                                        className="mt-3 text-green-700 underline text-sm"
                                    >
                                        Go to Messages →
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleExpressInterest}
                                    disabled={sending}
                                    className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition duration-200 disabled:opacity-50 text-lg"
                                >
                                    {sending ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </span>
                                    ) : '🤝 Express Interest'}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Entrepreneur Profile Card */}
                {entrepreneur && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            About the Entrepreneur
                        </h2>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {entrepreneur.username[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-lg">
                                    {entrepreneur.username}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {entrepreneur.bio || 'No bio provided'}
                                </p>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="border-t border-gray-100 pt-4 space-y-3">
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                                Contact Details
                            </h3>

                            {/* Email - always shown */}
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📧</span>
                                <a
                                    href={`mailto:${entrepreneur.email}`}
                                    className="text-blue-700 hover:underline text-sm"
                                >
                                    {entrepreneur.email}
                                </a>
                            </div>
                            {/* Investor Details - show if viewing investor profile */}
                            {entrepreneur && entrepreneur.role === 'investor' && (
                                <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                                        Investment Details
                                    </h3>

                                    {entrepreneur.investment_min && entrepreneur.investment_max && (
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">💰</span>
                                            <div>
                                                <p className="text-xs text-gray-400">Investment Range</p>
                                                <p className="text-sm font-medium text-gray-800">
                                                    ${Number(entrepreneur.investment_min).toLocaleString()} — ${Number(entrepreneur.investment_max).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {entrepreneur.investment_industries && (
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">🏭</span>
                                            <div>
                                                <p className="text-xs text-gray-400">Industries</p>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {entrepreneur.investment_industries}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {entrepreneur.portfolio_companies && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl">📊</span>
                                            <div>
                                                <p className="text-xs text-gray-400">Portfolio</p>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {entrepreneur.portfolio_companies}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Phone - only if added */}
                            {entrepreneur.phone && (
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">📱</span>
                                    <a
                                        href={`tel:${entrepreneur.phone}`}
                                        className="text-blue-700 hover:underline text-sm"
                                    >
                                        {entrepreneur.phone}
                                    </a>
                                </div>
                            )}

                            {/* LinkedIn - only if added */}
                            {entrepreneur.linkedin_url && (
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">💼</span>
                                    <a
                                        href={entrepreneur.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 hover:underline text-sm"
                                    >
                                        View LinkedIn Profile
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProposalDetail