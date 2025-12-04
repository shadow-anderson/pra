import { Paper, Typography, Box, Chip } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Warning, Error as ErrorIcon, CheckCircle } from '@mui/icons-material';

/**
 * Health Pulse Component
 * Radial health score with aggregated field performance indicators
 */
const HealthPulse = () => {
  // Mock health computation
  // Score based on: milestone delays, budget variance, QC fails, missing evidence
  const healthScore = 74;

  // Issue breakdown
  const issues = {
    milestoneDelay: 2,
    budgetIssues: 1,
    qcFails: 3,
    evidenceMissing: 26,
  };

  // Data for radial gauge
  const data = [
    { name: 'Health', value: healthScore },
    { name: 'Issues', value: 100 - healthScore },
  ];

  // Determine overall status
  const getHealthStatus = () => {
    if (healthScore >= 80) return { color: '#2E7D32', label: 'Healthy', icon: CheckCircle };
    if (healthScore >= 60) return { color: '#ED6C02', label: 'Caution', icon: Warning };
    return { color: '#D32F2F', label: 'Critical', icon: ErrorIcon };
  };

  const status = getHealthStatus();
  const COLORS = [status.color, '#E0E1DD'];

  // Traffic light indicators
  const trafficLights = [
    { label: 'On Track', count: 5, color: 'success' },
    { label: 'Caution', count: 3, color: 'warning' },
    { label: 'Failing', count: 2, color: 'error' },
  ];

  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Health Pulse
      </Typography>

      {/* Radial Gauge */}
      <Box 
        sx={{ 
          position: 'relative', 
          height: 180, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
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
              innerRadius={60}
              outerRadius={85}
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
          <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: status.color }}>
            {healthScore}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            / 100
          </Typography>
          <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5, color: status.color }}>
            {status.label}
          </Typography>
        </Box>
      </Box>

      {/* Overall Health Label */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="caption" color="text.secondary">
          Overall Field Health
        </Typography>
      </Box>

      {/* Traffic Light Indicators */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight={600} gutterBottom>
          Status Breakdown
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {trafficLights.map((light) => (
            <Box
              key={light.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: 
                      light.color === 'success' ? '#2E7D32' :
                      light.color === 'warning' ? '#ED6C02' : '#D32F2F',
                  }}
                />
                <Typography variant="caption">{light.label}</Typography>
              </Box>
              <Typography variant="caption" fontWeight={600}>
                {light.count}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Issue Capsules */}
      <Box>
        <Typography variant="body2" fontWeight={600} gutterBottom>
          Active Issues
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {issues.milestoneDelay > 0 && (
            <Chip
              label={`Milestone Lag: ${issues.milestoneDelay}`}
              size="small"
              color="warning"
              sx={{ justifyContent: 'flex-start' }}
            />
          )}
          {issues.budgetIssues > 0 && (
            <Chip
              label={`Budget Issues: ${issues.budgetIssues}`}
              size="small"
              color="error"
              sx={{ justifyContent: 'flex-start' }}
            />
          )}
          {issues.qcFails > 0 && (
            <Chip
              label={`QC Fails: High (${issues.qcFails})`}
              size="small"
              color="error"
              sx={{ justifyContent: 'flex-start' }}
            />
          )}
          {issues.evidenceMissing > 0 && (
            <Chip
              label={`Evidence Missing: ${issues.evidenceMissing}`}
              size="small"
              color="warning"
              sx={{ justifyContent: 'flex-start' }}
            />
          )}
        </Box>
      </Box>

      {/* Summary Note */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          backgroundColor: 'rgba(237, 108, 2, 0.08)',
          borderRadius: 1,
          borderLeft: '3px solid #ED6C02',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          <strong>Note:</strong> Health score factors in milestone delays, budget adherence,
          quality control results, and evidence completeness.
        </Typography>
      </Box>
    </Paper>
  );
};

export default HealthPulse;
