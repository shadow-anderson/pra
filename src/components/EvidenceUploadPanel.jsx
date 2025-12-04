import { Paper, Typography, Box, Button } from '@mui/material';
import { CloudUpload, AccessTime } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

/**
 * Evidence Upload Quick Access Panel
 * Compact panel for quick access to evidence upload functionality
 */
const EvidenceUploadPanel = () => {
  const navigate = useNavigate();
  
  // Mock last upload timestamp
  const lastUploadTime = new Date('2025-12-02T14:30:00Z');

  const handleUploadClick = () => {
    // Navigate to upload page (or open modal)
    navigate('/upload');
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        background: 'linear-gradient(135deg, rgba(13, 27, 42, 0.03) 0%, rgba(65, 90, 119, 0.05) 100%)',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Icon Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: 'rgba(13, 27, 42, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CloudUpload sx={{ fontSize: 32, color: 'primary.main' }} />
        </Box>
      </Box>

      {/* Title */}
      <Typography variant="h6" align="center" gutterBottom>
        Evidence Upload
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        Upload field evidence and geo-tagged photos to improve your completeness score
      </Typography>

      {/* Upload Button */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<CloudUpload />}
        onClick={handleUploadClick}
        sx={{
          mb: 2,
          py: 1.5,
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
        }}
      >
        Upload Evidence
      </Button>

      {/* Last Upload Info */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          p: 1.5,
          backgroundColor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="caption" color="text.secondary">
          Last upload: {formatDistanceToNow(lastUploadTime, { addSuffix: true })}
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Box
        sx={{
          mt: 2,
          p: 1.5,
          backgroundColor: 'rgba(46, 125, 50, 0.08)',
          borderRadius: 1,
          borderLeft: '3px solid',
          borderLeftColor: 'success.main',
        }}
      >
        <Typography variant="caption" color="text.secondary" display="block" align="center">
          <strong>117/150</strong> evidence items submitted
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" align="center" sx={{ mt: 0.5 }}>
          Upload <strong>33 more</strong> to reach 100%
        </Typography>
      </Box>
    </Paper>
  );
};

export default EvidenceUploadPanel;
