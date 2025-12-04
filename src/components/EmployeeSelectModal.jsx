import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import { Search, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

// Mock employee data
const mockEmployees = [
  { id: 1, name: 'Rajesh Kumar', designation: 'Senior Manager', department: 'Operations' },
  { id: 2, name: 'Priya Sharma', designation: 'Assistant Director', department: 'Finance' },
  { id: 3, name: 'Amit Patel', designation: 'Deputy Manager', department: 'HR' },
  { id: 4, name: 'Sneha Reddy', designation: 'Manager', department: 'IT' },
  { id: 5, name: 'Vikram Singh', designation: 'Section Officer', department: 'Admin' },
  { id: 6, name: 'Anita Desai', designation: 'Assistant Manager', department: 'Operations' },
  { id: 7, name: 'Karthik Nair', designation: 'Senior Officer', department: 'Finance' },
  { id: 8, name: 'Meera Iyer', designation: 'Deputy Director', department: 'Planning' },
  { id: 9, name: 'Suresh Gupta', designation: 'Manager', department: 'HR' },
  { id: 10, name: 'Pooja Verma', designation: 'Senior Manager', department: 'Operations' },
  { id: 11, name: 'Arun Mehta', designation: 'Assistant Director', department: 'IT' },
  { id: 12, name: 'Kavita Joshi', designation: 'Section Officer', department: 'Admin' },
  { id: 13, name: 'Deepak Rao', designation: 'Deputy Manager', department: 'Finance' },
  { id: 14, name: 'Shalini Das', designation: 'Manager', department: 'Operations' },
  { id: 15, name: 'Ravi Krishnan', designation: 'Senior Officer', department: 'Planning' },
];

/**
 * Employee Selection Modal
 * Allows multi-select of employees with search functionality
 */
const EmployeeSelectModal = ({ open, onClose, onSave, selectedEmployees }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [localSelectedEmployees, setLocalSelectedEmployees] = useState([]);

  // Initialize local selection when modal opens
  useEffect(() => {
    if (open) {
      setLocalSelectedEmployees(selectedEmployees);
      setSearchQuery('');
    }
  }, [open, selectedEmployees]);

  // Filter employees based on search query
  const filteredEmployees = mockEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle individual employee toggle
  const handleToggle = (employeeName) => {
    if (localSelectedEmployees.includes(employeeName)) {
      setLocalSelectedEmployees(
        localSelectedEmployees.filter((name) => name !== employeeName)
      );
    } else {
      setLocalSelectedEmployees([...localSelectedEmployees, employeeName]);
    }
  };

  // Handle Select All
  const handleSelectAll = () => {
    if (localSelectedEmployees.length === filteredEmployees.length) {
      setLocalSelectedEmployees([]);
    } else {
      setLocalSelectedEmployees(filteredEmployees.map((emp) => emp.name));
    }
  };

  // Handle Save
  const handleSave = () => {
    onSave(localSelectedEmployees);
    onClose();
  };

  // Handle Cancel
  const handleCancel = () => {
    setLocalSelectedEmployees(selectedEmployees);
    onClose();
  };

  const isAllSelected =
    filteredEmployees.length > 0 &&
    localSelectedEmployees.length === filteredEmployees.length;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Select Employees
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose employees for APAR pack generation
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {/* Search Bar */}
        <Box sx={{ p: 2, pb: 1 }}>
          <TextField
            fullWidth
            placeholder="Search by name, designation, or department"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Box>

        {/* Selection Summary */}
        <Box sx={{ px: 2, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`${localSelectedEmployees.length} selected`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Typography variant="caption" color="text.secondary">
            of {filteredEmployees.length} shown
          </Typography>
        </Box>

        {/* Select All Checkbox */}
        <Box sx={{ px: 2, pb: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  localSelectedEmployees.length > 0 &&
                  localSelectedEmployees.length < filteredEmployees.length
                }
                onChange={handleSelectAll}
              />
            }
            label={
              <Typography variant="body2" fontWeight={600}>
                Select All
              </Typography>
            }
          />
        </Box>

        <Divider />

        {/* Employee List */}
        <List sx={{ maxHeight: 400, overflow: 'auto', py: 0 }}>
          {filteredEmployees.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No employees found
              </Typography>
            </Box>
          ) : (
            filteredEmployees.map((employee) => {
              const isSelected = localSelectedEmployees.includes(employee.name);
              
              return (
                <ListItem key={employee.id} disablePadding>
                  <ListItemButton onClick={() => handleToggle(employee.name)} dense>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Checkbox
                        edge="start"
                        checked={isSelected}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={employee.name}
                      secondary={`${employee.designation} • ${employee.department}`}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '14px',
                      }}
                      secondaryTypographyProps={{
                        fontSize: '12px',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })
          )}
        </List>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleCancel} variant="outlined" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={localSelectedEmployees.length === 0}
          sx={{
            textTransform: 'none',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
        >
          Save Selection ({localSelectedEmployees.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeSelectModal;
