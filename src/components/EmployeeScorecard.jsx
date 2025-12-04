import { Paper, Typography, Box, Grid } from '@mui/material';
import EmployeeKpiCard from './EmployeeKpiCard';

/**
 * Employee Scorecard Component
 * Displays all applicable KPIs for the employee based on their role
 */
const EmployeeScorecard = ({ hqKpis, fieldKpis, userRole }) => {
  // Determine which KPI sections to show based on role
  const showHqKpis = ['Admin', 'HQ', 'Manager'].some(r => userRole.includes(r));
  const showFieldKpis = ['Field', 'Engineer', 'Site'].some(r => userRole.includes(r));

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Performance Scorecard
      </Typography>

      {/* HQ KPIs Section */}
      {showHqKpis && hqKpis && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
            HQ KPIs
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="File Disposal Rate"
                value={hqKpis.fileDisposalRate.value}
                unit={hqKpis.fileDisposalRate.unit}
                type="number"
                trend={hqKpis.fileDisposalRate.trend}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="Median TAT"
                value={hqKpis.medianTAT.value}
                unit={hqKpis.medianTAT.unit}
                type="number"
                trend={hqKpis.medianTAT.trend}
                status={hqKpis.medianTAT.status}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="TAT SLA Compliance"
                value={hqKpis.tatSlaCompliance.value}
                type="percentage"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="Queue Length"
                value={hqKpis.queueLength.value}
                unit={hqKpis.queueLength.unit}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="Processing per Work-hour"
                value={hqKpis.processingPerHour.value}
                unit={hqKpis.processingPerHour.unit}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="Email Response Latency"
                value={hqKpis.emailLatency.value}
                unit={hqKpis.emailLatency.unit}
                type="number"
                trend={hqKpis.emailLatency.trend}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Field KPIs Section */}
      {showFieldKpis && fieldKpis && (
        <Box>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
            Field KPIs
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="DPR Timeliness"
                value={fieldKpis.dprTimeliness.value}
                type="percentage"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="DPR Quality"
                value={fieldKpis.dprQuality.value}
                maxValue={fieldKpis.dprQuality.max}
                type="score"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="Survey Accuracy (RMSE)"
                value={fieldKpis.surveyAccuracy.value}
                unit={fieldKpis.surveyAccuracy.unit}
                type="number"
                status={fieldKpis.surveyAccuracy.status}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="Milestone Hit Rate"
                value={fieldKpis.milestoneHitRate.value}
                type="donut"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="Physical Progress Index"
                value={fieldKpis.physicalProgress.value}
                planned={fieldKpis.physicalProgress.planned}
                type="ratio"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="Budget Variance"
                value={fieldKpis.budgetVariance.value}
                unit={fieldKpis.budgetVariance.unit}
                type="number"
                showSign={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="QC Pass Rate"
                value={fieldKpis.qcPassRate.value}
                type="percentage"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmployeeKpiCard
                title="Evidence Completeness"
                value={fieldKpis.evidenceCompleteness.value}
                uploaded={fieldKpis.evidenceCompleteness.uploaded}
                total={fieldKpis.evidenceCompleteness.total}
                type="percentage"
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default EmployeeScorecard;
