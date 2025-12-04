import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Chip,
} from '@mui/material';
import { LocationOn, Schedule, CheckCircle, Cancel } from '@mui/icons-material';
import { useUploadStore } from '../../store/uploadStore';

// Mock projects and milestones
const mockProjects = [
  { id: 'proj-1', name: 'Infrastructure Development Phase 2' },
  { id: 'proj-2', name: 'Highway Construction Project' },
  { id: 'proj-3', name: 'Urban Renewal Initiative' },
];

const mockMilestones = {
  'proj-1': [
    { id: 'ms-1-1', name: 'Land Survey' },
    { id: 'ms-1-2', name: 'Foundation Work' },
    { id: 'ms-1-3', name: 'Structural Framework' },
  ],
  'proj-2': [
    { id: 'ms-2-1', name: 'Site Preparation' },
    { id: 'ms-2-2', name: 'Road Base Construction' },
    { id: 'ms-2-3', name: 'Surface Paving' },
  ],
  'proj-3': [
    { id: 'ms-3-1', name: 'Demolition Phase' },
    { id: 'ms-3-2', name: 'Infrastructure Setup' },
    { id: 'ms-3-3', name: 'Building Construction' },
  ],
};

/**
 * Metadata Panel Component
 * Captures project, milestone, geolocation, and timestamp
 */
const MetadataPanel = () => {
  const { selectedProject, selectedMilestone, geolocation, setProject, setMilestone } =
    useUploadStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get available milestones
  const availableMilestones = selectedProject
    ? mockMilestones[selectedProject] || []
    : [];

  // Format timestamp
  const formatTimestamp = (date) => {
    return date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 2,
        border: '1px solid #E0E0E0',
        borderRadius: 2,
      }}
    >
      <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        Evidence Metadata
      </Typography>

      {/* Project Dropdown */}
      <TextField
        fullWidth
        select
        label="Project"
        value={selectedProject}
        onChange={(e) => setProject(e.target.value)}
        required
        size="medium"
        sx={{ mb: 2 }}
        InputLabelProps={{
          sx: { fontWeight: 500 },
        }}
      >
        <MenuItem value="">
          <em>Select Project</em>
        </MenuItem>
        {mockProjects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Milestone Dropdown */}
      <TextField
        fullWidth
        select
        label="Milestone"
        value={selectedMilestone}
        onChange={(e) => setMilestone(e.target.value)}
        required
        disabled={!selectedProject}
        size="medium"
        sx={{ mb: 2 }}
        InputLabelProps={{
          sx: { fontWeight: 500 },
        }}
      >
        <MenuItem value="">
          <em>Select Milestone</em>
        </MenuItem>
        {availableMilestones.map((milestone) => (
          <MenuItem key={milestone.id} value={milestone.id}>
            {milestone.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Auto-captured metadata */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: 2,
          backgroundColor: '#F9F9F9',
          borderRadius: 1,
          border: '1px solid #E0E0E0',
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Auto-captured Data
        </Typography>

        {/* Geolocation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {geolocation ? (
            <>
              <CheckCircle sx={{ fontSize: 18, color: '#2E7D32' }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  Geo-tag captured
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {geolocation.latitude.toFixed(4)}° N, {geolocation.longitude.toFixed(4)}° E
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Cancel sx={{ fontSize: 18, color: '#9E9E9E' }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Location off
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Enable location services for geo-tagging
                </Typography>
              </Box>
            </>
          )}
        </Box>

        {/* Timestamp */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Schedule sx={{ fontSize: 18, color: '#0D1B2A' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={500}>
              Captured at: {formatTimestamp(currentTime)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Timestamp will be attached to all uploads
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Warning if metadata incomplete */}
      {(!selectedProject || !selectedMilestone) && (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            backgroundColor: '#FFF3E0',
            border: '1px solid #FFB74D',
            borderRadius: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            ⚠️ Please select project and milestone before uploading
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default MetadataPanel;
