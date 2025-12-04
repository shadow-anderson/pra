import { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { FileDownload, People } from '@mui/icons-material';
import EmployeeSelectModal from './EmployeeSelectModal';

// Mock period options
const periods = [
  'Q1 2025',
  'Q2 2025',
  'Q3 2025',
  'Q4 2025',
  'H1 2025',
  'H2 2025',
  'FY 2024-25',
  'FY 2025-26',
];

const ExportAPAR = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Handle period change
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
    setExportSuccess(false);
  };

  // Handle employee selection
  const handleEmployeeSelect = (employees) => {
    setSelectedEmployees(employees);
    setExportSuccess(false);
  };

  // Mock APAR pack generation function
  const generateAparPack = async () => {
    setIsExporting(true);
    setExportSuccess(false);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock successful export
    console.log('Generating APAR pack for:', {
      period: selectedPeriod,
      employees: selectedEmployees,
    });

    setIsExporting(false);
    setExportSuccess(true);

    // Reset success message after 5 seconds
    setTimeout(() => setExportSuccess(false), 5000);
  };

  // Check if export button should be enabled
  const isExportEnabled =
    selectedPeriod && selectedEmployees.length > 0 && !isExporting;

  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Export APAR Pack
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Generate Annual Performance Assessment Reports for selected employees
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Period Selector */}
        <TextField
          select
          fullWidth
          label="Select Period"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          variant="outlined"
          InputLabelProps={{
            sx: { fontWeight: 600 },
          }}
        >
          {periods.map((period) => (
            <MenuItem key={period} value={period}>
              {period}
            </MenuItem>
          ))}
        </TextField>

        {/* Employee Selection Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<People />}
          onClick={() => setModalOpen(true)}
          sx={{
            justifyContent: 'flex-start',
            py: 1.5,
            textTransform: 'none',
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.light',
              backgroundColor: 'rgba(13, 27, 42, 0.04)',
            },
          }}
        >
          {selectedEmployees.length === 0
            ? 'Select Employees'
            : `${selectedEmployees.length} Employee${
                selectedEmployees.length > 1 ? 's' : ''
              } Selected`}
        </Button>

        {/* Selected employees summary */}
        {selectedEmployees.length > 0 && (
          <Box
            sx={{
              p: 2,
              backgroundColor: 'background.default',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Selected Employees:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {selectedEmployees.slice(0, 3).join(', ')}
              {selectedEmployees.length > 3 && ` +${selectedEmployees.length - 3} more`}
            </Typography>
          </Box>
        )}

        {/* Export Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={
            isExporting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <FileDownload />
            )
          }
          onClick={generateAparPack}
          disabled={!isExportEnabled}
          sx={{
            py: 1.5,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
            '&:disabled': {
              backgroundColor: '#CCCCCC',
              color: '#888888',
            },
          }}
        >
          {isExporting ? 'Generating...' : 'Export APAR Pack'}
        </Button>

        {/* Success Message */}
        {exportSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            APAR pack generated successfully! Check your downloads folder.
          </Alert>
        )}

        {/* Info Text */}
        <Box
          sx={{
            p: 2,
            backgroundColor: 'rgba(13, 27, 42, 0.04)',
            borderRadius: 1,
            mt: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            <strong>Note:</strong> APAR packs include performance metrics, KPI achievements,
            and comprehensive assessment data for the selected period.
          </Typography>
        </Box>
      </Box>

      {/* Employee Selection Modal */}
      <EmployeeSelectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleEmployeeSelect}
        selectedEmployees={selectedEmployees}
      />
    </Paper>
  );
};

export default ExportAPAR;
