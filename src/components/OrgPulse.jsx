import { Box, Grid, Paper, Typography } from '@mui/material';
import KpiNumberCard from './KpiNumberCard';
import KpiSparklineCard from './KpiSparklineCard';
import KpiDonutCard from './KpiDonutCard';
import ProgressCard from './ProgressCard';
import BarChartCard from './BarChartCard';

// Mock data for KPIs
const mockKpiData = {
  fileDisposalRate: {
    value: 82,
    unit: '%',
    trend: [65, 70, 75, 78, 80, 82, 85, 83, 82],
    subtitle: 'Files disposed vs received (weekly)',
  },
  medianTAT: {
    value: '2.4',
    unit: 'days',
    status: 'success', // success, warning, error
    subtitle: 'Median time to close a file',
  },
  tatSlaCompliance: {
    value: 87,
    subtitle: 'Files closed within SLA',
  },
  avgQueueLength: {
    value: 156,
    unit: 'files',
    subtitle: 'Pending files today',
  },
  docProcessingRate: {
    value: 12.5,
    unit: 'files/hr',
    subtitle: 'Files processed / HR working hour',
  },
  emailLatency: {
    value: '42',
    unit: 'mins',
    trend: 'down', // up, down, neutral
    subtitle: 'Avg first response time',
  },
  projectSuccessRate: {
    value: 76,
    subtitle: 'Projects delivered on-time & on-budget',
  },
  avgTimeToUnblock: {
    value: '3.2',
    unit: 'hrs',
    subtitle: 'Workflow unblock time',
  },
  trainingCompletion: {
    value: 68,
    subtitle: 'Mandatory training completion %',
  },
  adoptionMetrics: {
    data: [
      { name: 'Active Users', value: 450 },
      { name: 'Uploads', value: 320 },
      { name: 'Daily Logins', value: 380 },
    ],
    subtitle: 'Adoption metrics across org tools',
  },
  dataFreshness: {
    value: '15',
    unit: 'mins',
    subtitle: 'Delay between event and KPI update',
  },
};

const OrgPulse = () => {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Organization Pulse
      </Typography>

      <Grid container spacing={3}>
        {/* Row 1 */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <KpiSparklineCard
            title="File Disposal Rate"
            value={mockKpiData.fileDisposalRate.value}
            unit={mockKpiData.fileDisposalRate.unit}
            trend={mockKpiData.fileDisposalRate.trend}
            subtitle={mockKpiData.fileDisposalRate.subtitle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <KpiNumberCard
            title="Median TAT"
            value={mockKpiData.medianTAT.value}
            unit={mockKpiData.medianTAT.unit}
            status={mockKpiData.medianTAT.status}
            subtitle={mockKpiData.medianTAT.subtitle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <KpiDonutCard
            title="TAT SLA Compliance"
            value={mockKpiData.tatSlaCompliance.value}
            subtitle={mockKpiData.tatSlaCompliance.subtitle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <KpiNumberCard
            title="Average Queue Length"
            value={mockKpiData.avgQueueLength.value}
            unit={mockKpiData.avgQueueLength.unit}
            subtitle={mockKpiData.avgQueueLength.subtitle}
          />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <KpiNumberCard
            title="Doc Processing Rate"
            value={mockKpiData.docProcessingRate.value}
            unit={mockKpiData.docProcessingRate.unit}
            subtitle={mockKpiData.docProcessingRate.subtitle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <KpiNumberCard
            title="Email/Response Latency"
            value={mockKpiData.emailLatency.value}
            unit={mockKpiData.emailLatency.unit}
            trend={mockKpiData.emailLatency.trend}
            subtitle={mockKpiData.emailLatency.subtitle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <KpiDonutCard
            title="Project Success Rate"
            value={mockKpiData.projectSuccessRate.value}
            subtitle={mockKpiData.projectSuccessRate.subtitle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <KpiNumberCard
            title="Avg Time to Unblock"
            value={mockKpiData.avgTimeToUnblock.value}
            unit={mockKpiData.avgTimeToUnblock.unit}
            subtitle={mockKpiData.avgTimeToUnblock.subtitle}
          />
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProgressCard
            title="Training Completion"
            value={mockKpiData.trainingCompletion.value}
            subtitle={mockKpiData.trainingCompletion.subtitle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={6}>
          <BarChartCard
            title="Adoption Metrics"
            data={mockKpiData.adoptionMetrics.data}
            subtitle={mockKpiData.adoptionMetrics.subtitle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <KpiNumberCard
            title="Data Freshness"
            value={mockKpiData.dataFreshness.value}
            unit={mockKpiData.dataFreshness.unit}
            subtitle={mockKpiData.dataFreshness.subtitle}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrgPulse;
