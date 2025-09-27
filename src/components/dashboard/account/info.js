import {
  Box,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import toast from 'react-hot-toast';
import Popover from '@mui/material/Popover';
import { useAuth } from '../../../hooks/use-auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const Info = ({ name, email, totalCoins, leftOverCoins, useCoins, level, component }) => {
// on mouse hover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isAuthenticated } = useAuth();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <Box>
        <Box sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <Box sx={{ mb: component ? 0 : .5, display: component ? 'none' : 'block' }}>
            <img alt="account" src={`${WEB_URL}/Account.png`} width="150px"/>
          </Box>
          <Card
            sx={{
              display: 'flex',
              backgroundColor: component ? 'white' : 'rgb(253,229,209)',
              border: component ? '7px solid black' : '7px solid rgb(173, 47, 145)',
              borderRadius: '20px',
              p: { xs: 1, md: component ? 1 : 3 },
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            <Box
              component="img"
              src={`${WEB_URL}/logo.png`}
              alt="logo"
              sx={{
                width: { xs: '100px', md: component ? '110px' : '150px', margin: 'auto' },
                filter: component ? 'grayscale(100%)' : 'none'
              }}
            />
            <CardContent
              sx={{
                flex: '1 1 auto',
                pt: component ? 0 : ''
              }}
            >
              <Box
                sx={
                  {
                    my: { md: component ? '5px' : '20px', xs: 0, sm: 0 }
                  }
                }>
                <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Name</b>:</Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    {name}
                  </Typography>
                </Box>
                {
                  email ? (
                    <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                      <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Email</b>:</Typography>
                      {
                        (email <= 20) ? (
                            <Typography
                              variant="body2"
                              sx={{ fontSize: '12px' }}
                            >
                              {email}
                            </Typography>
                          ) :
                          (
                            <div>
                              <Typography
                                variant="body2"
                                sx={{
                                  width: '100%',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  fontSize: '12px'
                                }}
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                              >
                                {email || ''}
                              </Typography>
                              <Popover
                                id="mouse-over-popover"
                                sx={{
                                  pointerEvents: 'none'
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left'
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left'
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                              >

                                <Typography sx={{ p: 1, fontSize: '12px' }}>
                                  {email || ''}
                                </Typography>
                              </Popover>
                            </div>
                          )
                      }
                    </Box>
                  ) : ''
                }
                <Box sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1,
                  mb: 0.5,
                  mt: { md: 1, xs: 0, sm: 0 }
                }}>
                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Purchased
                    Coins</b></Typography>
                  <Typography variant="body2" sx={{ fontSize: '12px' }}>{totalCoins}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Used
                    Coins:</b></Typography>
                  <Typography variant="body2" sx={{ fontSize: '12px' }}>{useCoins}</Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Remaining
                    Coins:</b></Typography>
                  <Typography variant="body2" sx={{ fontSize: '12px' }}>{leftOverCoins}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>
                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Level</b>:</Typography>
                  <Typography sx={{ fontSize: '12px' }} variant="body2">
                    {level}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  )
    ;
};

Info.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Info;
