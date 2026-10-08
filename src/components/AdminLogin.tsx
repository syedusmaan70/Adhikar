import styled from 'styled-components'
import { Shield, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const LoginCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 500px;
  width: 100%;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`

const LogoIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #3b82f6;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const PasswordContainer = styled.div`
  position: relative;
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.3s ease;

  &:hover {
    color: #374151;
  }
`

const LoginButton = styled.button`
  background: #1e40af;
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
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 10px 25px -5px rgba(30, 64, 175, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const DemoCredentials = styled.div`
  background: #eff6ff;
  border: 1px solid #dbeafe;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 2rem;
`

const DemoTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 1rem 0;
`

const DemoItem = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #1e40af;
`

const DemoLabel = styled.span`
  font-weight: 600;
`

const DemoValue = styled.span`
  font-family: 'Monaco', 'Menlo', monospace;
`

function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (username === 'admin' && password === 'adhikar2024') {
      setLoading(true)
      
      // Simulate login process
      setTimeout(() => {
        setLoading(false)
        sessionStorage.setItem('adminAuthenticated', 'true')
        navigate('/admin/dashboard')
      }, 1500)
    } else {
      alert('Invalid credentials. Please use the demo credentials shown below.')
    }
  }

  return (
    <Container>
      <LoginCard>
        <Header>
          <LogoIcon>
            <Shield size={40} />
          </LogoIcon>
          <Title>Project Adhikar</Title>
          <Subtitle>Administrator Login</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordContainer>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </PasswordContainer>
          </FormGroup>

          <LoginButton type="submit" disabled={loading}>
            <Shield size={20} />
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </LoginButton>
        </Form>

        <DemoCredentials>
          <DemoTitle>Demo Credentials:</DemoTitle>
          <DemoItem>
            <DemoLabel>Username: </DemoLabel>
            <DemoValue>admin</DemoValue>
          </DemoItem>
          <DemoItem>
            <DemoLabel>Password: </DemoLabel>
            <DemoValue>adhikar2024</DemoValue>
          </DemoItem>
        </DemoCredentials>
      </LoginCard>
    </Container>
  )
}

export default AdminLogin