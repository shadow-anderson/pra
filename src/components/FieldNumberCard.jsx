import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

/**
 * Field Number Card Component
 * Displays numeric metrics with good/bad indicators for field dashboard
 */
const FieldNumberCard = ({ 
  title, 
  value, 
  unit, 
  subtitle, 
  threshold, 
  lowerIsBetter = false,
  showSign = false 
}) => {
  // Determine if value meets threshold
  const meetsThreshold = () => {
    if (!threshold) return null;
    
    if (lowerIsBetter) {
      return value <= threshold;
    }
    return value >= threshold;
  };

  const isGood = meetsThreshold();

  // Get status color
  const getStatusColor = () => {
    if (isGood === null) {
      // For budget variance (showSign mode)
      if (showSign) {
        return value >= 0 ? 'success.main' : 'error.main';
      }
      return 'primary.main';
    }
    return isGood ? 'success.main' : 'error.main';
  };

  const getStatusText = () => {
    if (isGood === null) return null;
    return isGood ? 'Good' : 'Needs Attention';
  };

  // Format value with sign if needed
  const formatValue = () => {
    if (showSign && value >= 0) {
      return `+${value}`;
    }
    return value;
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

        {/* Value with Indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
          {isGood !== null && (
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: getStatusColor(),
              }}
            />
          )}
          <Typography variant="h4" component="div" fontWeight="bold">
            {formatValue()}
            {unit && (
              <Typography
                component="span"
                variant="h6"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                {unit}
              </Typography>
            )}
          </Typography>
        </Box>

        {/* Status Badge */}
        {getStatusText() && (
          <Chip
            label={getStatusText()}
            size="small"
            sx={{
              backgroundColor: isGood ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
              color: getStatusColor(),
              fontWeight: 600,
              mb: 1,
            }}
          />
        )}

        {/* Subtitle */}
        {subtitle && (
          <Typography variant="caption" color="text.secondary" display="block">
            {subtitle}
          </Typography>
        )}

        {/* Threshold Reference */}
        {threshold && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            Target: {lowerIsBetter ? '≤' : '≥'} {threshold}{unit}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FieldNumberCard;
