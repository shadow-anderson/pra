import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

/**
 * KPI Card with Horizontal Progress Bar
 * Displays completion percentage with a visual progress indicator
 */
const ProgressCard = ({ title, value, subtitle }) => {
  // Determine progress bar color based on value
  const getProgressColor = () => {
    if (value >= 80) return 'success';
    if (value >= 50) return 'warning';
    return 'error';
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

        {/* Value */}
        <Typography variant="h4" component="div" fontWeight="bold" sx={{ my: 2 }}>
          {value}%
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={value}
            color={getProgressColor()}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#E0E1DD',
            }}
          />
        </Box>

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

export default ProgressCard;
