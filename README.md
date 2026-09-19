# Project Adhikar - Blockchain Voting System

A secure, transparent blockchain-based voting system with biometric authentication and cryptographic result sealing.

## Features

### Voter Interface
- **Aadhaar-based Authentication**: Secure fingerprint scanning for voter verification
- **Candidate Selection**: Clean, intuitive ballot interface
- **Vote Confirmation**: Two-step fingerprint verification (Adhikar Protocol)
- **Blockchain Receipt**: Transaction confirmation with blockchain hash

### Administrator Interface
- **Election Setup**: Configure candidates, voter lists, and election schedule
- **Live Monitoring**: Real-time election statistics and voter turnout
- **Sealed Vault**: Cryptographically secured results with time-locked access
- **Zero-Knowledge Results**: Results are inaccessible even to admins until scheduled time

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Styled Components
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/suhanafalak06/adhikar.git
cd adhikar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Application Routes

### Voter Flow
- `/` - Voter Authentication (Aadhaar + Fingerprint)
- `/vote` - Candidate Selection
- `/confirm` - Vote Confirmation Modal
- `/success` - Vote Success with Blockchain Receipt

### Admin Flow
- `/admin` - Administrator Login
- `/admin/dashboard` - Election Dashboard
- `/admin/setup` - Election Configuration
- `/admin/live` - Live Election Monitoring
- `/admin/vault` - Sealed Results Vault

## Demo Credentials

**Administrator Login:**
- Username: `admin`
- Password: `adhikar2024`

## Key Security Features

### Three-Phase Voting Process

**Phase 1: Pre-Election Configuration**
- Admin uploads voter list and candidate details
- System generates anonymous voting tokens
- Smart contract deployment with configuration

**Phase 2: Live Voting**
- Dual fingerprint verification (Adhikar Protocol)
- Smart contract token validation
- Live UIDAI API verification
- Secure vote casting with blockchain recording

**Phase 3: Results Declaration**
- Time-locked cryptographic vault
- Zero-knowledge principle (admin-inaccessible until scheduled time)
- Automatic result revelation after predetermined time

### Anonymous Voting Tokens
- Cryptographically generated unique identifiers
- No personal information stored
- Blockchain-based vote tracking
- One-time use with burn mechanism

## Project Structure

```
src/
├── components/
│   ├── VoterAuthentication.tsx    # Aadhaar + Fingerprint scanning
│   ├── CandidateSelection.tsx     # Voting ballot interface
│   ├── VoteConfirmation.tsx       # Confirmation modal
│   ├── VoteSuccess.tsx            # Success page with receipt
│   ├── AdminLogin.tsx             # Admin authentication
│   ├── AdminDashboard.tsx         # Election management
│   ├── ElectionSetup.tsx          # Election configuration
│   ├── LiveMonitoring.tsx         # Real-time statistics
│   └── SealedVault.tsx            # Cryptographic results vault
├── App.tsx                        # Main routing component
├── main.tsx                       # Application entry point
└── index.css                      # Global styles
```

## Build and Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for transparent, secure democratic processes
- Built with modern web technologies for scalability and security
- Designed with user experience and accessibility in mind
