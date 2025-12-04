import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

/**
 * KPI Card with Sparkline Trend Chart
 * Shows a large number with a mini trend visualization below
 */
const KpiSparklineCard = ({ title, value, unit, trend, subtitle }) => {
  // Transform trend array into chart data format
  const chartData = trend.map((val, idx) => ({
    index: idx,
    value: val,
  }));

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
        <Typography variant="h4" component="div" fontWeight="bold" sx={{ my: 1 }}>
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

        {/* Sparkline Chart */}
        <Box sx={{ height: 40, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <Box
                        sx={{
                          backgroundColor: 'rgba(13, 27, 42, 0.9)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: 1,
                          fontSize: '12px',
                        }}
                      >
                        {payload[0].value}%
                      </Box>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0D1B2A"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Subtitle */}
        {subtitle && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default KpiSparklineCard;
