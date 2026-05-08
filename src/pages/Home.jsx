import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Bridge Between Investor and Entrepreneur
                    </h1>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        BizCapital connects visionary entrepreneurs with strategic investors.
                        Build your future with the right partners by your side.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-200"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => navigate('/proposals')}
                            className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Browse Proposals
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-blue-50 py-12 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
                    <div>
                        <h3 className="text-4xl font-bold text-blue-700">500+</h3>
                        <p className="text-gray-600 mt-1">Entrepreneurs</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-blue-700">200+</h3>
                        <p className="text-gray-600 mt-1">Investors</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-blue-700">$10M+</h3>
                        <p className="text-gray-600 mt-1">Funded</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                        Why Choose BizCapital?
                    </h2>
                    <p className="text-center text-gray-500 mb-12">
                        Everything you need to connect, collaborate and grow
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Verified Users
                            </h3>
                            <p className="text-gray-500">
                                All investors and entrepreneurs are verified for security and trust.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200">
                            <div className="text-4xl mb-4">💬</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Direct Messaging
                            </h3>
                            <p className="text-gray-500">
                                Chat directly with investors or entrepreneurs in real time.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Smart Matching
                            </h3>
                            <p className="text-gray-500">
                                Find the right partners based on industry and investment goals.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Proposal Management
                            </h3>
                            <p className="text-gray-500">
                                Create and manage detailed business proposals with ease.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200">
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Ratings & Feedback
                            </h3>
                            <p className="text-gray-500">
                                Build reputation through honest ratings and reviews.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200">
                            <div className="text-4xl mb-4">🌍</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Global Network
                            </h3>
                            <p className="text-gray-500">
                                Connect with partners across industries and geographies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-blue-50 py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                        How It Works
                    </h2>
                    <p className="text-center text-gray-500 mb-12">
                        Get started in 4 simple steps
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { step: '1', title: 'Create Profile', desc: 'Register as an investor or entrepreneur' },
                            { step: '2', title: 'Browse', desc: 'Explore proposals or discover investors' },
                            { step: '3', title: 'Connect', desc: 'Send messages and start conversations' },
                            { step: '4', title: 'Close Deal', desc: 'Finalize partnerships and grow together' },
                        ].map(item => (
                            <div key={item.step} className="text-center">
                                <div className="w-14 h-14 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Join thousands of entrepreneurs and investors building the future together.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-blue-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-800 transition duration-200"
                        >
                            Join as Entrepreneur
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="border-2 border-blue-700 text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-200"
                        >
                            Join as Investor
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 py-8 px-6 text-center">
                <p className="text-lg font-bold text-white mb-2">BizCapital</p>
                <p className="text-sm">Bridge Between Investor and Entrepreneur</p>
                <p className="text-sm mt-4">© 2026 BizCapital. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Home