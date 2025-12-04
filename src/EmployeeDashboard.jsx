import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Avatar,
  Chip,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { Home, Person } from '@mui/icons-material';
import EmployeeScorecard from './components/EmployeeScorecard';
import BehaviouralKpis from './components/BehaviouralKpis';
import MyTasks from './components/MyTasks';
import EvidenceUploadPanel from './components/EvidenceUploadPanel';

// Government-grade theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0D1B2A',
      light: '#1B263B',
    },
    secondary: {
      main: '#415A77',
    },
    background: {
      default: '#E0E1DD',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0D1B2A',
      secondary: '#415A77',
    },
    success: {
      main: '#2E7D32',
    },
    warning: {
      main: '#ED6C02',
    },
    error: {
      main: '#D32F2F',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Mock user data
const mockUserData = {
  name: 'Rajesh Kumar',
  role: 'Field Engineer',
  email: 'rajesh.kumar@prabhaav.com',
  department: 'Operations',
  employeeId: 'EMP-2024-1234',
  avatar: 'RK',
};

// Mock employee KPI data based on role
const mockEmployeeKpis = {
  // HQ KPIs (if applicable to role)
  hqKpis: {
    fileDisposalRate: { value: 85, type: 'number', unit: '%', trend: 'up' },
    medianTAT: { value: 2.1, type: 'number', unit: 'days', trend: 'down', status: 'success' },
    tatSlaCompliance: { value: 88, type: 'percentage' },
    queueLength: { value: 45, type: 'number', unit: 'files' },
    processingPerHour: { value: 11.2, type: 'number', unit: 'files/hr' },
    emailLatency: { value: 38, type: 'number', unit: 'mins', trend: 'down' },
  },
  // Field KPIs (if applicable to role)
  fieldKpis: {
    dprTimeliness: { value: 82, type: 'percentage' },
    dprQuality: { value: 88, type: 'score', max: 100 },
    surveyAccuracy: { value: 2.1, type: 'number', unit: 'mm', status: 'good' },
    milestoneHitRate: { value: 75, type: 'donut' },
    physicalProgress: { value: 0.85, planned: 1.0, type: 'ratio' },
    budgetVariance: { value: -2.3, type: 'number', unit: '%' },
    qcPassRate: { value: 93, type: 'percentage' },
    evidenceCompleteness: { value: 78, uploaded: 117, total: 150, type: 'percentage' },
  },
  // Behavioural KPIs (0-3 scale, shown as 0-30)
  behaviouralKpis: {
    initiative: { value: 2.5, max: 3 },
    communication: { value: 2.8, max: 3 },
    punctuality: { value: 2.2, max: 3 },
    teamwork: { value: 2.7, max: 3 },
  },
};

const EmployeeDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Person sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Prabhaav - Employee Dashboard
            </Typography>
            
            {/* User Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                  {mockUserData.name}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9, lineHeight: 1.2 }}>
                  {mockUserData.employeeId}
                </Typography>
              </Box>
              <Avatar
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  fontWeight: 'bold',
                }}
              >
                {mockUserData.avatar}
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 2 }} separator="›">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Home sx={{ fontSize: 18 }} />
              Home
            </Link>
            <Typography color="text.primary">Employee Dashboard</Typography>
          </Breadcrumbs>

          {/* Page Header */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h4">
              My KPIs
            </Typography>
            <Chip
              label={mockUserData.role}
              color="primary"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label={mockUserData.department}
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* Main Dashboard Grid */}
          <Grid container spacing={3}>
            {/* Left Column: Scorecard */}
            <Grid item xs={12} lg={8}>
              <EmployeeScorecard 
                hqKpis={mockEmployeeKpis.hqKpis}
                fieldKpis={mockEmployeeKpis.fieldKpis}
                userRole={mockUserData.role}
              />
            </Grid>

            {/* Right Column: Behavioural KPIs & Evidence Upload */}
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <BehaviouralKpis kpis={mockEmployeeKpis.behaviouralKpis} />
                </Grid>
                <Grid item xs={12}>
                  <EvidenceUploadPanel />
                </Grid>
              </Grid>
            </Grid>

            {/* Full Width: Tasks Section */}
            <Grid item xs={12}>
              <MyTasks />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EmployeeDashboard;
