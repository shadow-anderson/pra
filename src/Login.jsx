import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputAdornment,
  IconButton,
  Alert,
  Stack,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AccountBalance,
} from '@mui/icons-material';

// Government-grade theme with professional colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0D1B2A', // Navy blue
      light: '#1B263B', // Slate
    },
    secondary: {
      main: '#415A77', // Steel gray
    },
    background: {
      default: '#E0E1DD', // Soft white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0D1B2A',
      secondary: '#415A77',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
          },
        },
      },
    },
  },
});

// Hardcoded credentials for authentication
const VALID_CREDENTIALS = [
  { email: 'admin@prabhaav.com', password: 'admin123', role: 'admin' },
  { email: 'hq@prabhaav.com', password: 'hq123', role: 'hq' },
  { email: 'field@prabhaav.com', password: 'field123', role: 'field' },
  { email: 'employee@prabhaav.com', password: 'emp123', role: 'employee' },
];

const Login = () => {
  const navigate = useNavigate();

  // Form state management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    role: '',
  });

  // Handle input changes
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear errors when user starts typing
    setError('');
    setFieldErrors({ ...fieldErrors, [field]: '' });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    if (!formData.role) {
      errors.role = 'Role selection is required';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  // Handle login submission
  const handleLogin = () => {
    // Clear previous errors
    setError('');
    setFieldErrors({ email: '', password: '', role: '' });

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check credentials against hardcoded data
    const matchedCredential = VALID_CREDENTIALS.find(
      (cred) =>
        cred.email === formData.email.trim() &&
        cred.password === formData.password &&
        cred.role === formData.role
    );

    if (matchedCredential) {
      // Successful login - navigate to appropriate dashboard based on role
      if (matchedCredential.role === 'field') {
        navigate('/DivisionDashboard');
      } else if (matchedCredential.role === 'employee') {
        navigate('/EmployeeDashboard');
      } else {
        navigate('/ExecutiveDashboard');
      }
    } else {
      // Failed login - show error
      setError('Invalid credentials or role. Please try again.');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  // Check if all fields are filled
  const isFormComplete =
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.role !== '';

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #E0E1DD 0%, #C9CADA 100%)',
          padding: 2,
        }}
      >
        <Card
          elevation={8}
          sx={{
            maxWidth: 500,
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <CardContent sx={{ padding: { xs: 3, sm: 5 } }}>
            {/* Header Section */}
            <Stack spacing={1} alignItems="center" sx={{ mb: 4 }}>
              <AccountBalance
                sx={{
                  fontSize: 48,
                  color: 'primary.main',
                  mb: 1,
                }}
              />
              <Typography
                variant="h4"
                component="h1"
                color="primary"
                align="center"
              >
                Prabhaav
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ fontWeight: 500 }}
              >
                Performance & Impact Monitoring System
              </Typography>
            </Stack>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <Stack spacing={3}>
              {/* Email Input */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="Enter your official email"
                value={formData.email}
                onChange={handleChange('email')}
                onKeyPress={handleKeyPress}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
                variant="outlined"
                InputLabelProps={{
                  sx: { fontWeight: 600 },
                }}
              />

              {/* Password Input */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange('password')}
                onKeyPress={handleKeyPress}
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
                variant="outlined"
                InputLabelProps={{
                  sx: { fontWeight: 600 },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Role Selector */}
              <TextField
                fullWidth
                select
                label="Login as"
                value={formData.role}
                onChange={handleChange('role')}
                error={!!fieldErrors.role}
                helperText={fieldErrors.role}
                variant="outlined"
                InputLabelProps={{
                  sx: { fontWeight: 600 },
                }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="hq">HQ</MenuItem>
                <MenuItem value="field">Field</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
              </TextField>

              {/* Login Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
                disabled={!isFormComplete}
                sx={{
                  mt: 2,
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
                Login
              </Button>
            </Stack>

            {/* Footer Info */}
            <Typography
              variant="caption"
              color="text.secondary"
              align="center"
              sx={{ display: 'block', mt: 3 }}
            >
              Government of India | Authorized Personnel Only
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
