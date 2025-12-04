import { useState, useEffect } from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';
import { useUploadStore } from '../../store/uploadStore';

/**
 * Progress Card Component
 * Shows evidence completeness for selected milestone
 */
const ProgressCard = () => {
  const { queue, selectedMilestone } = useUploadStore();
  
  // Mock initial completeness (would come from API)
  const [initialCount] = useState(117);
  const [targetCount] = useState(150);
  
  // Calculate current completeness
  const uploadedCount = queue.filter((item) => item.status === 'done').length;
  const currentCount = initialCount + uploadedCount;
  const percentage = ((currentCount / targetCount) * 100).toFixed(1);

  // Get color based on percentage
  const getColor = () => {
    if (percentage >= 80) return '#2E7D32';
    if (percentage >= 50) return '#ED6C02';
    return '#D32F2F';
  };

  // Get status label
  const getStatusLabel = () => {
    if (percentage >= 80) return 'On Track';
    if (percentage >= 50) return 'Needs Attention';
    return 'Critical';
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 2,
        border: '1px solid #E0E0E0',
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        Milestone Progress
      </Typography>

      {/* Percentage display */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h3" fontWeight="bold" sx={{ color: getColor() }}>
            {percentage}%
          </Typography>
          <Typography
            variant="caption"
            sx={{
              px: 1.5,
              py: 0.5,
              backgroundColor: `${getColor()}20`,
              color: getColor(),
              borderRadius: 1,
              fontWeight: 600,
            }}
          >
            {getStatusLabel()}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Evidence completeness for this milestone
        </Typography>

        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={Math.min(parseFloat(percentage), 100)}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#E0E0E0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getColor(),
              borderRadius: 4,
            },
          }}
        />
      </Box>

      {/* Stats */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: '#F9F9F9',
          borderRadius: 1,
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Uploaded
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {currentCount}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Target
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {targetCount}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Remaining
          </Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ color: getColor() }}>
            {targetCount - currentCount}
          </Typography>
        </Box>
      </Box>

      {/* Just uploaded count */}
      {uploadedCount > 0 && (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            backgroundColor: '#E8F5E9',
            border: '1px solid #66BB6A',
            borderRadius: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            ✓ Just uploaded <strong>{uploadedCount}</strong> new evidence{uploadedCount > 1 ? 's' : ''}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ProgressCard;
