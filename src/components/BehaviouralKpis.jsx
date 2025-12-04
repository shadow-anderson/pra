import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { Star, StarBorder, StarHalf } from '@mui/icons-material';

/**
 * Behavioural KPIs Component
 * Displays non-editable behavioural ratings (0-3 scale shown as 0-30)
 */
const BehaviouralKpis = ({ kpis }) => {
  const behaviouralItems = [
    { key: 'initiative', label: 'Initiative' },
    { key: 'communication', label: 'Communication' },
    { key: 'punctuality', label: 'Punctuality & Discipline' },
    { key: 'teamwork', label: 'Teamwork' },
  ];

  // Render star rating (0-3 scale)
  const renderStars = (value) => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.5;

    for (let i = 0; i < 3; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} sx={{ color: '#ED6C02', fontSize: 20 }} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i} sx={{ color: '#ED6C02', fontSize: 20 }} />);
      } else {
        stars.push(<StarBorder key={i} sx={{ color: '#E0E1DD', fontSize: 20 }} />);
      }
    }
    return stars;
  };

  // Convert 0-3 scale to 0-30
  const scaleToThirty = (value) => {
    return ((value / 3) * 30).toFixed(0);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Behavioural KPIs
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {behaviouralItems.map((item) => {
          const kpiData = kpis[item.key];
          const scaledValue = scaleToThirty(kpiData.value);
          const percentage = (kpiData.value / kpiData.max) * 100;

          return (
            <Box
              key={item.key}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                backgroundColor: 'background.paper',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: 1,
                },
              }}
            >
              {/* KPI Name */}
              <Typography variant="body2" fontWeight={600} gutterBottom>
                {item.label}
              </Typography>

              {/* Star Rating Display */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {renderStars(kpiData.value)}
                </Box>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {scaledValue}/30
                </Typography>
              </Box>

              {/* Progress Bar */}
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#E0E1DD',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor:
                      percentage >= 80
                        ? 'success.main'
                        : percentage >= 60
                        ? 'warning.main'
                        : 'error.main',
                  },
                }}
              />

              {/* Raw Score */}
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Rating: {kpiData.value.toFixed(1)} / {kpiData.max}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Summary Note */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          backgroundColor: 'rgba(13, 27, 42, 0.04)',
          borderRadius: 1,
          borderLeft: '3px solid',
          borderLeftColor: 'primary.main',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          <strong>Note:</strong> Behavioural KPIs are assessed by your reporting manager
          and contribute to your overall performance rating.
        </Typography>
      </Box>
    </Paper>
  );
};

export default BehaviouralKpis;
