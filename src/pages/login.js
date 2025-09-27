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
  CircularProgress, Card, Grid
} from '@mui/material';
import toast from 'react-hot-toast';
import { useMounted } from '../hooks/use-mounted';
import * as React from 'react';
import { signInWithGoogle } from '../firebase/firebase';
import axios from 'axios';
import { useAuth } from '../hooks/use-auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [googleButtonDisabled, setGoogleButtonDisabled] = useState(false);
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
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          height: '100vh'
        }}
      >
        <Grid
          container
          sx={{
            flex: '1 1 auto',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Card
            sx={{
              backgroundColor: 'rgb(253,229,209)',
              border: '8px outset rgb(173, 47, 145)',
              p: 3,
              width: 500,
              m: 2
            }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Login
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ mb: 1 }}
            >
              Please provide your email to log in.
            </Typography>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
              </Stack>
              {
                loading && <Box sx={{ textAlign: 'center', mt: 5 }}><CircularProgress/></Box>
              }
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{
                  mt: 3
                }}
                type="submit"
                disabled={formik.isSubmitting}
              >
                Login
              </Button>
              {/*<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>*/}
              {/*  <hr style={{ width: '40%', color: 'grey' }}/>*/}
              {/*  <Typography>or</Typography>*/}
              {/*  <hr style={{ width: '40%' }}/>*/}
              {/*</Box>*/}
              {/*<Button*/}
              {/*  fullWidth*/}
              {/*  size="large"*/}
              {/*  type="submit"*/}
              {/*  sx={{*/}
              {/*    mt: 2,*/}
              {/*    bgcolor: '#FDE5D1',*/}
              {/*    padding: '8px 20px',*/}
              {/*    border: '1px solid #AD2F91',*/}
              {/*    color: '#AD2F91',*/}
              {/*    display: 'flex',*/}
              {/*    justifyContent: 'center',*/}
              {/*    gap: { md: 3, xs: 1 },*/}
              {/*    '&:hover': {*/}
              {/*      backgroundColor: 'transparent'*/}
              {/*    }*/}
              {/*  }}*/}
              {/*  disabled={googleButtonDisabled}*/}
              {/*  onClick={() => handleGoogleSignIn()}*/}
              {/*>*/}
              {/*  <img src={`${WEB_URL}/google.png`} width="30px"/>*/}
              {/*  <Typography>Sign in with google</Typography>*/}
              {/*</Button>*/}
            </form>
          </Card>
          {/*</Grid>*/}
        </Grid>
      </Box>
    </>
  );
};
export default Page;
