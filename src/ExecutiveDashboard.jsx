import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  Paper,
  AppBar,
  Toolbar,
} from '@mui/material';
import OrgPulse from './components/OrgPulse';
import TopRisks from './components/TopRisks';
import ExportAPAR from './components/ExportAPAR';

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

const ExecutiveDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Prabhaav - Executive Dashboard
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              HQ Leadership View
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Executive Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Organization Performance & Impact Monitoring
            </Typography>
          </Box>

          {/* Dashboard Sections */}
          <Grid container spacing={3}>
            {/* Section A: Org Pulse - Full Width */}
            <Grid item xs={12}>
              <OrgPulse />
            </Grid>

            {/* Section B & C: Side by Side on Desktop, Stacked on Mobile */}
            <Grid item xs={12} lg={8}>
              <TopRisks />
            </Grid>

            <Grid item xs={12} lg={4}>
              <ExportAPAR />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ExecutiveDashboard;
