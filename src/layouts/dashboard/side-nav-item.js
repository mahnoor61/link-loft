import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Typography } from '@mui/material';

export const SideNavItem = (props) => {
  const { active = false, external, icon, path, onClick, activeTitle, disableTitle, title } = props;

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <>
      <li onClick={onClick}>
        <ButtonBase
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            px: '16px',
            py: '10px',
            textAlign: 'left',
            width: '100%',
            // borderRadius: 2,
            backgroundColor: active ? '#FF80C3' : 'transparent',
            '&:hover': {
              backgroundColor: active ? '#FF80C3' : 'rgba(255,128,195,0.15)'
            }
          }}
          {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: active ? '#000000' : '#FF80C3',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2
              }}
            >
              {icon}
            </Box>
          )}
          <Box component="span" sx={{ display: 'flex', flexGrow: 1 }}>
            {title ? (
              <Typography variant="body2" sx={{
                color: active ? '#001D2D' : '#E5E7EB',
                fontWeight: 700
              }}>
                {title}
              </Typography>
            ) : (
              active ? activeTitle : disableTitle
            )}
          </Box>
        </ButtonBase>
      </li>
    </>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  activeTitle: PropTypes.node,
  disableTitle: PropTypes.node,
  path: PropTypes.string,
  // title: PropTypes.string.isRequired
};
