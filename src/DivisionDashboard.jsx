import {
  Box,
  Container,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Chip,
} from '@mui/material';
import { Apartment } from '@mui/icons-material';
import GanttLite from './components/GanttLite';
import FieldKpis from './components/FieldKpis';
import EvidenceFeed from './components/EvidenceFeed';
import HealthPulse from './components/HealthPulse';

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

// Mock milestone data for Gantt chart
const mockMilestones = [
  {
    id: 1,
    name: 'Land Survey',
    plannedStart: '2025-01-01',
    plannedEnd: '2025-01-10',
    actualStart: '2025-01-01',
    actualEnd: '2025-01-12',
    status: 'delayed',
  },
  {
    id: 2,
    name: 'Foundation Work',
    plannedStart: '2025-01-11',
    plannedEnd: '2025-01-20',
    actualStart: '2025-01-13',
    actualEnd: '2025-01-25',
    status: 'delayed',
  },
  {
    id: 3,
    name: 'Structural Framework',
    plannedStart: '2025-01-21',
    plannedEnd: '2025-02-05',
    actualStart: '2025-01-26',
    actualEnd: null,
    status: 'in-progress',
  },
  {
    id: 4,
    name: 'Electrical Installation',
    plannedStart: '2025-02-06',
    plannedEnd: '2025-02-20',
    actualStart: null,
    actualEnd: null,
    status: 'pending',
  },
  {
    id: 5,
    name: 'Quality Inspection',
    plannedStart: '2025-02-21',
    plannedEnd: '2025-02-28',
    actualStart: null,
    actualEnd: null,
    status: 'pending',
  },
];

const DivisionDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Apartment sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Prabhaav - Division Dashboard
            </Typography>
            <Chip
              label="Field View"
              size="small"
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Project Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Division: Northern Zone • Project: Infrastructure Development Phase 2
            </Typography>
          </Box>

          {/* Main Layout Grid */}
          <Grid container spacing={3}>
            {/* Section A: Gantt-lite Timeline - Full Width */}
            <Grid item xs={12}>
              <GanttLite milestones={mockMilestones} />
            </Grid>

            {/* Left Column: Health Pulse */}
            <Grid item xs={12} lg={3}>
              <HealthPulse />
            </Grid>

            {/* Center Column: Field KPIs */}
            <Grid item xs={12} lg={6}>
              <FieldKpis />
            </Grid>

            {/* Right Column: Evidence Feed */}
            <Grid item xs={12} lg={3}>
              <EvidenceFeed />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DivisionDashboard;
