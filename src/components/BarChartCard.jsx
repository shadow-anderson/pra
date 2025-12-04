import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

/**
 * KPI Card with Bar Chart
 * Displays multiple metrics in a simple bar chart format
 */
const BarChartCard = ({ title, data, subtitle }) => {
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

        {/* Bar Chart */}
        <Box sx={{ height: 140, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E1DD" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#415A77' }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11, fill: '#415A77' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(13, 27, 42, 0.9)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" fill="#0D1B2A" radius={[4, 4, 0, 0]} />
            </BarChart>
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

export default BarChartCard;
