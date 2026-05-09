import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Proposals() {
    const [proposals, setProposals] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const navigate = useNavigate()

    useEffect(() => {
        API.get('/api/proposals/list/')
            .then(res => {
                setProposals(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    const industries = ['all', 'tech', 'health', 'finance', 'education', 'retail', 'other']

    const filtered = filter === 'all'
        ? proposals
        : proposals.filter(p => p.industry === filter)

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
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading proposals...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-8 px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">
                        Business Proposals
                    </h1>
                    <p className="text-gray-500">
                        Discover {proposals.length} investment opportunities
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Filter Tabs */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {industries.map(ind => (
                        <button
                            key={ind}
                            onClick={() => setFilter(ind)}
                            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition duration-200 ${
                                filter === ind
                                    ? 'bg-blue-700 text-white'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-700 hover:text-blue-700'
                            }`}
                        >
                            {ind}
                        </button>
                    ))}
                </div>

                {/* Proposals Grid */}
                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">📭</p>
                        <p className="text-gray-500">No proposals found!</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map(proposal => (
                <div
                    key={proposal.id}
                    onClick={() => navigate(`/proposals/${proposal.id}`)}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-1 cursor-pointer"
                >
                            {/* Top */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                    {proposal.title[0].toUpperCase()}
                                </div>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                    proposal.status === 'open'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}>
                                    {proposal.status}
                                </span>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {proposal.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                {proposal.description}
                            </p>

                            {/* Details */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                    {proposal.entrepreneur_name[0].toUpperCase()}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {proposal.entrepreneur_name}
                                </span>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
                                    industryColors[proposal.industry] || 'bg-gray-100 text-gray-700'
                                }`}>
                                    {proposal.industry}
                                </span>
                                <span className="text-blue-700 font-bold text-sm">
                                    ${Number(proposal.funding_needed).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Proposals