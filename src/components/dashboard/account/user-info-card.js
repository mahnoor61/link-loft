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
import Info from './info';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const UserInfoCard = () => {

  const [userInfo, setUserInfo] = useState({});
  const { isAuthenticated } = useAuth();
// // on mouse hover
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const { isAuthenticated } = useAuth();
//
//   const handlePopoverOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//
//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

  // const open = Boolean(anchorEl);
  // api of of fetch user info
  console.log('userInfo', userInfo);
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated) {
        try {
          const token = window.localStorage.getItem('token');
          const response = await axios.get(API_BASE_URL + '/api/user/get-info', {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            }
          });
          const data = response.data.data;
          setUserInfo(data);
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.msg);
        }
      }
    };
    fetchUserInfo();
  }, [isAuthenticated]);

  const remainingCoins = userInfo.userData?.data?.TotalCoins - userInfo.userData?.data?.UsedGems;
  const userName = userInfo?.user?.name;
  return (
    <>

      {isAuthenticated && (
        <Info
          name={userName ? userName : window.localStorage.getItem('customerName')}
          email={userInfo.user?.email ? userInfo.user?.email : ''}
          totalCoins={userInfo.userData?.data?.TotalCoins !== undefined
            ? Number(userInfo.userData?.data?.TotalCoins).toLocaleString()
            : ''}
          leftOverCoins={remainingCoins || ''}
          useCoins={userInfo.userData?.data?.UsedGems !== undefined
            ? Number(userInfo.userData?.data?.UsedGems).toLocaleString()
            : ''}
          level={userInfo.userData?.data?.ReachedLevel !== undefined
          && userInfo.userData?.data?.ReachedLevel === 0
            ? 1
            : userInfo.userData?.data?.ReachedLevel}
        />
      )}
      {/*<Box>*/}
      {/*  <Box sx={{*/}
      {/*    width: '100%',*/}
      {/*    display: 'flex',*/}
      {/*    justifyContent: 'center',*/}
      {/*    flexDirection: 'column'*/}
      {/*  }}>*/}
      {/*    <Box sx={{ mb: .5 }}>*/}
      {/*      <img alt="account" src={`${WEB_URL}/Account.png`} width="150px"/>*/}
      {/*    </Box>*/}
      {/*    <Card*/}
      {/*      sx={{*/}
      {/*        display: 'flex',*/}
      {/*        backgroundColor: 'rgb(253,229,209)',*/}
      {/*        border: '7px solid rgb(173, 47, 145)',*/}
      {/*        borderRadius: '20px',*/}
      {/*        p: { xs: 1, md: 3 },*/}
      {/*        flexDirection: { xs: 'column', md: 'row' }*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Box*/}
      {/*        component="img"*/}
      {/*        src={`${WEB_URL}/logo.png`}*/}
      {/*        alt="logo"*/}
      {/*        sx={{*/}
      {/*          width: { xs: '100px', md: '150px', margin: 'auto' }*/}
      {/*        }}*/}
      {/*      />*/}
      {/*      <CardContent*/}
      {/*        sx={{*/}
      {/*          flex: '1 1 auto'*/}
      {/*          // mt: { md: 2, xs: 0, sm: 0 }*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <Box sx={*/}
      {/*          {*/}
      {/*            my: { md: '20px', xs: 0, sm: 0 }*/}
      {/*          }*/}
      {/*        }>*/}
      {/*          {*/}
      {/*            isAuthenticated ? (*/}
      {/*              window.localStorage.getItem('customerName') && (*/}
      {/*                <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>*/}
      {/*                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Name</b>:</Typography>*/}
      {/*                  <Typography sx={{ fontSize: '12px' }}>*/}
      {/*                    {window.localStorage.getItem('customerName') || ''}*/}
      {/*                  </Typography>*/}
      {/*                </Box>*/}
      {/*              )) : (*/}
      {/*              userInfo.user?.name && (*/}
      {/*                <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>*/}
      {/*                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Name</b>:</Typography>*/}
      {/*                  <Typography sx={{ fontSize: '12px' }}>*/}
      {/*                    {name}*/}
      {/*                  </Typography>*/}
      {/*                </Box>*/}
      {/*              )*/}
      {/*            )*/}
      {/*          }*/}
      {/*          {*/}
      {/*            userInfo.user?.email ? (*/}
      {/*              <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>*/}
      {/*                <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Email</b>:</Typography>*/}
      {/*                {*/}
      {/*                  (userInfo.user?.email.length <= 20) ? (*/}
      {/*                      <Typography*/}
      {/*                        variant="body2"*/}
      {/*                        sx={{ fontSize: '12px' }}*/}
      {/*                      >*/}
      {/*                        {userInfo.user?.email || ''}*/}
      {/*                      </Typography>*/}
      {/*                    ) :*/}
      {/*                    (*/}
      {/*                      <div>*/}
      {/*                        <Typography*/}
      {/*                          variant="body2"*/}
      {/*                          sx={{*/}
      {/*                            width: '100%',*/}
      {/*                            whiteSpace: 'nowrap',*/}
      {/*                            overflow: 'hidden',*/}
      {/*                            textOverflow: 'ellipsis',*/}
      {/*                            fontSize: '12px'*/}
      {/*                          }}*/}
      {/*                          aria-owns={open ? 'mouse-over-popover' : undefined}*/}
      {/*                          aria-haspopup="true"*/}
      {/*                          onMouseEnter={handlePopoverOpen}*/}
      {/*                          onMouseLeave={handlePopoverClose}*/}
      {/*                        >*/}
      {/*                          {userInfo.user?.email || ''}*/}
      {/*                        </Typography>*/}

      {/*                        <Popover*/}
      {/*                          id="mouse-over-popover"*/}
      {/*                          sx={{*/}
      {/*                            pointerEvents: 'none'*/}
      {/*                          }}*/}
      {/*                          open={open}*/}
      {/*                          anchorEl={anchorEl}*/}
      {/*                          anchorOrigin={{*/}
      {/*                            vertical: 'bottom',*/}
      {/*                            horizontal: 'left'*/}
      {/*                          }}*/}
      {/*                          transformOrigin={{*/}
      {/*                            vertical: 'top',*/}
      {/*                            horizontal: 'left'*/}
      {/*                          }}*/}
      {/*                          onClose={handlePopoverClose}*/}
      {/*                          disableRestoreFocus*/}
      {/*                        >*/}

      {/*                          <Typography sx={{ p: 1, fontSize: '12px' }}>*/}
      {/*                            {userInfo.user?.email || ''}*/}
      {/*                          </Typography>*/}
      {/*                        </Popover>*/}
      {/*                      </div>*/}
      {/*                    )*/}
      {/*                }*/}
      {/*              </Box>*/}
      {/*            ) : ''*/}
      {/*          }*/}

      {/*          {*/}
      {/*            userInfo.userData &&*/}

      {/*            (*/}
      {/*              <>*/}
      {/*                <Box sx={{*/}
      {/*                  display: 'flex',*/}
      {/*                  alignItems: 'baseline',*/}
      {/*                  gap: 1,*/}
      {/*                  mb: 0.5,*/}
      {/*                  mt: { md: 1, xs: 0, sm: 0 }*/}
      {/*                }}>*/}
      {/*                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Purchased*/}
      {/*                    Coins</b></Typography>*/}
      {/*                  <Typography variant="body2" sx={{ fontSize: '12px' }}>{*/}

      {/*                    userInfo.userData?.data?.TotalCoins !== undefined*/}
      {/*                      ? Number(userInfo.userData?.data?.TotalCoins).toLocaleString()*/}
      {/*                      : ''*/}
      {/*                  }</Typography>*/}
      {/*                </Box>*/}
      {/*                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>*/}
      {/*                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Used*/}
      {/*                    Coins:</b></Typography>*/}
      {/*                  <Typography variant="body2" sx={{ fontSize: '12px' }}>{*/}

      {/*                    userInfo.userData?.data?.UsedGems !== undefined*/}
      {/*                      ? Number(userInfo.userData?.data?.UsedGems).toLocaleString()*/}
      {/*                      : ''*/}
      {/*                  }</Typography>*/}
      {/*                </Box>*/}
      {/*                <Box*/}
      {/*                  sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>*/}
      {/*                  <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Remaining*/}
      {/*                    Coins:</b></Typography>*/}
      {/*                  <Typography variant="body2" sx={{ fontSize: '12px' }}>{*/}

      {/*                    userInfo.userData?.data?.TotalCoins !== undefined*/}
      {/*                      ? Number(remainingCoins).toLocaleString()*/}
      {/*                      : ''*/}
      {/*                  }</Typography>*/}
      {/*                </Box>*/}
      {/*              </>*/}
      {/*            )*/}
      {/*          }*/}
      {/*          {*/}
      {/*            userInfo.userData && (*/}
      {/*              <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>*/}
      {/*                <Typography sx={{ fontSize: '12px', ml: 1 }}><b>Level</b>:</Typography>*/}
      {/*                <Typography sx={{ fontSize: '12px' }} variant="body2">*/}
      {/*                  {*/}
      {/*                    userInfo.userData?.data?.ReachedLevel !== undefined*/}
      {/*                    && userInfo.userData?.data?.ReachedLevel === 0*/}
      {/*                      ? 1*/}
      {/*                      : userInfo.userData?.data?.ReachedLevel*/}
      {/*                  }*/}
      {/*                </Typography>*/}
      {/*              </Box>*/}
      {/*            )*/}
      {/*          }*/}
      {/*        </Box>*/}
      {/*      </CardContent>*/}
      {/*    </Card>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      {/* )*/}
      {/*}*/}
    </>
  );
};

UserInfoCard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default UserInfoCard;