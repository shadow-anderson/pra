import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { CheckCircle, Warning } from '@mui/icons-material';

/**
 * KPI Score Card Component
 * Displays score with benchmark indicator
 */
const KpiScoreCard = ({ title, value, maxValue = 100, subtitle, threshold }) => {
  const percentage = (value / maxValue) * 100;
  const meetsThreshold = threshold ? value >= threshold : true;

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

        {/* Score Value */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
          <Typography variant="h4" component="div" fontWeight="bold">
            {value}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            / {maxValue}
          </Typography>
          {meetsThreshold ? (
            <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
          ) : (
            <Warning sx={{ color: 'warning.main', fontSize: 20 }} />
          )}
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#E0E1DD',
              '& .MuiLinearProgress-bar': {
                backgroundColor: meetsThreshold ? 'success.main' : 'warning.main',
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

export default KpiScoreCard;
