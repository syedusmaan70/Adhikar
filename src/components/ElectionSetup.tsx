import styled from 'styled-components'
import { Shield, Calendar, Upload, Plus, FileText, LogOut } from 'lucide-react'
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
  max-width: 1200px;
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

const FormSection = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #eff6ff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

const WarningBox = styled.div`
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #92400e;
  font-size: 0.875rem;
`

const CandidatesSection = styled.div`
  margin-bottom: 1.5rem;
`

const CandidateInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
`

const AddButton = styled.button`
  background: #f97316;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #ea580c;
  }
`

const UploadSection = styled.div`
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  background: #f8fafc;
  margin-bottom: 1.5rem;
`

const UploadIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #64748b;
`

const UploadText = styled.p`
  color: #64748b;
  margin-bottom: 1rem;
`

const ChooseFileButton = styled.button`
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  &:hover {
    background: #eff6ff;
  }
`

const DeployButton = styled.button`
  background: #7c3aed;
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
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background: #6d28d9;
  }
`

const DeployNote = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 1rem;
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

function ElectionSetup() {
  const navigate = useNavigate()
  const [electionTitle, setElectionTitle] = useState('e.g., Municipal Election 2025')
  const [deploying, setDeploying] = useState(false)
  const [deployStatus, setDeployStatus] = useState('')
  const [uploadedVoters, setUploadedVoters] = useState<number>(0)

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate voter list processing
      const voterCount = Math.floor(Math.random() * 10000) + 5000
      setUploadedVoters(voterCount)
      alert(`Voter list uploaded successfully! ${voterCount} voters found.`)
    }
  }

  const handleDeploy = async () => {
    if (uploadedVoters === 0) {
      alert('Please upload voter list first!')
      return
    }

    setDeploying(true)
    setDeployStatus('Validating election configuration...')

    // Phase 1: Pre-Election Configuration simulation
    setTimeout(() => {
      setDeployStatus(`Generating ${uploadedVoters} anonymous voting tokens...`)
      
      setTimeout(() => {
        setDeployStatus('Deploying Smart Contract to Private Ethereum Blockchain...')
        
        setTimeout(() => {
          setDeployStatus('Smart Contract deployed successfully!')
          
          // Store election configuration
          sessionStorage.setItem('electionConfigured', 'true')
          sessionStorage.setItem('electionData', JSON.stringify({
            title: electionTitle,
            voterCount: uploadedVoters,
            contractAddress: '0x' + Math.random().toString(16).substr(2, 8),
            deploymentTime: new Date().toISOString()
          }))
          
          setTimeout(() => {
            setDeploying(false)
            setDeployStatus('')
            alert('Election configuration deployed successfully! The system is now ready for voting.')
            navigate('/admin/dashboard')
          }, 1500)
        }, 2000)
      }, 2000)
    }, 1500)
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
          <NavItem onClick={() => handleNavigation('/admin/dashboard')}>
            <Calendar size={20} />
            Dashboard
          </NavItem>
          <NavItem active onClick={() => handleNavigation('/admin/setup')}>
            <Plus size={20} />
            Create New Election
          </NavItem>
          <NavItem onClick={() => handleNavigation('/admin/vault')}>
            <FileText size={20} />
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
          <PageTitle>Step 1: Configure Election Parameters</PageTitle>
          <PageSubtitle>Set up your election with irreversible parameters</PageSubtitle>
        </MainHeader>

        <FormSection>
          <SectionHeader>
            <SectionIcon>
              <Calendar size={20} />
            </SectionIcon>
            <SectionTitle>Election Schedule</SectionTitle>
          </SectionHeader>

          <FormGroup>
            <Label>Election Title</Label>
            <Input
              type="text"
              value={electionTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setElectionTitle(e.target.value)}
              placeholder="e.g., Municipal Election 2025"
            />
          </FormGroup>

          <FormGrid>
            <FormGroup>
              <Label>Start Date</Label>
              <Input type="date" defaultValue="2025-09-19" />
            </FormGroup>
            <FormGroup>
              <Label>Start Time</Label>
              <Input type="time" defaultValue="00:39" />
            </FormGroup>
            <FormGroup>
              <Label>End Date</Label>
              <Input type="date" defaultValue="2025-09-19" />
            </FormGroup>
            <FormGroup>
              <Label>End Time</Label>
              <Input type="time" defaultValue="06:39" />
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionHeader>
            <SectionIcon>
              <Shield size={20} />
            </SectionIcon>
            <SectionTitle>Result Declaration (Crucial Feature)</SectionTitle>
          </SectionHeader>

          <FormGrid>
            <FormGroup>
              <Label>Result Declaration Date</Label>
              <Input type="date" defaultValue="2025-09-19" />
            </FormGroup>
            <FormGroup>
              <Label>Result Declaration Time</Label>
              <Input type="time" defaultValue="08:39" />
            </FormGroup>
          </FormGrid>

          <WarningBox>
            <Shield size={16} />
            Results will be cryptographically sealed and impossible to view, even by an administrator, until this exact time.
          </WarningBox>
        </FormSection>

        <FormSection>
          <SectionHeader>
            <SectionIcon>
              <Plus size={20} />
            </SectionIcon>
            <SectionTitle>Manage Candidates & Voters</SectionTitle>
          </SectionHeader>

          <CandidatesSection>
            <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Add Candidates</h3>
            <CandidateInputs>
              <Input placeholder="Candidate Name" />
              <Input placeholder="Party Name" />
              <Input placeholder="Party Symbol (emoji)" />
              <AddButton>
                <Plus size={16} />
                Add
              </AddButton>
            </CandidateInputs>
          </CandidatesSection>

          <div>
            <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Upload Voter List</h3>
            <UploadSection>
              <UploadIcon>
                <Upload size={30} />
              </UploadIcon>
              <UploadText>
                {uploadedVoters > 0 
                  ? `✅ ${uploadedVoters} voters uploaded and ready for token generation`
                  : 'Upload CSV file with voter information (Aadhaar numbers required)'
                }
              </UploadText>
              <ChooseFileButton>
                <FileText size={16} />
                <input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="voterUpload"
                />
                <label htmlFor="voterUpload" style={{ cursor: 'pointer' }}>
                  Choose File
                </label>
              </ChooseFileButton>
            </UploadSection>
          </div>
        </FormSection>

        <FormSection>
          <DeployButton onClick={handleDeploy} disabled={deploying || uploadedVoters === 0}>
            {deploying ? (
              <>
                <LoadingSpinner />
                {deployStatus || 'Deploying...'}
              </>
            ) : (
              <>
                <Shield size={20} />
                Deploy Election Configuration
              </>
            )}
          </DeployButton>
          <DeployNote>
            This action generates anonymous tokens, deploys smart contract, and is irreversible once confirmed
          </DeployNote>
        </FormSection>
      </MainContent>
    </Container>
  )
}

export default ElectionSetup