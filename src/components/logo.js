import { useTheme } from '@mui/material/styles';
import {
  Box
} from '@mui/material';
import NextLink from 'next/link';

export const Logo = ({ height = 200 }) => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;
  const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
  return (
    <>
      <Box
        // component={NextLink}
        // href="/"
        sx={{
          display: 'flex'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${WEB_URL}/logo.png`}
            alt="Logo"
            style={{ height }}/>
        </div>
      </Box>

    </>
  );
};
