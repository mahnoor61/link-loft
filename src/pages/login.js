import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress, Card, Grid, FormControlLabel, Switch, IconButton, Divider
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import toast from 'react-hot-toast';
import { useMounted } from '../hooks/use-mounted';
import * as React from 'react';
import { signInWithGoogle } from '../firebase/firebase';
import axios from 'axios';
import { useAuth } from '../hooks/use-auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
import Link from 'next/link';
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [googleButtonDisabled, setGoogleButtonDisabled] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();
  // const { transactionId } = router.query;

  // if (transactionId) {
  //   localStorage.setItem('transactionId', transactionId);
  // }

  const { signIn, refreshAuth, applyAuthenticatedUser } = useAuth();
  const isMounted = useMounted();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .min(6, 'At least 6 characters')
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      const loadingId = toast.loading('Signing in...');
      setLoading(true);
      try {
        const signedInUser = await signIn({ email: values.email, password: values.password });
        formik.resetForm();
        toast.success('Login successful');
        const displayName = encodeURIComponent(signedInUser?.username || signedInUser?.name || 'User');
        const handle = encodeURIComponent(signedInUser?.username || '');
        const rawAvatar = signedInUser?.profile_photo || '';
        const base = API_BASE_URL || '';
        const avatarAbs = rawAvatar?.startsWith('http') ? rawAvatar : (rawAvatar ? `${base}${rawAvatar}` : '');
        const avatar = encodeURIComponent(avatarAbs);
        router.push(`/loading?name=${displayName}&username=${handle}&avatar=${avatar}`);
      } catch (err) {
        toast.error(err.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
      }
      toast.dismiss(loadingId);
      setLoading(false);
      helpers.setSubmitting(false);
    }

  });

  const handleGoogleSignIn = async () => {
    setGoogleButtonDisabled(true);
    // user data comes in data
    const data = await signInWithGoogle();
    const { email, photoURL } = data.user;
    const displayName = data?.user?.displayName || data?.additionalUserInfo?.profile?.name || '';
    await window.localStorage.setItem('userName', displayName);
    try {
      const response = await axios.post(API_BASE_URL + '/api/signin-with/google',
        {
          email,
          username: displayName,
          emailVerified: data?.user?.emailVerified || data?.additionalUserInfo?.profile?.emailVerified,
          signup_method: 'google',
          profile_photo: photoURL || ''
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const payload = response.data.data || {};
      const userToken = payload.token;
      toast.success('Login successfully');
      window.localStorage.setItem('token', userToken);
      // Hydrate context immediately if backend returned user, otherwise refresh
      if (payload) applyAuthenticatedUser(payload); else await refreshAuth();
      router.replace('/dashboard');
      setGoogleButtonDisabled(false);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <Head>
        <title>
          Login | {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
      </Head>
      <Box component="main" sx={{ display: 'flex', flex: '1 1 auto', height: '100vh', backgroundColor: '#FFF2F9' }}>
        <Grid container  data-aos="zoom-in" sx={{ flex: '1 1 auto', height: '100%' }}>
          {/* Left column: sign-in card */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 6 } }}>
            <Box sx={{ width: '100%', maxWidth: 420 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Welcome Back</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 , mt:3}}>Enter your email to sign in</Typography>

              <Box >
                <form noValidate onSubmit={formik.handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      error={!!(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label="Email"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                      size="small"
                    />
                    <TextField
                      error={!!(formik.touched.password && formik.errors.password)}
                      fullWidth
                      helperText={formik.touched.password && formik.errors.password}
                      label="Password"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                      size="small"
                    />
                    <Typography variant="body2" sx={{ textAlign: 'right' }}>
                      <Link style={{ color: '#FF80C3', textDecoration: 'none' }} href="/forgot_password">Forgot your password?</Link>
                    </Typography>
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
                    />

                    {formik.errors.submit && (
                      <Typography color="error" sx={{ mt: 1 }} variant="body2">{formik.errors.submit}</Typography>
                    )}

                    <Button fullWidth size="large" type="submit" disabled={formik.isSubmitting} sx={{ mt: 1 , backgroundColor: '#FF80C3', color: '#FFFFFF', '&:hover': { backgroundColor: '#FF80C3', color: '#FFFFFF' } , borderRadius: 12}}>
                      {formik.isSubmitting ? (
                        <>
                          <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
                          Signing in...
                        </>
                      ) : (
                        'Sign in'
                      )}
                    </Button>

                    <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 1 }}>
                      <Divider sx={{ flex: 1 }} />
                      <Typography variant="caption" color="text.secondary">or</Typography>
                      <Divider sx={{ flex: 1 }} />
                    </Stack>

                    <Stack direction="row" spacing={2} justifyContent="center">
                      <IconButton onClick={handleGoogleSignIn} size="small" sx={{ border: '1px solid #E6E8F0' }} aria-label="google" disabled={googleButtonDisabled}>
                        <GoogleIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </form>
              </Box>

              <Typography variant="body2" sx={{ mt: 2 }}>
                Don’t have an account? <Box component="span" sx={{ color: '#FF80C3', cursor: 'pointer' }}>
                  <Link style={{ color: '#FF80C3', textDecoration: 'none' }} href="/signup">Sign up</Link>
                  </Box>
              </Typography>
            </Box>
          </Grid>

          {/* Right column: background image with centered logo */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', backgroundImage: `url(/signInBg.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <img src="/signinlogo.png" alt="Logo" style={{ width: 180, maxWidth: '100%' }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Page;
