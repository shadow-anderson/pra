import { Card, CardContent, Typography, Box, LinearProgress, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, CheckCircle, Warning } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

/**
 * Unified Employee KPI Card Component
 * Handles multiple KPI types: number, percentage, score, donut, ratio
 */
const EmployeeKpiCard = ({
  title,
  value,
  unit,
  type = 'number',
  trend,
  status,
  maxValue = 100,
  planned,
  uploaded,
  total,
  showSign = false,
}) => {
  // Render trend arrow
  const renderTrend = () => {
    if (!trend) return null;

    const color = trend === 'up' ? 'success.main' : trend === 'down' ? 'success.main' : 'text.secondary';
    const Icon = trend === 'up' ? TrendingUp : TrendingDown;

    return <Icon sx={{ fontSize: 18, color }} />;
  };

  // Render status badge
  const renderStatus = () => {
    if (!status) return null;

    const config = {
      good: { icon: CheckCircle, color: 'success' },
      success: { icon: CheckCircle, color: 'success' },
      warning: { icon: Warning, color: 'warning' },
      error: { icon: Warning, color: 'error' },
    };

    const statusConfig = config[status];
    if (!statusConfig) return null;

    const Icon = statusConfig.icon;
    return <Icon sx={{ fontSize: 18, color: `${statusConfig.color}.main` }} />;
  };

  // Format value with sign
  const formatValue = () => {
    if (showSign && value >= 0) return `+${value}`;
    return value;
  };

  // Render based on type
  const renderContent = () => {
    switch (type) {
      case 'percentage':
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                {value}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#E0E1DD',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: value >= 80 ? 'success.main' : value >= 60 ? 'warning.main' : 'error.main',
                },
              }}
            />
            {uploaded !== undefined && total !== undefined && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {uploaded} / {total} completed
              </Typography>
            )}
          </>
        );

      case 'score':
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                {value}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                / {maxValue}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(value / maxValue) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#E0E1DD',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'primary.main',
                },
              }}
            />
          </>
        );

      case 'donut':
        const donutData = [
          { name: 'Achieved', value: value },
          { name: 'Remaining', value: 100 - value },
        ];
        const COLORS = ['#0D1B2A', '#E0E1DD'];

        return (
          <Box sx={{ position: 'relative', height: 100, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {value}%
              </Typography>
            </Box>
          </Box>
        );

      case 'ratio':
        const percentage = (value / planned) * 100;
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                {value.toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
              {percentage.toFixed(0)}% of planned
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(percentage, 100)}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#E0E1DD',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: percentage >= 90 ? 'success.main' : percentage >= 70 ? 'warning.main' : 'error.main',
                },
              }}
            />
          </>
        );

      case 'number':
      default:
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" fontWeight="bold">
              {formatValue()}
              {unit && (
                <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 0.5 }}>
                  {unit}
                </Typography>
              )}
            </Typography>
            {renderTrend()}
            {renderStatus()}
          </Box>
        );
    }
  };

  return (
    <Card
      elevation={1}
      sx={{
        height: '100%',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
          {title}
        </Typography>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default EmployeeKpiCard;
