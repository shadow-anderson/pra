import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

/**
 * KPI Card with Semi-Donut Gauge
 * Displays percentage as a semi-circular gauge chart
 */
const KpiDonutCard = ({ title, value, subtitle }) => {
  // Prepare data for semi-donut chart
  const data = [
    { name: 'Completed', value: value },
    { name: 'Remaining', value: 100 - value },
  ];

  const COLORS = ['#0D1B2A', '#E0E1DD'];

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

        {/* Semi-Donut Chart */}
        <Box 
          sx={{ 
            position: 'relative', 
            height: 120, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            my: 2,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={45}
                outerRadius={60}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -25%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              met SLA
            </Typography>
          </Box>
        </Box>

        {/* Subtitle */}
        {subtitle && (
          <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default KpiDonutCard;
