import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CircularProgress, Grid, Stack, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/use-auth';
import { useMounted } from '../hooks/use-mounted';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn, user, isAuthenticated } = useAuth();
  const { token } = router.query;

  const isMounted = useMounted();
  const formik = useFormik({
    initialValues: {
      code: '',
      unique_id: '',
      submit: null
    },
    validationSchema: Yup.object({
      code: Yup
        .string()
        .max(255)
        .required('Verification code is required')
    }),
    onSubmit: async (values, helpers) => {
      // const loading = toast.loading('Verification in process...');
      setLoading(true);
      try {

        const response = await axios.post(API_BASE_URL + '/api/user/login-verification',
          {
            code: values.code,
            unique_id: token
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Login successfully....');
        const transactionID = localStorage.getItem('transactionId');
        localStorage.removeItem('transactionId');
        if (transactionID) {
          router.push(`/account?transactionId=${transactionID}`);

        } else {
          router.push('/');
        }
        localStorage.setItem('token', response.data.data.token);

      } catch (error) {
        console.log(error);

        toast.error(error.response.data.msg);
        setLoading(false);
      }
    }
  });

  return (
    <>
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
            // margin: { xs: 2, sm: 0 }

          }}
        >
          <Card sx={{
            backgroundColor: 'rgb(253,229,209)',
            border: '8px outset rgb(173, 47, 145)',
            p: 3,
            width: 500,
            m: 2
          }}>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ mb: 1 }}
            >
              Please enter the authentication code sent to your e-mail address.
            </Typography>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.code && formik.errors.code)}
                  fullWidth
                  helperText={formik.touched.code && formik.errors.code}
                  label="Enter Authentication Code"
                  name="code"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.code}
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
                Send
              </Button>
            </form>
          </Card>
        </Grid>
      </Box>
    </>
  );
};
// Page.getLayout = (page) => (
//   <AuthLayout>
//     {page}
//   </AuthLayout>
// );

export default Page;
