import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Typography,
  Fade,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

/**
 * Risk List Component
 * Displays top risks with color-coded severity and hover tooltips
 */
const RiskList = ({ risks }) => {
  const [hoveredRisk, setHoveredRisk] = useState(null);

  // Severity color mapping
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'red':
        return { bg: '#FFEBEE', text: '#D32F2F', label: 'Critical' };
      case 'amber':
        return { bg: '#FFF3E0', text: '#ED6C02', label: 'Warning' };
      case 'green':
        return { bg: '#E8F5E9', text: '#2E7D32', label: 'Monitor' };
      default:
        return { bg: '#F5F5F5', text: '#757575', label: 'Unknown' };
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <List sx={{ p: 0 }}>
        {risks.map((risk, index) => {
          const colors = getSeverityColor(risk.severity);
          
          return (
            <ListItem
              key={risk.id}
              sx={{
                mb: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: colors.bg,
                  borderColor: colors.text,
                  transform: 'translateX(4px)',
                },
              }}
              onMouseEnter={() => setHoveredRisk(risk.id)}
              onMouseLeave={() => setHoveredRisk(null)}
            >
              {/* Risk Number */}
              <Box
                sx={{
                  minWidth: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: colors.bg,
                  color: colors.text,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  mr: 2,
                }}
              >
                {index + 1}
              </Box>

              {/* Risk Name */}
              <ListItemText
                primary={risk.name}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: '14px',
                }}
              />

              {/* Severity Badge */}
              <Chip
                label={colors.label}
                size="small"
                sx={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                  fontWeight: 600,
                  mr: 1,
                }}
              />

              {/* Details Arrow */}
              <Tooltip
                title="View breakdown"
                arrow
                placement="left"
              >
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <ChevronRight />
                </IconButton>
              </Tooltip>

              {/* Hover Tooltip Panel */}
              {hoveredRisk === risk.id && (
                <Fade in={true}>
                  <Paper
                    elevation={6}
                    sx={{
                      position: 'absolute',
                      right: -320,
                      top: 0,
                      width: 300,
                      p: 2,
                      backgroundColor: 'rgba(13, 27, 42, 0.95)',
                      color: 'white',
                      zIndex: 1000,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      Risk Breakdown
                    </Typography>
                    
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                        <strong>TAT:</strong> {risk.breakdown.tat}
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                        <strong>Queue Length:</strong> {risk.breakdown.queueLength}
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                        <strong>External Delays:</strong> {risk.breakdown.externalDelays}
                      </Typography>
                      <Typography variant="caption" display="block">
                        <strong>Impact Score:</strong> {risk.breakdown.impactScore}
                      </Typography>
                    </Box>
                  </Paper>
                </Fade>
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default RiskList;
