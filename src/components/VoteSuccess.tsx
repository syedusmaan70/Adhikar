import styled from 'styled-components'
import { CheckCircle, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
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
  max-width: 600px;
  width: 100%;
  text-align: center;
`

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #059669;
`

const ThankYouTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #059669;
  margin-bottom: 1rem;
`

const SuccessMessage = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`

const TransactionDetails = styled.div`
  background: #f8fafc;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
`

const TransactionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const TransactionLabel = styled.span`
  font-weight: 600;
  color: #374151;
`

const TransactionValue = styled.span`
  font-family: 'Monaco', 'Menlo', monospace;
  color: #6b7280;
  font-size: 0.9rem;
`

const CountdownContainer = styled.div`
  background: #d1fae5;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const CountdownText = styled.p`
  color: #059669;
  font-weight: 500;
  margin: 0;
  font-size: 0.9rem;
`

const CountdownTimer = styled.span`
  font-weight: 700;
  color: #047857;
`

interface VoteTransaction {
  transactionHash: string
  blockHash: string
  candidate: string
}

function VoteSuccess() {
  const [transaction, setTransaction] = useState<VoteTransaction | null>(null)
  const [countdown, setCountdown] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    const transactionData = sessionStorage.getItem('voteTransaction')
    if (transactionData) {
      setTransaction(JSON.parse(transactionData))
    } else {
      // If no transaction data, redirect to start
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Clear session data and redirect to start
          sessionStorage.clear()
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  if (!transaction) {
    return null
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
          <CheckCircle size={50} />
        </SuccessIcon>
        
        <ThankYouTitle>Thank You!</ThankYouTitle>
        <SuccessMessage>
          Your vote has been securely cast on the blockchain
        </SuccessMessage>

        <TransactionDetails>
          <TransactionRow>
            <TransactionLabel># Transaction:</TransactionLabel>
            <TransactionValue>{transaction.transactionHash}</TransactionValue>
          </TransactionRow>
          <TransactionRow>
            <TransactionLabel>Block:</TransactionLabel>
            <TransactionValue>{transaction.blockHash}</TransactionValue>
          </TransactionRow>
        </TransactionDetails>

        <CountdownContainer>
          <CheckCircle size={16} />
          <CountdownText>
            Screen will reset in <CountdownTimer>{countdown}</CountdownTimer> seconds
          </CountdownText>
        </CountdownContainer>
      </Card>
    </Container>
  )
}

export default VoteSuccess