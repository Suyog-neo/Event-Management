import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Fade,
  Link,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

// 🔐 Mock JWT generator
const generateMockJWT = (username) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const payload = {
    username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires in 1 hour
  };

  const encode = (obj) => btoa(JSON.stringify(obj)); // base64 encoding

  const token = `${encode(header)}.${encode(payload)}.mock-signature`;
  localStorage.setItem('authToken', token);
  console.log('Mock Token:', token); // ✅ visible in DevTools → Application tab
  return token;
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ username: '', email: '', password: '', otp: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
      setCredentials({ username: '', email: '', password: '', otp: '' });
      setFieldErrors({});
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSendOTP = () => {
    const { email } = credentials;
    if (!email) {
      setFieldErrors({ email: 'Email is required to send OTP' });
      return;
    }
    // Here you would typically make an API call to send OTP
    // For now, we'll simulate it
    setOtpSent(true);
    setSnackbar({ open: true, message: 'OTP sent to your email!', severity: 'success' });
  };

  const handleVerifyOTP = () => {
    const { otp } = credentials;
    if (!otp) {
      setFieldErrors({ otp: 'Please enter the OTP' });
      return;
    }
    // Here you would typically verify the OTP with your backend
    // For now, we'll simulate it with any 6-digit number
    if (otp.length === 6) {
      setOtpVerified(true);
      setSnackbar({ open: true, message: 'OTP verified successfully!', severity: 'success' });
    } else {
      setSnackbar({ open: true, message: 'Invalid OTP. Please try again.', severity: 'error' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, otp } = credentials;
    const errors = {};

    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    if (mode === 'register') {
      if (!email) errors.email = 'Email is required';
      if (!otpVerified) {
        setSnackbar({ open: true, message: 'Please verify your email with OTP first.', severity: 'error' });
        return;
      }
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (mode === 'login') {
      if (username === 'admin' && password === 'admin123') {
        generateMockJWT(username);
        dispatch(login({ username, role: 'admin' }));
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
        setTimeout(() => navigate('/admin'), 2000);
      } else if (username === 'user' && password === 'user123') {
        generateMockJWT(username);
        dispatch(login({ username, role: 'user' }));
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
        setTimeout(() => navigate('/user'), 2000);
      } else {
        setSnackbar({ open: true, message: 'Invalid username or password.', severity: 'error' });
      }
    } else {
      setSnackbar({ open: true, message: 'Account created successfully! You can now log in.', severity: 'success' });
      setMode('login');
      setCredentials({ username: '', email: '', password: '', otp: '' });
      setOtpSent(false);
      setOtpVerified(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
        backgroundImage:
          'url("https://static.vecteezy.com/system/resources/previews/050/897/969/non_2x/futuristic-dark-gray-wave-abstract-3d-background-with-realistic-gradient-color-on-background-vector.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          maxWidth: 900,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#ffffffee',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            height: mode === 'login' ? { xs: 200, md: 500 } : { xs: 300, md: 600 },
            backgroundImage:
              'url("https://www.shutterstock.com/image-photo/woman-holding-smartphone-buying-movie-600nw-2156185629.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'height 0.3s ease',
          }}
        />

        <Paper
          elevation={0}
          sx={{
            width: { xs: '100%', md: '50%' },
            p: 4,
            backgroundColor: '#ffffffee',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="login" sx={toggleButtonStyles(mode === 'login')}>
              Login
            </ToggleButton>
            <ToggleButton value="register" sx={toggleButtonStyles(mode === 'register')}>
              Create Account
            </ToggleButton>
          </ToggleButtonGroup>

          <Typography variant="h5" mb={1} textAlign="center" color="primary">
            {mode === 'login' ? 'Welcome Back' : 'Join Us Today'}
          </Typography>
          <Typography variant="body2" textAlign="center" mb={3} color="text.secondary">
            {mode === 'login'
              ? 'Please enter your credentials to continue'
              : 'Fill in the details to create your account'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Fade in timeout={500}>
              <div>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  error={!!fieldErrors.username}
                  helperText={fieldErrors.username}
                />
                {mode === 'register' && (
                  <>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={credentials.email}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                        disabled={otpSent}
                      />
                      <Typography
                        onClick={handleSendOTP}
                        sx={{
                          color: '#0288d1',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          opacity: otpSent ? 0.5 : 1,
                          pointerEvents: otpSent ? 'none' : 'auto',
                          '&:hover': {
                            color: '#01579b',
                          },
                        }}
                      >
                        Send OTP
                      </Typography>
                    </Box>
                    {otpSent && (
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
                        <TextField
                          fullWidth
                          label="Enter OTP"
                          name="otp"
                          value={credentials.otp}
                          onChange={handleChange}
                          variant="outlined"
                          error={!!fieldErrors.otp}
                          helperText={fieldErrors.otp}
                          disabled={otpVerified}
                          inputProps={{ maxLength: 6 }}
                        />
                        <Typography
                          onClick={handleVerifyOTP}
                          sx={{
                            color: '#0288d1',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            opacity: otpVerified ? 0.5 : 1,
                            pointerEvents: otpVerified ? 'none' : 'auto',
                            '&:hover': {
                              color: '#01579b',
                            },
                          }}
                        >
                          Verify OTP
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  error={!!fieldErrors.password}
                  helperText={fieldErrors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Fade>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 'bold',
                fontSize: '1rem',
                backgroundColor: '#0288d1',
                '&:hover': {
                  backgroundColor: '#7b1fa2',
                },
                color: 'white',
              }}
            >
              {mode === 'login' ? 'Login' : 'Create Account'}
            </Button>

            {mode === 'login' && (
              <Typography mt={2} textAlign="center">
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  onClick={() =>
                    setSnackbar({
                      open: true,
                      message: 'This feature is under development and will be available soon.',
                      severity: 'info',
                    })
                  }
                >
                  Forgot password?
                </Link>
              </Typography>
            )}
          </form>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
              '& .MuiAlert-root': {
                fontSize: '1.2rem',
                padding: '16px',
              },
            }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: '100%', position: 'relative' }}
            >
              {snackbar.message}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '4px',
                  width: '100%',
                  backgroundColor:
                    snackbar.severity === 'success'
                      ? '#50E3C2'
                      : snackbar.severity === 'error'
                      ? '#E94E77'
                      : '#FFD54F',
                  animation: 'progress 3s linear',
                }}
              />
            </Alert>
          </Snackbar>

          <style>
            {`
              @keyframes progress {
                from {
                  width: 100%;
                }
                to {
                  width: 0%;
                }
              }
            `}
          </style>
        </Paper>
      </Box>
    </Box>
  );
}

const toggleButtonStyles = (active) => ({
  fontWeight: 'bold',
  background: active ? 'linear-gradient(135deg,rgb(63, 152, 235))' : 'transparent',
  color: active ? '#fff' : 'text.primary',
  '&:hover': {
    background: active ? 'linear-gradient(135deg,rgb(63, 152, 235))' : 'action.hover',
  },
  borderRadius: 2,
  px: 3,
});
