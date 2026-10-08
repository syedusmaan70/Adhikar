import styled from 'styled-components'
import { CheckCircle, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin: 0.5rem 0;
`

const SecurityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #dbeafe;
  color: #1e40af;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 1rem;
`

const Card = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 900px;
  width: 100%;
`

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #059669;
`

const AuthMessage = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
  margin-bottom: 0.5rem;
`

const AuthSubtext = styled.p`
  font-size: 1rem;
  color: #64748b;
  text-align: center;
  margin-bottom: 3rem;
`

const CandidatesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`

const CandidateCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #3b82f6;
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
`

const CandidateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const CandidateSymbol = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
`

const CandidateDetails = styled.div``

const CandidateName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
`

const PartyName = styled.p`
  font-size: 1rem;
  color: #64748b;
  margin: 0;
`

const VoteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #dc2626;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

interface Candidate {
  id: number
  name: string
  party: string
  symbol: string
  color: string
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    party: 'Indian National Congress',
    symbol: '✋',
    color: '#3b82f6'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    party: 'Bharatiya Janata Party',
    symbol: '🌸',
    color: '#e91e63'
  },
  {
    id: 3,
    name: 'Amit Singh',
    party: 'Aam Aadmi Party',
    symbol: '🧹',
    color: '#f59e0b'
  },
  {
    id: 4,
    name: 'Sunita Devi',
    party: 'Bahujan Samaj Party',
    symbol: '🐘',
    color: '#8b5cf6'
  }
]

function CandidateSelection() {
  const navigate = useNavigate()

  const handleVote = (candidate: Candidate) => {
    // Store selected candidate in sessionStorage for confirmation page
    sessionStorage.setItem('selectedCandidate', JSON.stringify(candidate))
    navigate('/confirm')
  }

  return (
    <Container>
      <Header>
        <Logo>
          <LogoIcon>
            <Shield size={24} />
          </LogoIcon>
          <Title>Project Adhikar</Title>
        </Logo>
        <Subtitle>Your Vote, Your Right</Subtitle>
        <SecurityBadge>
          <Shield size={16} />
          Blockchain Secured
        </SecurityBadge>
      </Header>

      <Card>
        <SuccessIcon>
          <CheckCircle size={40} />
        </SuccessIcon>
        
        <AuthMessage>Authentication Successful</AuthMessage>
        <AuthSubtext>
          Session verified for Aadhaar: {sessionStorage.getItem('voterAadhaar') || '**** **** ****'}. 
          Select your preferred candidate below.
        </AuthSubtext>

        <CandidatesGrid>
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id}>
              <CandidateInfo>
                <CandidateSymbol style={{ background: candidate.color }}>
                  {candidate.symbol}
                </CandidateSymbol>
                <CandidateDetails>
                  <CandidateName>{candidate.name}</CandidateName>
                  <PartyName>{candidate.party}</PartyName>
                </CandidateDetails>
              </CandidateInfo>
              <VoteButton onClick={() => handleVote(candidate)}>
                Vote
              </VoteButton>
            </CandidateCard>
          ))}
        </CandidatesGrid>
      </Card>
    </Container>
  )
}

export default CandidateSelection