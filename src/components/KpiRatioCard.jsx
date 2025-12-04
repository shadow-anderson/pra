import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

/**
 * KPI Ratio Card Component
 * Displays actual/planned progress ratio with visual bar
 */
const KpiRatioCard = ({ title, value, planned, subtitle }) => {
  const percentage = (value / planned) * 100;
  
  // Determine status color
  const getStatusColor = () => {
    if (percentage >= 90) return 'success.main';
    if (percentage >= 70) return 'warning.main';
    return 'error.main';
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

        {/* Ratio Value */}
        <Box sx={{ my: 1 }}>
          <Typography variant="h4" component="div" fontWeight="bold">
            {value.toFixed(2)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            (actual/planned ratio)
          </Typography>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 1, mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {percentage.toFixed(0)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(percentage, 100)}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#E0E1DD',
              '& .MuiLinearProgress-bar': {
                backgroundColor: getStatusColor(),
              },
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

export default KpiRatioCard;
