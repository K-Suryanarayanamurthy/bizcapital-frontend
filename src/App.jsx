import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Proposals from './pages/Proposals'
import Dashboard from './pages/Dashboard'
import CreateProposal from './pages/CreateProposal'
import Messaging from './pages/Messaging'
import Home from './pages/Home'
import EditProfile from './pages/EditProfile'
import ProposalDetail from './pages/ProposalDetail'
import EditProposal from './pages/EditProposal'
import Feedback from './pages/Feedback'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'
import Navbar from './components/Navbar'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/proposals/:id" element={<ProposalDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-proposal" element={<CreateProposal />} />
                <Route path="/edit-proposal/:id" element={<EditProposal />} />
                <Route path="/messaging" element={<Messaging />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/feedback/:userId" element={<Feedback />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App