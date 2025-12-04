import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useUploadStore } from './store/uploadStore';
import CameraPanel from './components/upload/CameraPanel';
import QueueStrip from './components/upload/QueueStrip';
import MetadataPanel from './components/upload/MetadataPanel';
import ProgressCard from './components/upload/ProgressCard';

// Minimal government theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0D1B2A',
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
  },
});

const EvidenceUpload = () => {
  const navigate = useNavigate();
  const { queue, selectedProject, selectedMilestone, setGeolocation } = useUploadStore();
  const [showWarning, setShowWarning] = useState(false);

  // Capture geolocation on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString(),
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setGeolocation(null);
        }
      );
    }
  }, [setGeolocation]);

  // Warn if uploading when navigating away
  useEffect(() => {
    const hasUploading = queue.some((item) => item.status === 'uploading');
    setShowWarning(hasUploading);

    const handleBeforeUnload = (e) => {
      if (hasUploading) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [queue]);

  const handleBack = () => {
    const hasUploading = queue.some((item) => item.status === 'uploading');
    if (hasUploading) {
      if (window.confirm('Upload in progress. Are you sure you want to leave?')) {
        navigate('/EmployeeDashboard');
      }
    } else {
      navigate('/EmployeeDashboard');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#F5F5F5',
          pb: 4,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: 'white',
            borderBottom: '1px solid #E0E0E0',
            py: 2,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <Container maxWidth="md">
            {/* Back Button */}
            <Link
              component="button"
              onClick={handleBack}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                mb: 1,
                textDecoration: 'none',
                color: 'text.secondary',
                fontSize: '14px',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: 0,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <ArrowBack sx={{ fontSize: 18 }} />
              Back to Dashboard
            </Link>

            {/* Title */}
            <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
              Upload Evidence
            </Typography>

            {/* Breadcrumbs */}
            <Breadcrumbs
              separator="›"
              sx={{
                fontSize: '13px',
                '& .MuiBreadcrumbs-separator': {
                  mx: 0.5,
                },
              }}
            >
              <Link
                underline="hover"
                color="inherit"
                href="/EmployeeDashboard"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <Home sx={{ fontSize: 14 }} />
                Dashboard
              </Link>
              <Typography color="text.primary" fontSize="13px">
                Upload
              </Typography>
            </Breadcrumbs>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="md" sx={{ mt: 3 }}>
          {/* Warning Banner */}
          {showWarning && (
            <Box
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: '#FFF3E0',
                border: '1px solid #FFB74D',
                borderRadius: 1,
                fontSize: '14px',
              }}
            >
              📤 Upload in progress. Please don't close this page.
            </Box>
          )}

          {/* Camera & Upload */}
          <CameraPanel />

          {/* Queue Strip */}
          {queue.length > 0 && <QueueStrip />}

          {/* Metadata Panel */}
          <MetadataPanel />

          {/* Progress Card */}
          {selectedProject && selectedMilestone && <ProgressCard />}

          {/* Help Text */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: 'white',
              borderRadius: 1,
              border: '1px solid #E0E0E0',
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block">
              <strong>Tip:</strong> Ensure good lighting and stable internet connection for best
              results. All uploads are automatically geo-tagged and timestamped.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EvidenceUpload;
