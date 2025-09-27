import {useState} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  Grid,
  Card,
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
  IconButton,
  Switch,
  FormControlLabel
} from '@mui/material';
import {useAuth} from '../hooks/use-auth';
import toast from 'react-hot-toast';

const Page = () => {
  const {signUp} = useAuth();
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().min(2).max(255).required('Name is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().min(6, 'At least 6 characters').required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await signUp({ name: values.name, email: values.email, password: values.password });
        toast.success('Account created. Please check your email if verification is required.');
        router.push('/login');
      } catch (err) {
        toast.error(err.message || 'Failed to sign up');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>Sign Up | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" data-aos="zoom-in" sx={{ minHeight: '100vh', backgroundColor: '#FFF2F9', pb: 3, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: { xs: 'center', md: 'stretch' }, p:2, flexDirection: 'column', width: '100%' }}>
        {/* Pink header banner */}
        <Box sx={{
          backgroundImage: 'url(/signInBg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: { xs: 2, md: 0 },
          height: 250,
        //   mx: { xs: 2, md: 0 },
          mt: { xs: 2, md: 1 },
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mt:5 }}>Welcome!</Typography>
            <Typography variant="caption" sx={{ color: '#fff'}}>
              Use these awesome forms to login or create new account in your project for free.
            </Typography>
          </Box>
        </Box>

        {/* Center card */}
        <Grid container sx={{ mt: {md:-15, xs:-12}, px: 2 }}>
          <Grid item xs={12} md={6} lg={4} sx={{ mx: 'auto' }}>
            <Card  data-aos="zoom-in" sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <Typography variant="subtitle2" align="center" sx={{ fontWeight: 700, mb: 2 }}>Register with</Typography>

              <Stack direction="row" spacing={2} justifyContent="center">
                <IconButton size="small" sx={{ border: '1px solid #E6E8F0' }} aria-label="facebook">
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ border: '1px solid #E6E8F0' }} aria-label="apple">
                  <AppleIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ border: '1px solid #E6E8F0' }} aria-label="google">
                  <GoogleIcon fontSize="small" />
                </IconButton>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 2 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="caption" color="text.secondary">or</Typography>
                <Divider sx={{ flex: 1 }} />
              </Stack>

              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    name="name"
                    label="Username"
                    size="small"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.name && formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    fullWidth
                  />
                  <TextField
                    name="email"
                    label="Email"
                    size="small"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                  />
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.password && formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF80C3' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF80C3' },
                          '& .MuiSwitch-track': { opacity: 1, backgroundColor: 'rgba(0,0,0,0.25)' }
                        }}
                      />
                    }
                    label="Remember me"
                    sx={{ mt: 0.5 }}
                  />

                  <Button type="submit" fullWidth size="large" sx={{ backgroundColor: '#FF80C3', color: '#fff', '&:hover': { backgroundColor: '#FF80C3' }, borderRadius: 2 }}>
                    Sign up
                  </Button>
                </Stack>
              </form>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account? <a href="/login" style={{ color: '#FF80C3', textDecoration: 'none' }}>Sign in</a>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;


