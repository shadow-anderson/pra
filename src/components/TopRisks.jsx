import { Paper, Typography, Box } from '@mui/material';
import RiskList from './RiskList';

// Mock risk data with severity and breakdown
const mockRisks = [
  {
    id: 1,
    name: 'Field Office - Chennai TAT Breach',
    severity: 'red',
    breakdown: {
      tat: '5.2 days (Target: 2.5)',
      queueLength: '245 files',
      externalDelays: '12 pending approvals',
      impactScore: 'High',
    },
  },
  {
    id: 2,
    name: 'Northern Region SLA Compliance Drop',
    severity: 'red',
    breakdown: {
      tat: '4.8 days (Target: 3.0)',
      queueLength: '189 files',
      externalDelays: '8 inter-dept delays',
      impactScore: 'High',
    },
  },
  {
    id: 3,
    name: 'Document Processing Backlog - Zone 3',
    severity: 'amber',
    breakdown: {
      tat: '3.5 days (Target: 2.5)',
      queueLength: '167 files',
      externalDelays: '5 system issues',
      impactScore: 'Medium',
    },
  },
  {
    id: 4,
    name: 'Email Response Latency - HQ',
    severity: 'amber',
    breakdown: {
      tat: '65 mins (Target: 45)',
      queueLength: 'N/A',
      externalDelays: 'Peak hour load',
      impactScore: 'Medium',
    },
  },
  {
    id: 5,
    name: 'Training Completion - Field Units',
    severity: 'amber',
    breakdown: {
      tat: 'N/A',
      queueLength: 'N/A',
      externalDelays: '45% completion rate',
      impactScore: 'Medium',
    },
  },
  {
    id: 6,
    name: 'Data Freshness Degradation',
    severity: 'amber',
    breakdown: {
      tat: '28 mins lag (Target: 15)',
      queueLength: 'N/A',
      externalDelays: 'Sync delays',
      impactScore: 'Medium',
    },
  },
  {
    id: 7,
    name: 'Queue Build-up - Western Zone',
    severity: 'green',
    breakdown: {
      tat: '2.8 days (Target: 3.0)',
      queueLength: '98 files',
      externalDelays: 'None',
      impactScore: 'Low',
    },
  },
  {
    id: 8,
    name: 'Project Delivery - Phase 2 Delay',
    severity: 'green',
    breakdown: {
      tat: '2 days behind schedule',
      queueLength: 'N/A',
      externalDelays: 'Vendor coordination',
      impactScore: 'Low',
    },
  },
  {
    id: 9,
    name: 'System Adoption - New Module',
    severity: 'green',
    breakdown: {
      tat: 'N/A',
      queueLength: 'N/A',
      externalDelays: '72% adoption',
      impactScore: 'Low',
    },
  },
  {
    id: 10,
    name: 'Archive Processing Rate',
    severity: 'green',
    breakdown: {
      tat: '1.5 days (Target: 2.0)',
      queueLength: '45 files',
      externalDelays: 'None',
      impactScore: 'Low',
    },
  },
];

const TopRisks = () => {
  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Top 10 Risks
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Real-time risk monitoring across organization operations
      </Typography>

      <RiskList risks={mockRisks} />
    </Paper>
  );
};

export default TopRisks;
