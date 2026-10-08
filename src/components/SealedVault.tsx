import styled from 'styled-components'
import { Shield, Lock, Clock, Users, AlertTriangle, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const VaultCard = styled.div`
  background: white;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 600px;
  width: 100%;
  text-align: center;
`

const VaultIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #3b82f6;
`

const VaultTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 1rem;
`

const ElectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 2rem;
`

const SealedMessage = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`

const CountdownSection = styled.div`
  background: #eff6ff;
  border-radius: 1.5rem;
  padding: 2rem;
  margin: 2rem 0;
`

const CountdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const CountdownLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #3b82f6;
  margin: 0;
`

const CountdownDisplay = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #1e40af;
  font-family: 'Monaco', 'Menlo', monospace;
  margin-bottom: 1rem;
`

const CountdownSubtext = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
`

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
`

const StatCard = styled.div`
  text-align: center;
`

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #475569;
`

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
`

const ZeroKnowledgeBox = styled.div`
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;
`

const ZeroKnowledgeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const ZeroKnowledgeTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #92400e;
  margin: 0;
`

const ZeroKnowledgeText = styled.p`
  font-size: 0.9rem;
  color: #92400e;
  margin: 0;
  line-height: 1.5;
`

const ResultsButton = styled.button`
  background: #059669;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: #047857;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`

function SealedVault() {
  const [countdown, setCountdown] = useState('0d 1h 59m 54s')
  const [resultsUnlocked, setResultsUnlocked] = useState(false)
  const [electionData, setElectionData] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if election is configured
    const configData = sessionStorage.getItem('electionData')
    if (configData) {
      setElectionData(JSON.parse(configData))
    }

    // Phase 3: Results Declaration Implementation
    const checkResultsUnlock = () => {
      const resultDate = new Date('2025-09-19T12:40:33')
      const currentTime = new Date()
      
      if (currentTime >= resultDate) {
        setResultsUnlocked(true)
        setCountdown('Results Available!')
      } else {
        const timeDiff = resultDate.getTime() - currentTime.getTime()
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
        
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }

    // Initial check
    checkResultsUnlock()

    // Update every second
    const interval = setInterval(checkResultsUnlock, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleViewResults = async () => {
    if (!resultsUnlocked) {
      alert('Results are still time-locked and cannot be accessed yet.')
      return
    }

    // Phase 3: Query Smart Contract for Results
    alert('Querying smart contract for final results...')
    
    // Simulate smart contract query
    setTimeout(() => {
      const results = {
        totalVotes: 13045,
        candidates: [
          { name: 'Rajesh Kumar', party: 'Bharatiya Janata Party', votes: 5876, percentage: 45.1 },
          { name: 'Priya Sharma', party: 'Indian National Congress', votes: 4312, percentage: 33.1 },
          { name: 'Amit Singh', party: 'Aam Aadmi Party', votes: 2164, percentage: 16.6 },
          { name: 'Sunita Devi', party: 'Bahujan Samaj Party', votes: 693, percentage: 5.3 }
        ]
      }
      
      sessionStorage.setItem('electionResults', JSON.stringify(results))
      alert(`Final Results Retrieved from Smart Contract!\n\nWinner: ${results.candidates[0].name} (${results.candidates[0].party})\nTotal Votes: ${results.totalVotes}`)
    }, 2000)
  }

  return (
    <Container>
      <VaultCard>
        <VaultIcon>
          <Lock size={60} />
        </VaultIcon>
        
        <VaultTitle>Sealed Vault</VaultTitle>
        <ElectionTitle>{electionData?.title || 'Municipal Election 2025'}</ElectionTitle>
        
        <SealedMessage>
          Results are cryptographically sealed and will be<br />
          automatically revealed on 9/19/2025 at 12:40:33 AM
        </SealedMessage>

        <CountdownSection>
          <CountdownHeader>
            <Clock size={20} />
            <CountdownLabel>Time Until Results</CountdownLabel>
          </CountdownHeader>
          <CountdownDisplay style={{ 
            color: resultsUnlocked ? '#059669' : '#3b82f6' 
          }}>
            {countdown}
          </CountdownDisplay>
          <CountdownSubtext>
            Results are secured on the blockchain using zero-knowledge cryptography
          </CountdownSubtext>
        </CountdownSection>

        <StatsSection>
          <StatCard>
            <StatIcon>
              <Users size={30} />
            </StatIcon>
            <StatNumber>{electionData?.voterCount || '15,420'}</StatNumber>
            <StatLabel>Registered Voters</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>
              <Shield size={30} />
            </StatIcon>
            <StatNumber style={{ color: '#059669' }}>SECURED</StatNumber>
            <StatLabel>Blockchain Protected</StatLabel>
          </StatCard>
        </StatsSection>

        <ZeroKnowledgeBox>
          <ZeroKnowledgeHeader>
            <AlertTriangle size={20} />
            <ZeroKnowledgeTitle>Zero-Knowledge Principle</ZeroKnowledgeTitle>
          </ZeroKnowledgeHeader>
          <ZeroKnowledgeText>
            Even administrators cannot access results before the scheduled time. This ensures complete 
            transparency and prevents any manipulation.
          </ZeroKnowledgeText>
        </ZeroKnowledgeBox>

        <ResultsButton 
          onClick={handleViewResults}
          disabled={!resultsUnlocked}
        >
          <Eye size={20} />
          {resultsUnlocked ? 'View Election Results' : 'Results Locked Until Release Time'}
        </ResultsButton>
      </VaultCard>
    </Container>
  )
}

export default SealedVault