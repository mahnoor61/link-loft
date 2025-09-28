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
  const { resetPassword } = useAuth();
  const { token } = router.query;

  const formik = useFormik({
    initialValues: { code: '', new_password: '', confirm_password: '', submit: null },
    validationSchema: Yup.object({
      code: Yup.string().max(255).required('Code is required'),
      new_password: Yup.string().min(6, 'At least 6 characters').required('New password is required'),
      confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match').required('Confirm your password')
    }),
    onSubmit: async (values, helpers) => {
      helpers.setSubmitting(true);
      try {
        await resetPassword({ code: values.code, unique_id: token, new_password: values.new_password });
        toast.success('Password reset successfully. Please login.');
        router.push('/login');
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
        <title>Reset Password | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ display: 'flex', flex: '1 1 auto', height: '100vh', backgroundColor: '#FFF2F9' }}>
        <Grid container data-aos="zoom-in" sx={{ flex: '1 1 auto', height: '100%' }}>
          {/* Left column: card */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 6 } }}>
            <Box sx={{ width: '100%', maxWidth: 420 }}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Reset your password</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 , mt:3}}>Enter the code and your new password</Typography>
                <Box>
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                      <TextField
                        error={!!(formik.touched.code && formik.errors.code)}
                        fullWidth
                        helperText={formik.touched.code && formik.errors.code}
                        label="Reset Code"
                        name="code"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.code}
                        size="small"
                      />
                      <TextField
                        error={!!(formik.touched.new_password && formik.errors.new_password)}
                        fullWidth
                        helperText={formik.touched.new_password && formik.errors.new_password}
                        label="New Password"
                        name="new_password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.new_password}
                        size="small"
                      />
                      <TextField
                        error={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                        fullWidth
                        helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                        label="Confirm Password"
                        name="confirm_password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.confirm_password}
                        size="small"
                      />
                      {formik.errors.submit && (
                        <Typography color="error" sx={{ mt: 1 }} variant="body2">{formik.errors.submit}</Typography>
                      )}
                      <Button fullWidth size="large" type="submit" disabled={formik.isSubmitting} sx={{ mt: 1 , backgroundColor: '#FF80C3', color: '#FFFFFF', '&:hover': { backgroundColor: '#FF80C3', color: '#FFFFFF' } , borderRadius: 12}}>
                        {formik.isSubmitting ? (
                          <>
                            <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
                            Resetting...
                          </>
                        ) : (
                          'Reset Password'
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


