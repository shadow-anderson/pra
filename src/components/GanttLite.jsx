import { Paper, Typography, Box, Tooltip } from '@mui/material';
import { format, parseISO, differenceInDays } from 'date-fns';

/**
 * Gantt-Lite Component
 * Lightweight Gantt-style visualization for project milestones
 */
const GanttLite = ({ milestones }) => {
  // Find date range for timeline
  const allDates = milestones.flatMap((m) => [
    new Date(m.plannedStart),
    new Date(m.plannedEnd),
    m.actualEnd ? new Date(m.actualEnd) : new Date(m.plannedEnd),
  ]);
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));
  const totalDays = differenceInDays(maxDate, minDate) + 5;

  // Calculate position and width for bars
  const getBarPosition = (date) => {
    const days = differenceInDays(new Date(date), minDate);
    return (days / totalDays) * 100;
  };

  const getBarWidth = (startDate, endDate) => {
    const days = differenceInDays(new Date(endDate), new Date(startDate));
    return Math.max((days / totalDays) * 100, 2);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#2E7D32';
      case 'delayed':
        return '#ED6C02';
      case 'in-progress':
        return '#0D1B2A';
      case 'pending':
        return '#CCCCCC';
      default:
        return '#CCCCCC';
    }
  };

  // Calculate variance in days
  const getVariance = (milestone) => {
    if (!milestone.actualEnd) return null;
    const planned = new Date(milestone.plannedEnd);
    const actual = new Date(milestone.actualEnd);
    return differenceInDays(actual, planned);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Project Timeline
      </Typography>

      <Box sx={{ overflowX: 'auto', pb: 2 }}>
        <Box sx={{ minWidth: 800 }}>
          {/* Date axis labels */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 2,
              px: 15,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {format(minDate, 'MMM dd')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(
                new Date(minDate.getTime() + (totalDays / 2) * 24 * 60 * 60 * 1000),
                'MMM dd'
              )}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(maxDate, 'MMM dd')}
            </Typography>
          </Box>

          {/* Milestone rows */}
          {milestones.map((milestone) => {
            const variance = getVariance(milestone);
            const plannedLeft = getBarPosition(milestone.plannedStart);
            const plannedWidth = getBarWidth(
              milestone.plannedStart,
              milestone.plannedEnd
            );
            const actualLeft = milestone.actualStart
              ? getBarPosition(milestone.actualStart)
              : plannedLeft;
            const actualWidth = milestone.actualEnd
              ? getBarWidth(milestone.actualStart || milestone.plannedStart, milestone.actualEnd)
              : plannedWidth;

            return (
              <Box key={milestone.id} sx={{ mb: 3 }}>
                {/* Milestone name */}
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  {milestone.name}
                </Typography>

                {/* Timeline container */}
                <Box sx={{ position: 'relative', height: 40 }}>
                  {/* Planned bar (lighter) */}
                  <Tooltip
                    title={
                      <Box>
                        <Typography variant="caption" display="block">
                          <strong>Planned:</strong> {format(parseISO(milestone.plannedStart), 'MMM dd')} -{' '}
                          {format(parseISO(milestone.plannedEnd), 'MMM dd')}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Duration:</strong>{' '}
                          {differenceInDays(
                            parseISO(milestone.plannedEnd),
                            parseISO(milestone.plannedStart)
                          )}{' '}
                          days
                        </Typography>
                        {variance !== null && (
                          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            <strong>Variance:</strong> {variance > 0 ? '+' : ''}
                            {variance} days
                          </Typography>
                        )}
                      </Box>
                    }
                    arrow
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: `${plannedLeft}%`,
                        width: `${plannedWidth}%`,
                        height: 16,
                        backgroundColor: '#E0E1DD',
                        border: '1px solid #415A77',
                        borderRadius: 1,
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>

                  {/* Actual bar (colored) */}
                  {(milestone.actualStart || milestone.actualEnd) && (
                    <Tooltip
                      title={
                        <Box>
                          <Typography variant="caption" display="block">
                            <strong>Actual:</strong>{' '}
                            {milestone.actualStart
                              ? format(parseISO(milestone.actualStart), 'MMM dd')
                              : 'Not started'}{' '}
                            -{' '}
                            {milestone.actualEnd
                              ? format(parseISO(milestone.actualEnd), 'MMM dd')
                              : 'In progress'}
                          </Typography>
                          {milestone.actualEnd && (
                            <Typography variant="caption" display="block">
                              <strong>Duration:</strong>{' '}
                              {differenceInDays(
                                parseISO(milestone.actualEnd),
                                parseISO(milestone.actualStart || milestone.plannedStart)
                              )}{' '}
                              days
                            </Typography>
                          )}
                        </Box>
                      }
                      arrow
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: `${actualLeft}%`,
                          width: `${actualWidth}%`,
                          height: 24,
                          backgroundColor: getStatusColor(milestone.status),
                          borderRadius: 1,
                          cursor: 'pointer',
                          opacity: milestone.actualEnd ? 1 : 0.7,
                          transition: 'all 0.2s',
                          '&:hover': {
                            opacity: 1,
                            transform: 'scaleY(1.1)',
                          },
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>

                {/* Status indicator */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(milestone.status),
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                    {variance !== null && variance !== 0 && (
                      <span style={{ color: variance > 0 ? '#ED6C02' : '#2E7D32' }}>
                        {' '}
                        ({variance > 0 ? '+' : ''}
                        {variance} days)
                      </span>
                    )}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 3, mt: 3, pt: 2, borderTop: '1px solid #E0E1DD' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 12, backgroundColor: '#E0E1DD', border: '1px solid #415A77', borderRadius: 0.5 }} />
          <Typography variant="caption">Planned</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 12, backgroundColor: '#0D1B2A', borderRadius: 0.5 }} />
          <Typography variant="caption">In Progress</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 12, backgroundColor: '#ED6C02', borderRadius: 0.5 }} />
          <Typography variant="caption">Delayed</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 12, backgroundColor: '#2E7D32', borderRadius: 0.5 }} />
          <Typography variant="caption">Completed</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default GanttLite;
