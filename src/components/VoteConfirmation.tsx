import styled from 'styled-components'
import { Fingerprint, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`

const Modal = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
`

const CandidateInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 1rem;
`

const CandidateSymbol = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
  font-weight: bold;
  background: ${(props) => props.color};
`

const CandidateDetails = styled.div`
  text-align: left;
`

const CandidateName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
`

const PartyName = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
`

const StepIndicator = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #3b82f6;
  margin-bottom: 1rem;
`

const WarningMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #fef3c7;
  color: #92400e;
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ConfirmButton = styled.button<{ scanning?: boolean }>`
  background: ${(props) => props.scanning ? '#10b981' : '#059669'};
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
  gap: 0.75rem;
  transition: all 0.3s ease;
  transform: ${(props) => props.scanning ? 'scale(1.02)' : 'scale(1)'};

  &:hover {
    background: ${(props) => props.scanning ? '#047857' : '#047857'};
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: scale(1);
  }
`

const CancelButton = styled.button`
  background: transparent;
  color: #64748b;
  border: none;
  border-radius: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f1f5f9;
    color: #475569;
  }
`

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

interface Candidate {
  id: number
  name: string
  party: string
  symbol: string
  color: string
}

function VoteConfirmation() {
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [scanning, setScanning] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const candidateData = sessionStorage.getItem('selectedCandidate')
    if (candidateData) {
      setCandidate(JSON.parse(candidateData))
    } else {
      // If no candidate data, redirect back to voting
      navigate('/vote')
    }
  }, [navigate])

  const handleConfirm = async () => {
    setScanning(true)
    setStatus('Scanning fingerprint for confirmation...')
    
    // Step 3: Compare Scan #2 against Session Template
    setTimeout(() => {
      setStatus('Comparing with session template...')
      
      // Simulate fingerprint comparison (80% success rate)
      const fingerprintMatch = Math.random() > 0.2
      
      setTimeout(() => {
        if (!fingerprintMatch) {
          const newFailedAttempts = failedAttempts + 1
          setFailedAttempts(newFailedAttempts)
          setScanning(false)
          setStatus('')
          
          if (newFailedAttempts >= 3) {
            alert('Session Aborted: Too many failed fingerprint attempts. Your token remains un-voted.')
            sessionStorage.clear()
            navigate('/')
            return
          }
          
          alert(`Fingerprint mismatch. Attempt ${newFailedAttempts}/3. Please try again.`)
          return
        }
        
        // Successful match - call smart contract
        setStatus('Casting vote on blockchain...')
        
        setTimeout(() => {
          setStatus('Vote confirmed and recorded!')
          
          // Generate transaction details
          const transactionHash = '0x' + Math.random().toString(16).substr(2, 8)
          const blockHash = '0x' + Math.random().toString(16).substr(2, 8)
          
          sessionStorage.setItem('voteTransaction', JSON.stringify({
            transactionHash,
            blockHash,
            candidate: candidate?.name,
            voterToken: 'TOKEN_' + Math.random().toString(16).substr(2, 8).toUpperCase()
          }))
          
          setTimeout(() => {
            setScanning(false)
            navigate('/success')
          }, 1000)
        }, 2000)
      }, 2000)
    }, 1500)
  }

  const handleCancel = () => {
    navigate('/vote')
  }

  if (!candidate) {
    return null
  }

  return (
    <Overlay>
      <Modal>
        <Title>Confirm Your Vote</Title>
        
        <CandidateInfo>
          <CandidateSymbol color={candidate.color}>
            {candidate.symbol}
          </CandidateSymbol>
          <CandidateDetails>
            <CandidateName>{candidate.name}</CandidateName>
            <PartyName>{candidate.party}</PartyName>
          </CandidateDetails>
        </CandidateInfo>

        <StepIndicator>
          Step 2: Confirm Your Choice with Fingerprint Scan #{failedAttempts > 0 ? `(Attempt ${failedAttempts + 1}/3)` : '2'}
        </StepIndicator>

        <WarningMessage>
          <Shield size={16} />
          Your vote will be permanently recorded on the blockchain and cannot be changed.
        </WarningMessage>

        <ButtonGroup>
          <ConfirmButton 
            onClick={handleConfirm} 
            scanning={scanning}
            disabled={scanning}
          >
            {scanning ? (
              <>
                <LoadingSpinner />
                {status || 'Confirming Vote...'}
              </>
            ) : (
              <>
                <Fingerprint size={20} />
                Confirm Vote with Fingerprint Scan
              </>
            )}
          </ConfirmButton>
          
          <CancelButton onClick={handleCancel} disabled={scanning}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  )
}

export default VoteConfirmation