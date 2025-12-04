import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, Remove } from '@mui/icons-material';

/**
 * Reusable KPI Number Card Component
 * Displays a large number with optional status indicator and trend arrow
 */
const KpiNumberCard = ({ title, value, unit, status, trend, subtitle }) => {
  // Status indicator color mapping
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'success.main';
      case 'warning':
        return 'warning.main';
      case 'error':
        return 'error.main';
      default:
        return 'transparent';
    }
  };

  // Trend icon rendering
  const renderTrendIcon = () => {
    if (!trend) return null;
    
    const iconStyle = { fontSize: 20 };
    const color = trend === 'up' ? 'error.main' : trend === 'down' ? 'success.main' : 'text.secondary';

    if (trend === 'up') return <TrendingUp sx={{ ...iconStyle, color }} />;
    if (trend === 'down') return <TrendingDown sx={{ ...iconStyle, color }} />;
    return <Remove sx={{ ...iconStyle, color }} />;
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
          {status && (
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
            {value}
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
          {renderTrendIcon()}
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

export default KpiNumberCard;
