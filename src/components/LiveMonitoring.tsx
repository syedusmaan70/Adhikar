import styled from 'styled-components'
import { Shield, Users, Vote, TrendingUp, Clock, LogOut, AlertTriangle } from 'lucide-react'
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
  cursor: pointer;

  &:hover {
    color: #3b82f6;
    background: #f8fafc;
  }
`

const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.status === 'live' ? '#d1fae5' : '#fef3c7'};
  color: ${props => props.status === 'live' ? '#065f46' : '#92400e'};
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`

const HeaderLeft = styled.div``

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

const EndElectionButton = styled.button`
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;

  &:hover {
    background: #b91c1c;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const StatLabel = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  margin: 0;
`

const StatIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background: ${props => 
    props.color === 'blue' ? '#eff6ff' :
    props.color === 'green' ? '#f0fdf4' :
    props.color === 'orange' ? '#fff7ed' :
    '#fef3c7'
  };
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => 
    props.color === 'blue' ? '#3b82f6' :
    props.color === 'green' ? '#22c55e' :
    props.color === 'orange' ? '#f97316' :
    '#f59e0b'
  };
`

const StatValue = styled.div<{ color?: string }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color || '#1e293b'};
  margin-bottom: 0.25rem;
`

const SystemHealth = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`

const HealthHeader = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1rem 0;
`

const HealthStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  background: #22c55e;
  border-radius: 50%;
`

const StatusText = styled.span`
  font-weight: 600;
  color: #059669;
`

const ScheduleInfo = styled.div`
  color: #64748b;
  font-size: 0.875rem;
`

function LiveMonitoring() {
  const navigate = useNavigate()
  const [timeRemaining] = useState('0d 23h 59m 58s')

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
          <NavItem active onClick={() => handleNavigation('/admin/live')}>
            <TrendingUp size={20} />
            Dashboard
            <StatusBadge status="live">Election is Live</StatusBadge>
          </NavItem>
          <NavItem onClick={() => handleNavigation('/admin/setup')}>
            <Users size={20} />
            Create New Election
          </NavItem>
          <NavItem onClick={() => handleNavigation('/admin/vault')}>
            <Vote size={20} />
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
          <HeaderLeft>
            <PageTitle>Live Status: Lok Sabha</PageTitle>
            <PageSubtitle>Election is currently active</PageSubtitle>
          </HeaderLeft>
          <EndElectionButton>
            <AlertTriangle size={20} />
            End Election Manually
          </EndElectionButton>
        </MainHeader>

        <StatsGrid>
          <StatCard>
            <StatHeader>
              <StatLabel>Total Voters</StatLabel>
              <StatIcon color="blue">
                <Users size={20} />
              </StatIcon>
            </StatHeader>
            <StatValue>15,420</StatValue>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatLabel>Total Votes Cast</StatLabel>
              <StatIcon color="green">
                <Vote size={20} />
              </StatIcon>
            </StatHeader>
            <StatValue color="#22c55e">13,045</StatValue>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatLabel>Live Turnout</StatLabel>
              <StatIcon color="orange">
                <TrendingUp size={20} />
              </StatIcon>
            </StatHeader>
            <StatValue color="#f97316">85%</StatValue>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatLabel>Time Remaining</StatLabel>
              <StatIcon color="yellow">
                <Clock size={20} />
              </StatIcon>
            </StatHeader>
            <StatValue style={{ fontSize: '1.5rem' }}>{timeRemaining}</StatValue>
          </StatCard>
        </StatsGrid>

        <SystemHealth>
          <HealthHeader>System Health</HealthHeader>
          <HealthStatus>
            <StatusIndicator />
            <StatusText>STATUS: ELECTION IS LIVE</StatusText>
          </HealthStatus>
          <ScheduleInfo>
            Scheduled End: 9/19/2025, 10:59:00 PM | Results: 9/19/2025, 11:00:00 PM
          </ScheduleInfo>
        </SystemHealth>
      </MainContent>
    </Container>
  )
}

export default LiveMonitoring