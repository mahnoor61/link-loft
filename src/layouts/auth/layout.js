import PropTypes from 'prop-types';
import { Box, Grid, Card } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/router';
import CardContent from '@mui/material/CardContent';

export const Layout = (props) => {
  const { children } = props;

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/');
  }

  return (
    // body
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
          alignItems: 'center',
          margin: { xs: 2, sm: 0 }

        }}
      >
        < Grid
          xs={12}
          lg={4}
          sx={{
            // backgroundColor: 'rgb(253,229,209)',
            // backgroundImage: `url('/card3.png')`,
            // backgroundSize: '100% 100%',
            // border: '10px solid #FDE5D1'
          }}
        >
          <Card sx={{
            // backgroundColor: 'transparent',
            backgroundColor: 'rgb(253,229,209)',
            border: '8px outset rgb(173, 47, 145)',
            borderRadius: '10px'
          }}>
            <CardContent>
              {children}
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};