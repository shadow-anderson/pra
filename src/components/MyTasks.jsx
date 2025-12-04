import { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert, Flag, CheckCircle, Schedule } from '@mui/icons-material';

// Mock tasks data
const mockTasks = [
  {
    id: 1,
    title: 'Submit Monthly DPR',
    description: 'Complete and submit the Daily Progress Report for all ongoing projects',
    status: 'pending',
    kpiLink: 'DPR Timeliness',
    deadline: '2025-12-06',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Quality Control Inspection - Site A',
    description: 'Conduct QC inspection at Site A foundation work and upload evidence',
    status: 'in-progress',
    kpiLink: 'QC Pass Rate',
    deadline: '2025-12-05',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Upload Field Evidence Photos',
    description: 'Upload geo-tagged photos of completed work at Site B',
    status: 'in-progress',
    kpiLink: 'Evidence Completeness',
    deadline: '2025-12-04',
    priority: 'critical',
  },
  {
    id: 4,
    title: 'Update Milestone Progress',
    description: 'Update actual completion dates for milestones 3 and 4',
    status: 'pending',
    kpiLink: 'Milestone Hit Rate',
    deadline: '2025-12-07',
    priority: 'medium',
  },
  {
    id: 5,
    title: 'Review Budget Variance Report',
    description: 'Analyze and comment on Q4 budget variance report',
    status: 'done',
    kpiLink: 'Budget Variance',
    deadline: '2025-12-02',
    priority: 'medium',
  },
  {
    id: 6,
    title: 'Respond to Pending Emails',
    description: 'Clear pending email responses from last 24 hours',
    status: 'done',
    kpiLink: 'Email Response Latency',
    deadline: '2025-12-03',
    priority: 'low',
  },
];

/**
 * My Tasks Component
 * Displays user tasks with filtering and status management
 */
const MyTasks = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const [tasks, setTasks] = useState(mockTasks);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filter tasks based on tab
  const filteredTasks = tasks.filter((task) => {
    if (currentTab === 'all') return true;
    return task.status === currentTab;
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Handle status menu
  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? { ...task, status: newStatus } : task
        )
      );
    }
    handleMenuClose();
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  // Get deadline color
  const getDeadlineColor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return 'error';
    if (daysUntil <= 1) return 'error';
    if (daysUntil <= 3) return 'warning';
    return 'success';
  };

  // Format deadline
  const formatDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return 'Overdue';
    if (daysUntil === 0) return 'Today';
    if (daysUntil === 1) return 'Tomorrow';
    return `${daysUntil} days`;
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'done':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'in-progress':
        return <Schedule sx={{ fontSize: 16 }} />;
      default:
        return <Flag sx={{ fontSize: 16 }} />;
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        My Tasks
      </Typography>

      {/* Filter Tabs */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="All" value="all" />
        <Tab label="Pending" value="pending" />
        <Tab label="In Progress" value="in-progress" />
        <Tab label="Done" value="done" />
      </Tabs>

      {/* Task List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredTasks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No tasks found in this category
            </Typography>
          </Box>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: 2,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {/* Task Content */}
                  <Box sx={{ flexGrow: 1 }}>
                    {/* Title and Priority */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {task.title}
                      </Typography>
                      <Chip
                        label={task.priority.toUpperCase()}
                        size="small"
                        color={getPriorityColor(task.priority)}
                        sx={{ height: 20, fontSize: '10px' }}
                      />
                    </Box>

                    {/* Description */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {task.description}
                    </Typography>

                    {/* Metadata Chips */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {/* Status Chip */}
                      <Chip
                        icon={getStatusIcon(task.status)}
                        label={getStatusLabel(task.status)}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />

                      {/* KPI Link Chip */}
                      <Chip
                        label={`→ ${task.kpiLink}`}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(13, 27, 42, 0.08)',
                          fontWeight: 500,
                        }}
                      />

                      {/* Deadline Chip */}
                      <Chip
                        label={`Due: ${formatDeadline(task.deadline)}`}
                        size="small"
                        color={getDeadlineColor(task.deadline)}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Box>

                  {/* Action Menu */}
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, task)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Status Change Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange('pending')}>
          <Flag sx={{ mr: 1, fontSize: 18 }} /> Mark as Pending
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('in-progress')}>
          <Schedule sx={{ mr: 1, fontSize: 18 }} /> Mark as In Progress
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('done')}>
          <CheckCircle sx={{ mr: 1, fontSize: 18 }} /> Mark as Done
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default MyTasks;
