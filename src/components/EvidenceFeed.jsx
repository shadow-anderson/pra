import { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import { LocationOn, Close } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

// Mock evidence data
const mockEvidence = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=120&h=120&fit=crop',
    uploader: 'Ravi Kumar',
    role: 'Field Engineer',
    timestamp: '2025-12-04T10:30:00Z',
    geotag: '28.6139° N, 77.2090° E',
    location: 'Site A - Foundation',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=120&h=120&fit=crop',
    uploader: 'Priya Sharma',
    role: 'QC Inspector',
    timestamp: '2025-12-04T09:15:00Z',
    geotag: '28.6140° N, 77.2095° E',
    location: 'Site A - Quality Check',
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=120&h=120&fit=crop',
    uploader: 'Amit Patel',
    role: 'Site Supervisor',
    timestamp: '2025-12-04T08:45:00Z',
    geotag: '28.6138° N, 77.2088° E',
    location: 'Site B - Steel Framework',
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1590650213165-d99f956611d5?w=120&h=120&fit=crop',
    uploader: 'Sneha Reddy',
    role: 'Safety Officer',
    timestamp: '2025-12-04T07:30:00Z',
    geotag: '28.6142° N, 77.2092° E',
    location: 'Site A - Safety Inspection',
  },
  {
    id: 5,
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120&h=120&fit=crop',
    uploader: 'Vikram Singh',
    role: 'Field Engineer',
    timestamp: '2025-12-03T16:20:00Z',
    geotag: '28.6141° N, 77.2091° E',
    location: 'Site C - Excavation',
  },
  {
    id: 6,
    thumbnail: 'https://images.unsplash.com/photo-1625773032657-a17e80e3e5e5?w=120&h=120&fit=crop',
    uploader: 'Anita Desai',
    role: 'Documentation Lead',
    timestamp: '2025-12-03T14:10:00Z',
    geotag: '28.6137° N, 77.2089° E',
    location: 'Site B - Progress Review',
  },
];

/**
 * Evidence Feed Component
 * Vertical scrollable feed of field evidence with image previews
 */
const EvidenceFeed = () => {
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  const handleOpenModal = (evidence) => {
    setSelectedEvidence(evidence);
  };

  const handleCloseModal = () => {
    setSelectedEvidence(null);
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, height: '100%', maxHeight: '800px', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Evidence Feed
        </Typography>

        {/* Scrollable Feed */}
        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
          {mockEvidence.map((evidence, index) => (
            <Box
              key={evidence.id}
              sx={{
                mb: 2,
                pb: 2,
                borderBottom: index < mockEvidence.length - 1 ? '1px solid #E0E1DD' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                borderRadius: 1,
                p: 1,
                '&:hover': {
                  backgroundColor: 'rgba(13, 27, 42, 0.02)',
                },
              }}
              onClick={() => handleOpenModal(evidence)}
            >
              {/* Thumbnail */}
              <Box
                component="img"
                src={evidence.thumbnail}
                alt={evidence.location}
                sx={{
                  width: '100%',
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 1,
                }}
              />

              {/* Uploader Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: 'primary.main',
                    fontSize: '14px',
                  }}
                >
                  {evidence.uploader.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                    {evidence.uploader}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                    {evidence.role}
                  </Typography>
                </Box>
              </Box>

              {/* Timestamp */}
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                {formatDistanceToNow(new Date(evidence.timestamp), { addSuffix: true })}
              </Typography>

              {/* Geotag Badge */}
              <Chip
                icon={<LocationOn sx={{ fontSize: 14 }} />}
                label={evidence.location}
                size="small"
                sx={{
                  fontSize: '11px',
                  height: 22,
                  backgroundColor: 'rgba(13, 27, 42, 0.08)',
                }}
              />
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Evidence Detail Modal */}
      <Dialog
        open={Boolean(selectedEvidence)}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        {selectedEvidence && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Evidence Details</Typography>
              <IconButton onClick={handleCloseModal} size="small">
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {/* Full Image */}
              <Box
                component="img"
                src={selectedEvidence.thumbnail.replace('w=120&h=120', 'w=800&h=600')}
                alt={selectedEvidence.location}
                sx={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: 1,
                  mb: 2,
                }}
              />

              {/* Details */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: 'primary.main',
                  }}
                >
                  {selectedEvidence.uploader.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedEvidence.uploader}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedEvidence.role}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Location:</strong> {selectedEvidence.location}
                </Typography>
                <Typography variant="body2">
                  <strong>Coordinates:</strong> {selectedEvidence.geotag}
                </Typography>
                <Typography variant="body2">
                  <strong>Uploaded:</strong>{' '}
                  {formatDistanceToNow(new Date(selectedEvidence.timestamp), { addSuffix: true })} (
                  {new Date(selectedEvidence.timestamp).toLocaleString()})
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} variant="outlined">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default EvidenceFeed;
