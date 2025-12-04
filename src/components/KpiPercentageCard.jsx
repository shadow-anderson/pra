import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

/**
 * KPI Percentage Card Component
 * Displays percentage values with color-coded status indicators
 */
const KpiPercentageCard = ({ title, value, subtitle, threshold, uploaded, total }) => {
  // Determine status color based on threshold
  const getStatusColor = () => {
    if (!threshold) return 'primary.main';
    
    if (typeof threshold === 'object') {
      if (value >= threshold.good) return 'success.main';
      if (value >= threshold.warning) return 'warning.main';
      return 'error.main';
    }
    
    return value >= threshold ? 'success.main' : 'warning.main';
  };

  const getStatusText = () => {
    if (!threshold) return null;
    
    if (typeof threshold === 'object') {
      if (value >= threshold.good) return 'Good';
      if (value >= threshold.warning) return 'Caution';
      return 'Critical';
    }
    
    return value >= threshold ? 'On Track' : 'Below Target';
  };

  return (
    <Card 
      elevation={1} 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        {/* Value with Status Indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: getStatusColor(),
            }}
          />
          <Typography variant="h4" component="div" fontWeight="bold">
            {value.toFixed(1)}%
          </Typography>
        </Box>

        {/* Status Text */}
        {getStatusText() && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: getStatusColor(),
              fontWeight: 600,
              display: 'block',
              mb: 1,
            }}
          >
            {getStatusText()}
          </Typography>
        )}

        {/* Progress Bar (if uploaded/total provided) */}
        {uploaded !== undefined && total !== undefined && (
          <Box sx={{ mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(uploaded / total) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#E0E1DD',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getStatusColor(),
                },
              }}
            />
          </Box>
        )}

        {/* Subtitle */}
        {subtitle && (
          <Typography variant="caption" color="text.secondary" display="block">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default KpiPercentageCard;
