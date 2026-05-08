import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Messaging() {
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [showChat, setShowChat] = useState(false)
    const messagesEndRef = useRef(null)
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    const username = localStorage.getItem('username')?.trim()
    const contactRole = role === 'investor' ? 'entrepreneur' : 'investor'

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
            return
        }
        fetchContacts()
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const fetchContacts = async () => {
        try {
            const res = await API.get(`/api/auth/users/?role=${contactRole}`)
            const unique = res.data.filter(
                (contact, index, self) =>
                    index === self.findIndex(c => c.id === contact.id)
            )
            setContacts(unique)
            setLoading(false)
        } catch(err) {
            navigate('/login')
        }
    }

    const fetchConversation = async (contactId) => {
        try {
            const res = await API.get(`/api/messaging/conversation/${contactId}/`)
            setMessages(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    const handleSelectContact = async (contact) => {
        setSelectedContact(contact)
        setError('')
        setShowChat(true)
        fetchConversation(contact.id)
        try {
            await API.post(`/api/messaging/mark-read/${contact.id}/`)
        } catch(err) {
            console.log(err)
        }
    }

    const handleBack = () => {
        setShowChat(false)
        setSelectedContact(null)
        setMessages([])
    }

    const handleSend = async () => {
        if(!content.trim()) return
        setError('')
        try {
            await API.post('/api/messaging/send/', {
                receiver: selectedContact.id,
                content: content
            })
            setContent('')
            fetchConversation(selectedContact.id)
        } catch(err) {
            setError('Failed to send message!')
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading messages...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-[calc(100vh-57px)] bg-gray-50 overflow-hidden">

            {/* Left Side - Contacts */}
            <div className={`
                ${showChat ? 'hidden' : 'flex'} md:flex
                w-full md:w-80 bg-white border-r border-gray-200 flex-col flex-shrink-0
            `}>
                {/* Contacts Header */}
                <div className="px-4 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800">Messages</h2>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        {contactRole === 'entrepreneur' ? '🚀' : '💼'}
                        {contactRole === 'entrepreneur' ? 'Entrepreneurs' : 'Investors'}
                    </p>
                </div>

                {/* Contacts List */}
                <div className="flex-1 overflow-y-auto">
                    {contacts.length === 0 && (
                        <div className="text-center py-10 px-4">
                            <p className="text-3xl mb-2">👥</p>
                            <p className="text-gray-500 text-sm">
                                No {contactRole}s found!
                            </p>
                        </div>
                    )}

                    {contacts.map(contact => (
                        <div
                            key={contact.id}
                            onClick={() => handleSelectContact(contact)}
                            className={`flex items-center gap-3 px-4 py-4 cursor-pointer border-b border-gray-100 transition duration-200 ${
                                selectedContact?.id === contact.id
                                    ? 'bg-blue-50 border-l-4 border-l-blue-700'
                                    : 'hover:bg-gray-50 active:bg-gray-100'
                            }`}
                        >
                            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                {contact.username[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 truncate">
                                    {contact.username}
                                </p>
                                <p className="text-xs text-gray-400 capitalize mt-0.5">
                                    {contact.role}
                                </p>
                            </div>
                            <span className="text-gray-300 text-lg">›</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side - Chat */}
            <div className={`
                ${showChat ? 'flex' : 'hidden'} md:flex
                flex-1 flex-col min-w-0
            `}>

                {/* No Contact Selected - Desktop Only */}
                {!selectedContact && (
                    <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center px-6">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-4">
                            💬
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Start a Conversation
                        </h3>
                        <p className="text-gray-500 text-sm max-w-xs">
                            Select a contact from the left to start chatting
                        </p>
                    </div>
                )}

                {/* Chat Window */}
                {selectedContact && (
                    <div className="flex flex-col h-full">

                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
                            {/* Back button - mobile only */}
                            <button
                                onClick={handleBack}
                                className="md:hidden text-blue-700 font-bold text-xl mr-1"
                            >
                                ‹
                            </button>

                            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                {selectedContact.username[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-800 truncate">
                                    {selectedContact.username}
                                </p>
                                <p className="text-xs text-gray-400 capitalize">
                                    {selectedContact.role}
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                                    <p className="text-3xl mb-2">👋</p>
                                    <p className="text-gray-500 text-sm">
                                        Say hello to {selectedContact.username}!
                                    </p>
                                </div>
                            )}

                            {messages.map(message => {
                                const isMe = message.sender_name === username
                                return (
                                    <div
                                        key={message.id}
                                        className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {!isMe && (
                                            <div className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                                {message.sender_name[0].toUpperCase()}
                                            </div>
                                        )}

                                        <div className={`max-w-[70%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-4 py-2.5 rounded-2xl text-sm break-words ${
                                                isMe
                                                    ? 'bg-blue-700 text-white rounded-br-sm'
                                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                                            }`}>
                                                {message.content}
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1 px-1">
                                                {new Date(message.created_at).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>

                                        {isMe && (
                                            <div className="w-7 h-7 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                                {username[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mx-4 mb-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm flex-shrink-0">
                                ⚠️ {error}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={`Message ${selectedContact.username}...`}
                                    rows={1}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!content.trim()}
                                    className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                                >
                                    ➤
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Messaging