import {useEffect, useState} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
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
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import PhotoCameraOutlined from '@mui/icons-material/PhotoCameraOutlined';
import Avatar from '@mui/material/Avatar';
import {useAuth} from '../hooks/use-auth';
import { signInWithGoogle, signInWithFacebook, signInWithApple } from '../firebase/firebase';
import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import toast from 'react-hot-toast';

const Page = () => {
  const {signUp, refreshAuth, applyAuthenticatedUser} = useAuth();
  const [rememberMe, setRememberMe] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
    };
  }, [profilePreview]);

  const formik = useFormik({
    initialValues: { username: '', profile_name: '', email: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().min(2).max(255).required('Username is required'),
      profile_name: Yup.string().min(2).max(255).required('Profile name is required'),
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().min(6, 'At least 6 characters').required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      helpers.setSubmitting(true);
      try {
        const data = await signUp({ username: values.username, profileName: values.profile_name, email: values.email, password: values.password, profilePhoto });
        toast.success('Verification code sent to your email');
        router.push(`/verify_login?token=${data.unique_id}`);
      } catch (err) {
        toast.error(err.message || 'Failed to sign up');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
      } finally {
        helpers.setSubmitting(false);
      }
    }
  });

  const handleSocialSignUp = async (provider) => {
    try {
      let data;
      if (provider === 'google') data = await signInWithGoogle();
      if (provider === 'facebook') data = await signInWithFacebook();
      if (provider === 'apple') data = await signInWithApple();

      let email = data?.user?.email || data?._tokenResponse?.email || data?.additionalUserInfo?.profile?.email || null;
      if (!email && provider === 'apple') {
        email = window.prompt('Apple did not share your email. Please enter your email to continue:') || null;
      }
      if (!email) throw new Error('No email available from provider');

      if (!API_BASE_URL) throw new Error('API base URL is not configured');

      const displayName = data?.user?.displayName || data?.additionalUserInfo?.profile?.name;
      const emailVerified = data?.user?.emailVerified || data?.additionalUserInfo?.profile?.emailVerified;
      const providerId = data?.providerId || 'google';
      const photoURL = data?.user?.photoURL || '';
      const resp = await axios.post(
        `${API_BASE_URL}/api/signin-with/google`,
        { email, username: displayName, signup_method: providerId , emailVerified, profile_photo: photoURL, profile_name: displayName },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const payload = resp?.data?.data || {};
      const userToken = payload?.token;
      if (userToken) window.localStorage.setItem('token', userToken);
      toast.success('Signed up successfully');
      // Hydrate context immediately (payload contains user fields per backend)
      if (payload?.user) applyAuthenticatedUser(payload.user); else await refreshAuth();
      router.replace('/dashboard');
    } catch (e) {
      console.error(e);
      toast.error(e?.message || 'Social sign-up failed');
    }
  };

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
              Open your loft and start building your 360° interactive world.
            </Typography>
          </Box>
        </Box>

        {/* Center card */}
        <Grid container sx={{ mt: {md:-15, xs:-12}, px: 2 }}>
          <Grid item xs={12} md={6} lg={4} sx={{ mx: 'auto' }}>
            <Card  data-aos="zoom-in" sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <Typography variant="subtitle2" align="center" sx={{ fontWeight: 700, mb: 2 }}>Register with</Typography>

              <Stack direction="row" spacing={2} justifyContent="center">
                {/* <IconButton onClick={() => handleSocialSignUp('facebook')} size="small" sx={{ border: '1px solid #E6E8F0' }} aria-label="facebook">
                  <FacebookIcon fontSize="small" />
                </IconButton> */}
                {/* <IconButton onClick={() => handleSocialSignUp('apple')} size="small" sx={{ border: '1px solid #E6E8F0' }} aria-label="apple">
                  <AppleIcon fontSize="small" />
                </IconButton> */}
                <IconButton onClick={() => handleSocialSignUp('google')} size="small" sx={{ border: '1px solid #E6E8F0' }} aria-label="google">
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
                    name="username"
                    label="Username"
                    size="small"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.username && formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    fullWidth
                  />
                  <TextField
                    name="profile_name"
                    label="Profile name"
                    size="small"
                    value={formik.values.profile_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.profile_name && formik.errors.profile_name)}
                    helperText={formik.touched.profile_name && formik.errors.profile_name}
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
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={profilePreview || undefined} sx={{ width: 56, height: 56 }} />
                    <Button
                      variant="contained"
                      component="label"
                      size="small"
                      startIcon={<PhotoCameraOutlined/>}
                      sx={{ backgroundColor: '#FF80C3', color: '#fff', '&:hover': { backgroundColor: '#FF80C3' } }}
                    >
                      Upload Photo
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setProfilePhoto(file);
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setProfilePreview(url);
                          } else {
                            setProfilePreview(null);
                          }
                        }}
                      />
                    </Button>
                  </Stack>

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

                  <Button type="submit" fullWidth size="large" disabled={formik.isSubmitting} sx={{ backgroundColor: '#FF80C3', color: '#fff', '&:hover': { backgroundColor: '#FF80C3' }, borderRadius: 2 }}>
                    {formik.isSubmitting ? (
                      <>
                        <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
                        Creating account...
                      </>
                    ) : (
                      'Sign up'
                    )}
                  </Button>
                </Stack>
              </form>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account?{' '}
                <Box component={NextLink} href="/login" sx={{ color: '#FF80C3', textDecoration: 'none' }}>
                  Sign in
                </Box>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;


