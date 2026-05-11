import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Dashboard() {
    const [deleteModal, setDeleteModal] = useState(false)
    const [deletingId, setDeletingId] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [averageRating, setAverageRating] = useState(0)
    const [profile, setProfile] = useState(null)
    const [proposals, setProposals] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    const username = localStorage.getItem('username')?.trim()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
            return
        }
        fetchData()
    }, [])

    const fetchData = async () => {
    try {
        const profileRes = await API.get('/api/auth/profile/')
        setProfile(profileRes.data)

        if(role === 'entrepreneur') {
            const proposalsRes = await API.get('/api/proposals/list/')
            const myProposals = proposalsRes.data.filter(
                p => p.entrepreneur_name === username
            )
            setProposals(myProposals)

            // Get feedback rating
            const feedbackRes = await API.get(`/api/feedback/user/${profileRes.data.id}/`)
            setAverageRating(feedbackRes.data.average_rating)
        }
        setLoading(false)
    } catch(err) {
        navigate('/login')
    }
}

    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        )
    }
    const handleDeleteProposal = async () => {
    setDeleting(true)
    try {
        await API.delete(`/api/proposals/${deletingId}/`)
        setProposals(proposals.filter(p => p.id !== deletingId))
        setDeleteModal(false)
        setDeletingId(null)
    } catch(err) {
        alert('Failed to delete proposal!')
    }
    setDeleting(false)
}

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-8 px-6">
                <div className="max-w-5xl mx-auto flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                        {profile.username[0].toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome back, {profile.username}! 👋
                        </h1>
                        <p className="text-gray-500 text-sm mt-0.5">
                            {role === 'entrepreneur' ? '🚀 Entrepreneur' : '💼 Investor'} Account
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column - Profile */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">
                                My Profile
                            </h2>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                                    <p className="text-gray-800 font-medium break-all text-sm">{profile.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Role</p>
                                    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                                        role === 'entrepreneur'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-green-100 text-green-700'
                                    }`}>
                                        {profile.role}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                                    <p className="text-gray-800 font-medium">
                                        {profile.phone || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Bio</p>
                                    <p className="text-gray-800 font-medium">
                                        {profile.bio || 'Not provided'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Joined</p>
                                    <p className="text-gray-800 font-medium">
                                        {new Date(profile.date_joined).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/edit-profile')}
                                className="w-full mt-6 border border-blue-700 text-blue-700 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition duration-200"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-2">

                        {/* Entrepreneur Section */}
                        {role === 'entrepreneur' && (
                            <div>
                               {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                                        <p className="text-3xl font-bold text-blue-700">
                                            {proposals.length}
                                        </p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Total Proposals
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                                        <p className="text-3xl font-bold text-green-600">
                                            {proposals.filter(p => p.status === 'open').length}
                                        </p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Open Proposals
                                        </p>
                                    </div>
                                    <div
                                        onClick={() => navigate(`/feedback/${profile.id}`)}
                                        className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm cursor-pointer hover:border-blue-700 transition duration-200"
                                    >
                                        <p className="text-3xl font-bold text-yellow-500">
                                            {averageRating > 0 ? `${averageRating}⭐` : '—'}
                                        </p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            My Rating
                                        </p>
                                    </div>
                                </div>

                                {/* Proposals */}
                                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-gray-800">
                                            My Proposals
                                        </h2>
                                        <button
                                            onClick={() => navigate('/create-proposal')}
                                            className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition duration-200"
                                        >
                                            + New Proposal
                                        </button>
                                    </div>

                                    {proposals.length === 0 && (
                                        <div className="text-center py-10">
                                            <p className="text-4xl mb-3">📝</p>
                                            <p className="text-gray-500">No proposals yet!</p>
                                            <button
                                                onClick={() => navigate('/create-proposal')}
                                                className="mt-3 text-blue-700 text-sm hover:underline"
                                            >
                                                Create your first proposal
                                            </button>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {proposals.map(proposal => (
                                            <div
                                                key={proposal.id}
                                                className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition duration-200"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-bold text-gray-800">
                                                            {proposal.title}
                                                        </h3>
                                                        <p className="text-gray-500 text-sm mt-1">
                                                            {proposal.description}
                                                        </p>
                                                    </div>
                                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ml-3 ${
                                                        proposal.status === 'open'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}>
                                                        {proposal.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-blue-700 font-bold text-sm">
                                                        ${Number(proposal.funding_needed).toLocaleString()}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => navigate(`/edit-proposal/${proposal.id}`)}
                                                            className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:border-blue-700 hover:text-blue-700 transition duration-200"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDeletingId(proposal.id)
                                                                setDeleteModal(true)
                                                            }}
                                                            className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition duration-200"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Investor Section */}
                        {role === 'investor' && (
                            <div className="space-y-6">
                                {/* Quick Actions */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => navigate('/proposals')}
                                        className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm cursor-pointer hover:border-blue-700 hover:shadow-md transition duration-200"
                                    >
                                        <p className="text-3xl mb-3">🔍</p>
                                        <h3 className="font-bold text-gray-800">
                                            Browse Proposals
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Discover investment opportunities
                                        </p>
                                    </div>
                                    <div
                                        onClick={() => navigate('/messaging')}
                                        className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm cursor-pointer hover:border-blue-700 hover:shadow-md transition duration-200"
                                    >
                                        <p className="text-3xl mb-3">💬</p>
                                        <h3 className="font-bold text-gray-800">
                                            Messages
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Chat with entrepreneurs
                                        </p>
                                    </div>
                                </div>

                                {/* Tips */}
                                <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
                                    <h3 className="font-bold text-blue-800 mb-3">
                                        💡 Investor Tips
                                    </h3>
                                    <ul className="space-y-2 text-sm text-blue-700">
                                        <li>• Browse proposals and filter by industry</li>
                                        <li>• Message entrepreneurs directly</li>
                                        <li>• Leave feedback after interactions</li>
                                        <li>• Build your reputation on the platform</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
                        <div className="text-center mb-4">
                            <p className="text-4xl mb-3">🗑️</p>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                Delete Proposal?
                            </h3>
                            <p className="text-gray-500 text-sm">
                                This action cannot be undone. Your proposal will be permanently deleted.
                            </p>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setDeleteModal(false)
                                    setDeletingId(null)
                                }}
                                disabled={deleting}
                                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteProposal}
                                disabled={deleting}
                                className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-medium hover:bg-red-600 transition duration-200 disabled:opacity-50"
                            >
                                {deleting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Deleting...
                                    </span>
                                ) : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard