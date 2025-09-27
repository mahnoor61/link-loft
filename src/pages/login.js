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
  CircularProgress, Card, Grid, FormControlLabel, Switch
} from '@mui/material';
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

  const { signIn } = useAuth();
  const isMounted = useMounted();

  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required')
    }),
    onSubmit: async (values, helpers) => {
      const loading = toast.loading(
        'Verification code sent to your email. Please check your inbox.', { duration: 15000 });
      setLoading(true);
      try {

        await signIn({ email: values.email, method: 'email' });
        formik.resetForm(); // Reset the form immediately
        // router.push('/verify_login');
        toast.dismiss(loading);
      } catch (err) {
        toast.error(err.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);

      }
      toast.dismiss(loading);
      setLoading(false);
    }

  });

  const handleGoogleSignIn = async () => {
    setGoogleButtonDisabled(true);
    // user data comes in data
    const data = await signInWithGoogle();
    const { email } = data.user;
    await window.localStorage.setItem('userName', data.user.displayName);
    try {
      const response = await axios.post(API_BASE_URL + '/api/signIn-with/google',
        {
          email
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const userToken = response.data.data.token;
      toast.success('Login successfully');
      window.localStorage.setItem('token', userToken);
      // await signIn({ email,method:'google'});
      // it replace with new url and also reload the page this method is used
      window.location.replace('/');
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
                      fullWidth
                      label="Password"
                      type="password"
                      size="small"
                      // disabled
                      // helperText="Password is not required. We send a code to your email."
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
                    />

                    {loading && <Box sx={{ textAlign: 'center', mt: 1 }}><CircularProgress size={24}/></Box>}
                    {formik.errors.submit && (
                      <Typography color="error" sx={{ mt: 1 }} variant="body2">{formik.errors.submit}</Typography>
                    )}

                    <Button fullWidth size="large" type="submit" disabled={formik.isSubmitting} sx={{ mt: 1 , backgroundColor: '#FF80C3', color: '#FFFFFF', '&:hover': { backgroundColor: '#FF80C3', color: '#FFFFFF' } , borderRadius: 12}}>
                      Sign in
                    </Button>
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
              <img src="/signinlogo.png" alt="Logo" style={{ width: 180, maxWidth: '60%' }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Page;
