import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';

export const SideNavItem = (props) => {
  const { active = false, external, icon, path, onClick, activeTitle, disableTitle } = props;

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
            py: '6px',
            textAlign: 'left',
            // backgroundImage: active ? `url('/pink.png')` : `url('/dark.png')`,
            backgroundImage: `url('/pink.png')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%'
          }}
          {...linkProps}
        >
          {/*icons*/}
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: '#ffffff',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: '#ffffff'
                })
              }}
            >
              {icon}
            </Box>
          )}
          {/*button text*/}
          <Box
            component="span"
            sx={{
              display: "flex"
              // bgcolor:'white',
              // color: '#FE22CA',
              // flexGrow: 1,
              // letterSpacing: '2px',
              // fontSize: 15,
              // fontFamily: 'Tahoma',
              // fontWeight: 'bolder',
              // lineHeight: '24px',
              // ...(active && {
              //   color: '#ED811A'
              // }),
              // ...(disabled && {
              //   color: '#FE22CA'
              // })
            }}
          >
            {active ? activeTitle :  disableTitle}
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
