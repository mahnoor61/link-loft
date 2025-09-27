import {
  createTheme,
  filledInputClasses,
  inputLabelClasses,
  outlinedInputClasses,
  paperClasses,
  tableCellClasses
} from '@mui/material';
import { success } from './colors';

// Used only to create transitions
const muiTheme = createTheme();

export function createComponents(config) {
  const { palette } = config;

  return {

    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0

        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          backgroundColor: '#ad2f91',
          // backgroundImage: `url('/pink.png')`,
          // backgroundSize: '100% 100% ',
          transition: muiTheme.transitions.create([
            'transform',
            'background-color',
            'border-color',
            'box-shadow'
          ]),
          '&:hover': {
            // backgroundColor: '#7e2971',
            // backgroundImage: `url('/dark.png')`,
            // backgroundSize: '100% 100%'
          },
          color: palette.success.contrastText
        },
        outlined: {
          backgroundColor: 'transparent',
          borderRadius: 999,
          borderWidth: 2,
          borderColor: palette.success.main,
          color: palette.text.primary,
          fontWeight: 700,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: palette.success.alpha12,
            borderColor: palette.success.main,
            transform: 'translateY(-2px)',
            boxShadow: 'none'
          }
        },

        sizeSmall: {
          padding: '6px 16px'
        },
        sizeMedium: {
          padding: '8px 20px'
        },
        sizeLarge: {
          padding: '11px 24px'
        },
        textSizeSmall: {
          padding: '7px 12px'
        },
        textSizeMedium: {
          padding: '9px 16px'
        },
        textSizeLarge: {
          padding: '12px 16px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // borderRadius: '30px',
          // padding: '2px',
          [`&.${paperClasses.elevation1}`]: {
            // boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
            // backgroundImage: `url('/card.png')`,
            // backgroundSize: '100% 100%',
            // backgroundColor: "transparent"
            // backgroundColor: 'none'
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          // padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '0'
          }
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6'
        },
        subheaderTypographyProps: {
          variant: 'body2'
        }
      },
      styleOverrides: {
        root: {
          padding: '32px 24px 16px'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box'
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%'
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%'
        },
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%'
        },
        '#nprogress': {
          pointerEvents: 'none'
        },
        '#nprogress .bar': {
          backgroundColor: '#AD2F91',
          height: 3,
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2000
        },
        '#nprogress .peg': {
          boxShadow: '0 0 10px #AD2F91, 0 0 5px #AD2F91'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',

          '&::placeholder': {
            color: '#606060'
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#fde5d1',
          borderRadius: 8,
          borderStyle: 'solid',
          borderWidth: 1,
          overflow: 'hidden',
          borderColor: palette.neutral[200],
          transition: muiTheme.transitions.create([
            'border-color',
            'box-shadow'
          ]),
          '&:hover': {
            backgroundColor: '#ffffff',
            color: palette.success.main
          },
          '&:before': {
            display: 'none'
          },
          '&:after': {
            display: 'none'
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: 'transparent'
          },
          [`&.${filledInputClasses.focused}`]: {
            borderColor: palette.success.main,
            boxShadow: `${palette.success.main} 0 0 0 2px`
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: palette.error.main,
            boxShadow: `${palette.error.main} 0 0 0 2px`
          }
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          color: '#606060'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: palette.action.hover,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.success.main
            }
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.primary.main,
              boxShadow: `${palette.primary.main} 0 0 0 2px`
            }
          },
          [`&.${filledInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.error.main,
              boxShadow: `${palette.error.main} 0 0 0 2px`
            }
          }
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          color: palette.text.secondary
        },
        notchedOutline: {
          borderColor: palette.success.main,
          transition: muiTheme.transitions.create([
            'border-color',
            'box-shadow'
          ])
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          color: palette.text.secondary,
          [`&.${inputLabelClasses.filled}`]: {
            transform: 'translate(12px, 18px) scale(1)'
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: 'translate(0, -1.5px) scale(0.85)'
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: 'translate(12px, 6px) scale(0.85)'
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: 'translate(14px, -9px) scale(0.85)'
            },
            [`&.${outlinedInputClasses.focused}`]: {
              color: palette.success.main
            }

          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: 'auto',
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: 'none',
          '& + &': {
            marginLeft: 24
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: palette.divider,
          padding: '15px 16px'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
            backgroundColor: palette.neutral[50],
            color: palette.neutral[700],
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase'
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 4,
            paddingBottom: 4
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled'
      }
    }
  };
}
