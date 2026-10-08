import { Routes, Route } from 'react-router-dom'
import VoterAuthentication from './components/VoterAuthentication'
import CandidateSelection from './components/CandidateSelection'
import VoteConfirmation from './components/VoteConfirmation'
import VoteSuccess from './components/VoteSuccess'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import ElectionSetup from './components/ElectionSetup'
import SealedVault from './components/SealedVault'
import LiveMonitoring from './components/LiveMonitoring'

function App() {
  return (
    <Routes>
      <Route path="/" element={<VoterAuthentication />} />
      <Route path="/vote" element={<CandidateSelection />} />
      <Route path="/confirm" element={<VoteConfirmation />} />
      <Route path="/success" element={<VoteSuccess />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/setup" element={<ElectionSetup />} />
      <Route path="/admin/vault" element={<SealedVault />} />
      <Route path="/admin/live" element={<LiveMonitoring />} />
    </Routes>
  )
}

export default App