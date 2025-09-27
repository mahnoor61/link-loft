import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import UserInfoCard from '../components/dashboard/account/user-info-card';
import { useAuth } from '../hooks/use-auth';
import { useRouter } from 'next/router';
import Transactions from '../../src/pages/transaction';

const Page = () => {

  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // const { transactionId } = router.query;
  //
  // if (transactionId && !isAuthenticated) {
  //   localStorage.setItem('transactionId', transactionId);
  //   router.push(`/login`);
  // } else if (!isAuthenticated) {
  //   router.push('/');
  // }
  if (!isAuthenticated) {
    router.push('/');
  }
  return (
    <>
      <Head>
        <title>
          Account | {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          mt: { md: 5, xs: 1, sm: 3, lg: 5, xl: 5 },
          '@media (min-width: 1200px) and (max-width: 1799px)': {  // lg
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          '@media (min-width: 1800px) and (max-width: 2559px)': {  // xl
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          },
          '@media (min-width: 2560px)': {  // 2xl and above
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          },
          '@media (min-width: 3840px) and (max-width: 5119px)': {  // 3x
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          },
          '@media (min-width: 5120px)': {  // 4x and above
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'

          }
        }}
      >

        <Container maxWidth="md">
          <UserInfoCard/>
          <Transactions/>
        </Container>
      </Box>
    </>
  );

};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
