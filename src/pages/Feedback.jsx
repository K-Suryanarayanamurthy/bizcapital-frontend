import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

function Feedback() {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [comment, setComment] = useState('')
    const [feedbackList, setFeedbackList] = useState([])
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [alreadyReviewed, setAlreadyReviewed] = useState(false)
    const navigate = useNavigate()
    const { userId } = useParams()
    const currentUsername = localStorage.getItem('username')?.trim()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
            return
        }
        fetchData()
    }, [userId])

    const fetchData = async () => {
        try {
            // Get feedback for this user
            const feedbackRes = await API.get(`/api/feedback/user/${userId}/`)
            setFeedbackList(feedbackRes.data.feedback)
            setUserInfo({
                username: feedbackRes.data.user,
                total_reviews: feedbackRes.data.total_reviews,
                average_rating: feedbackRes.data.average_rating
            })

            // Check if current user already reviewed
            const alreadyGiven = feedbackRes.data.feedback.some(
                f => f.reviewer_name === currentUsername
            )
            setAlreadyReviewed(alreadyGiven)
            setLoading(false)
        } catch(err) {
            navigate('/proposals')
        }
    }

    const handleSubmit = async () => {
        if(rating === 0) {
            setError('Please select a rating!')
            return
        }
        setSubmitting(true)
        setError('')
        try {
            await API.post('/api/feedback/give/', {
                reviewee: userId,
                rating: rating,
                comment: comment
            })
            setSuccess('Feedback submitted successfully!')
            setAlreadyReviewed(true)
            fetchData()
        } catch(err) {
            setError('Failed to submit feedback! You may have already reviewed this user.')
        }
        setSubmitting(false)
    }

    const renderStars = (count, interactive = false) => {
        return [1, 2, 3, 4, 5].map(star => (
            <span
                key={star}
                onClick={() => interactive && setRating(star)}
                onMouseEnter={() => interactive && setHoveredRating(star)}
                onMouseLeave={() => interactive && setHoveredRating(0)}
                className={`text-2xl ${interactive ? 'cursor-pointer' : ''} transition duration-100`}
            >
                {star <= (interactive ? (hoveredRating || rating) : count)
                    ? '⭐' : '☆'}
            </span>
        ))
    }

    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="w-12 h-12 border-4 border-blue-700 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }
    const isOwnProfile = userInfo?.username === currentUsername 
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white text-sm flex items-center gap-1 mb-6 transition duration-200"
                >
                    ← Go Back
                </button>

                {/* User Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                            {userInfo?.username[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                {userInfo?.username}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                    {renderStars(Math.round(userInfo?.average_rating))}
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                    {userInfo?.average_rating} ({userInfo?.total_reviews} reviews)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Give Feedback */}
                {!alreadyReviewed && !isOwnProfile ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm mb-6">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                            ✍️ Write a Review
                        </h3>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                                ⚠️ {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-600 dark:text-green-300 px-4 py-3 rounded-lg mb-4 text-sm">
                                ✅ {success}
                            </div>
                        )}

                        {/* Star Rating */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Rating <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-1">
                                {renderStars(rating, true)}
                            </div>
                            {rating > 0 && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][rating]}
                                </p>
                            )}
                        </div>

                        {/* Comment */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                                Comment
                                <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(optional)</span>
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your experience..."
                                rows={4}
                                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 resize-none"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={submitting || rating === 0}
                            className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50"
                        >
                            {submitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Submitting...
                                </span>
                            ) : 'Submit Review'}
                        </button>
                    </div>
                ) : (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-6 mb-6 text-center">
                        <p className="text-3xl mb-2">✅</p>
                        <p className="font-bold text-green-700 dark:text-green-300">
                            You have already reviewed this user!
                        </p>
                    </div>
                )}

                {/* Reviews List */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Reviews ({feedbackList.length})
                    </h3>

                    {feedbackList.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-3xl mb-2">📝</p>
                            <p className="text-gray-500 dark:text-gray-400">No reviews yet!</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {feedbackList.map(feedback => (
                            <div
                                key={feedback.id}
                                className="border border-gray-100 rounded-xl p-4"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {feedback.reviewer_name[0].toUpperCase()}
                                        </div>
                                        <span className="font-medium text-gray-800 dark:text-gray-100">
                                            {feedback.reviewer_name}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        {renderStars(feedback.rating)}
                                    </div>
                                </div>
                                {feedback.comment && (
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 ml-10">
                                        {feedback.comment}
                                    </p>
                                )}
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 ml-10">
                                    {new Date(feedback.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback