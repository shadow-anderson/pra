import { Grid } from '@mui/material';
import KpiPercentageCard from './KpiPercentageCard';
import KpiScoreCard from './KpiScoreCard';
import FieldNumberCard from './FieldNumberCard';
import KpiDonutCard from './KpiDonutCard';
import KpiRatioCard from './KpiRatioCard';

// Mock field KPI data
const mockFieldKpis = {
  dprTimeliness: {
    value: 78,
    subtitle: 'DPR submitted on time',
    threshold: { good: 80, warning: 60 },
  },
  dprQualityScore: {
    value: 85,
    subtitle: 'Quality benchmark: 80+',
    threshold: 80,
  },
  surveyAccuracy: {
    value: 2.3,
    unit: 'mm',
    subtitle: 'Root Mean Square Error from baseline',
    threshold: 3.0,
    lowerIsBetter: true,
  },
  milestoneHitRate: {
    value: 72,
    subtitle: '% milestones achieved on schedule',
  },
  physicalProgress: {
    value: 0.82,
    planned: 1.0,
    subtitle: '82% of planned progress',
  },
  budgetVariance: {
    value: -3.5,
    unit: '%',
    subtitle: 'Budget adherence',
  },
  qcPassRate: {
    value: 91,
    subtitle: 'On-site QC pass rate',
    threshold: { good: 90, warning: 75 },
  },
  evidenceCompleteness: {
    value: 82.7,
    subtitle: '124/150 evidence items submitted',
    uploaded: 124,
    total: 150,
  },
};

const FieldKpis = () => {
  return (
    <Grid container spacing={2}>
      {/* Row 1 */}
      <Grid item xs={12} sm={6} md={4}>
        <KpiPercentageCard
          title="DPR Timeliness"
          value={mockFieldKpis.dprTimeliness.value}
          subtitle={mockFieldKpis.dprTimeliness.subtitle}
          threshold={mockFieldKpis.dprTimeliness.threshold}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <KpiScoreCard
          title="DPR Quality Score"
          value={mockFieldKpis.dprQualityScore.value}
          maxValue={100}
          subtitle={mockFieldKpis.dprQualityScore.subtitle}
          threshold={mockFieldKpis.dprQualityScore.threshold}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <FieldNumberCard
          title="Survey Accuracy (RMSE)"
          value={mockFieldKpis.surveyAccuracy.value}
          unit={mockFieldKpis.surveyAccuracy.unit}
          subtitle={mockFieldKpis.surveyAccuracy.subtitle}
          threshold={mockFieldKpis.surveyAccuracy.threshold}
          lowerIsBetter={mockFieldKpis.surveyAccuracy.lowerIsBetter}
        />
      </Grid>

      {/* Row 2 */}
      <Grid item xs={12} sm={6} md={4}>
        <KpiDonutCard
          title="Milestone Hit Rate"
          value={mockFieldKpis.milestoneHitRate.value}
          subtitle={mockFieldKpis.milestoneHitRate.subtitle}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <KpiRatioCard
          title="Physical Progress Index"
          value={mockFieldKpis.physicalProgress.value}
          planned={mockFieldKpis.physicalProgress.planned}
          subtitle={mockFieldKpis.physicalProgress.subtitle}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <FieldNumberCard
          title="Budget Variance"
          value={mockFieldKpis.budgetVariance.value}
          unit={mockFieldKpis.budgetVariance.unit}
          subtitle={mockFieldKpis.budgetVariance.subtitle}
          showSign={true}
        />
      </Grid>

      {/* Row 3 */}
      <Grid item xs={12} sm={6} md={4}>
        <KpiPercentageCard
          title="On-site QC Pass Rate"
          value={mockFieldKpis.qcPassRate.value}
          subtitle={mockFieldKpis.qcPassRate.subtitle}
          threshold={mockFieldKpis.qcPassRate.threshold}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <KpiPercentageCard
          title="Field Evidence Completeness"
          value={mockFieldKpis.evidenceCompleteness.value}
          subtitle={mockFieldKpis.evidenceCompleteness.subtitle}
          uploaded={mockFieldKpis.evidenceCompleteness.uploaded}
          total={mockFieldKpis.evidenceCompleteness.total}
        />
      </Grid>
    </Grid>
  );
};

export default FieldKpis;
