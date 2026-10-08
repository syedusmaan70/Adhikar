import styled from 'styled-components'
import { Shield, Lock, Plus, BarChart3, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
`

const Sidebar = styled.div`
  width: 250px;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const LogoText = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e40af;
    margin: 0;
  }
  p {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }
`

const Nav = styled.nav`
  flex: 1;
  padding: 1rem 0;
`

const NavItem = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: ${props => props.active ? '#3b82f6' : '#64748b'};
  background: ${props => props.active ? '#eff6ff' : 'transparent'};
  text-decoration: none;
  transition: all 0.3s ease;
  border-right: ${props => props.active ? '3px solid #3b82f6' : '3px solid transparent'};

  &:hover {
    color: #3b82f6;
    background: #f8fafc;
  }
`

const StatusBadge = styled.div<{ color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.color === 'warning' ? '#fef3c7' : '#d1fae5'};
  color: ${props => props.color === 'warning' ? '#92400e' : '#065f46'};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: auto;
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #ef4444;
  background: transparent;
  border: none;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: auto;
  border-top: 1px solid #e2e8f0;

  &:hover {
    background: #fef2f2;
    cursor: pointer;
  }
`

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
`

const MainHeader = styled.div`
  margin-bottom: 2rem;
`

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
`

const PageSubtitle = styled.p`
  color: #64748b;
  margin: 0;
`

const ElectionCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
`

const LockIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #64748b;
`

const NotLiveTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 1rem;
`

const StartButton = styled.button`
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #4b5563;
  }
`

const AutoUnlockInfo = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 2rem;
`

const Countdown = styled.div`
  background: #eff6ff;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;
`

const CountdownLabel = styled.p`
  font-size: 0.875rem;
  color: #3b82f6;
  margin: 0 0 0.5rem 0;
`

const CountdownTime = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  font-family: 'Monaco', 'Menlo', monospace;
`

const ConfigSummary = styled.div`
  background: #f8fafc;
  border-radius: 1rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`

const ConfigItem = styled.div``

const ConfigLabel = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`

const ConfigValue = styled.p`
  font-size: 1rem;
  color: #1f2937;
  margin: 0;
  font-weight: 500;
`

function AdminDashboard() {
  const [countdown] = useState('0d 1h 59m 36s')
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated')
    if (!isAuthenticated) {
      navigate('/admin')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    navigate('/admin')
  }

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <Logo>
            <LogoIcon>
              <Shield size={20} />
            </LogoIcon>
            <LogoText>
              <h3>Project Adhikar</h3>
              <p>Administrator Dashboard</p>
            </LogoText>
          </Logo>
        </SidebarHeader>

        <Nav>
          <NavItem active onClick={() => handleNavigation('/admin/dashboard')}>
            <BarChart3 size={20} />
            Dashboard
            <StatusBadge color="warning">
              Awaiting Activation
            </StatusBadge>
          </NavItem>
          <NavItem onClick={() => handleNavigation('/admin/setup')}>
            <Plus size={20} />
            Create New Election
          </NavItem>
          <NavItem onClick={() => handleNavigation('/admin/vault')}>
            <Lock size={20} />
            Results
          </NavItem>
        </Nav>

        <LogoutButton onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </LogoutButton>
      </Sidebar>

      <MainContent>
        <MainHeader>
          <PageTitle>Municipal Election 2025</PageTitle>
          <PageSubtitle>Awaiting Activation</PageSubtitle>
        </MainHeader>

        <ElectionCard>
          <LockIcon>
            <Lock size={60} />
          </LockIcon>
          
          <NotLiveTitle>Election is Not Yet Live</NotLiveTitle>
          
          <StartButton>Start Election</StartButton>
          
          <AutoUnlockInfo>
            This control will unlock automatically on 9/19/2025 at 12:39:49 AM
          </AutoUnlockInfo>

          <Countdown>
            <CountdownLabel>Time until unlock:</CountdownLabel>
            <CountdownTime>{countdown}</CountdownTime>
          </Countdown>
        </ElectionCard>

        <ConfigSummary>
          <ConfigItem>
            <ConfigLabel>Start Time</ConfigLabel>
            <ConfigValue>9/19/2025, 12:39:49 AM</ConfigValue>
          </ConfigItem>
          <ConfigItem>
            <ConfigLabel>End Time</ConfigLabel>
            <ConfigValue>9/19/2025, 6:39:49 AM</ConfigValue>
          </ConfigItem>
          <ConfigItem>
            <ConfigLabel>Result Declaration</ConfigLabel>
            <ConfigValue>9/19/2025, 8:39:49 AM</ConfigValue>
          </ConfigItem>
        </ConfigSummary>
      </MainContent>
    </Container>
  )
}

export default AdminDashboard