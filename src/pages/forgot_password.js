import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/use-auth';
import {
  Box,
  Grid,
  Card,
  Typography,
  Stack,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';

const Page = () => {
  const router = useRouter();
  const { forgotPassword } = useAuth();

  const formik = useFormik({
    initialValues: { email: '', submit: null },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
    }),
    onSubmit: async (values, helpers) => {
      helpers.setSubmitting(true);
      try {
        const data = await forgotPassword({ email: values.email });
        toast.success('Reset code sent. Please check your email.');
        router.push(`/reset_password?token=${data.unique_id}`);
      } catch (error) {
        toast.error(error.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
      } finally {
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>Forgot Password | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ display: 'flex', flex: '1 1 auto', height: '100vh', backgroundColor: '#FFF2F9' }}>
        <Grid container data-aos="zoom-in" sx={{ flex: '1 1 auto', height: '100%' }}>
          {/* Left column: card */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 6 } }}>
            <Box sx={{ width: '100%', maxWidth: 420 }}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Forgot your password?</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 , mt:3}}>Enter your email to receive a reset code</Typography>
                <Box>
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

                      {formik.errors.submit && (
                        <Typography color="error" sx={{ mt: 1 }} variant="body2">{formik.errors.submit}</Typography>
                      )}

                      <Button fullWidth size="large" type="submit" disabled={formik.isSubmitting} sx={{ mt: 1 , backgroundColor: '#FF80C3', color: '#FFFFFF', '&:hover': { backgroundColor: '#FF80C3', color: '#FFFFFF' } , borderRadius: 12}}>
                        {formik.isSubmitting ? (
                          <>
                            <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
                            Sending...
                          </>
                        ) : (
                          'Send Reset Code'
                        )}
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Card>
            </Box>
          </Grid>

          {/* Right column: background image */}
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


