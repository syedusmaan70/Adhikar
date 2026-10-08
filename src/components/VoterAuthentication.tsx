import styled from 'styled-components'
import { Fingerprint, Shield, Settings } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  max-width: 500px;
  width: 100%;
  text-align: center;
`

const FingerprintIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #3b82f6;
`

const StepTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`

const StepDescription = styled.p`
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`

const ScanButton = styled.button<{ scanning?: boolean }>`
  background: ${(props) => props.scanning ? '#10b981' : '#3b82f6'};
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  transition: all 0.3s ease;
  transform: ${(props) => props.scanning ? 'scale(1.02)' : 'scale(1)'};

  &:hover {
    background: ${(props) => props.scanning ? '#059669' : '#2563eb'};
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`

const AadhaarInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 0.1em;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

const AdminPortalButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`

const VoterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

function VoterAuthentication() {
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [scanning, setScanning] = useState(false)
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const handleScan = async () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      alert('Please enter a valid 12-digit Aadhaar number')
      return
    }

    setScanning(true)
    setStatus('Checking voter registration...')
    
    // Phase 2: Live Voting Implementation
    // Step 1: Smart Contract Check - Look up voter's token
    setTimeout(() => {
      setStatus('Verifying token on blockchain...')
      
      // Simulate blockchain token lookup
      const tokenStatus = Math.random() > 0.1 ? 'UN-VOTED' : Math.random() > 0.5 ? 'VOTED' : 'NOT_FOUND'
      
      if (tokenStatus === 'NOT_FOUND') {
        setScanning(false)
        setStatus('')
        alert('Not Registered: Your Aadhaar number is not found in the voter list.')
        return
      }
      
      if (tokenStatus === 'VOTED') {
        setScanning(false)
        setStatus('')
        alert('Already Voted: This Aadhaar number has already been used to cast a vote.')
        return
      }
      
      // Step 2: Live UIDAI API Check
      setTimeout(() => {
        setStatus('Verifying with UIDAI database...')
        
        // Simulate UIDAI verification
        setTimeout(() => {
          setStatus('Authenticating fingerprint...')
          
          // Simulate fingerprint verification
          const uidaiVerified = Math.random() > 0.2 // 80% success rate
          
          setTimeout(() => {
            setScanning(false)
            setStatus('')
            
            if (!uidaiVerified) {
              alert('Authentication Failed: Fingerprint does not match UIDAI records.')
              return
            }
            
            // Create session template and navigate to ballot
            sessionStorage.setItem('voterAadhaar', aadhaarNumber)
            sessionStorage.setItem('sessionTemplate', 'fingerprint_template_' + Date.now())
            navigate('/vote')
          }, 1500)
        }, 1000)
      }, 1500)
    }, 1000)
  }

  const formatAadhaar = (value: string) => {
    // Remove non-digits and limit to 12 digits
    const digits = value.replace(/\D/g, '').substring(0, 12)
    return digits
  }

  return (
    <Container>
      <AdminPortalButton onClick={() => navigate('/admin')}>
        <Settings size={16} />
        Admin Portal
      </AdminPortalButton>

      <VoterSection>
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
          <FingerprintIcon>
            <Fingerprint size={40} />
          </FingerprintIcon>
          
          <StepTitle>Step 1: Verify Your Identity</StepTitle>
          <StepDescription>
            {status || "Please enter your Aadhaar number and place your finger on the scanner to authenticate"}
          </StepDescription>

          <AadhaarInput
            type="text"
            placeholder="Enter 12-digit Aadhaar Number"
            value={aadhaarNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAadhaarNumber(formatAadhaar(e.target.value))}
            maxLength={12}
          />

          <ScanButton 
            onClick={handleScan} 
            scanning={scanning}
            disabled={scanning || aadhaarNumber.length !== 12}
          >
            {scanning ? (
              <>
                <LoadingSpinner />
                {status || 'Scanning Fingerprint...'}
              </>
            ) : (
              <>
                <Fingerprint size={20} />
                Scan Fingerprint
              </>
            )}
          </ScanButton>
        </Card>
      </VoterSection>
    </Container>
  )
}

export default VoterAuthentication