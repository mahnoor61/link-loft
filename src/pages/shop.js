import Head from 'next/head';
import {
  Box,
  Typography,
  Card,
  Button,
  Stack,
  TextField,
  InputAdornment,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/use-auth';
import EuroIcon from '@mui/icons-material/Euro';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Script from 'next/script';
import NextLink from 'next/link';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { blue } from '@mui/material/colors';
import Link from 'next/link';
import TermsAndConditions from './terms';
import PrivacyPolicy from './privacy';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TRANSFERTY_URL = process.env.NEXT_PUBLIC_TRANSFERTY_URL;

const Page = () => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
// stat for payment popup
    const [open, setOpen] = React.useState(false);
    const [customerToken, setCustomerToken] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [euroToOther, setEuroToOther] = useState({}); // set 1 euro to other currencies
    const [formattedCoins, setFormattedCoins] = useState('');
    const [isInitial, setIsInitial] = useState(true);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [paymentData, setPaymentData] = useState({});
    const [customerName, setCustomerName] = useState('');
    const [openPrivacy, setOpenPrivacy] = useState(false);
    const [openTerms, setOpenTerms] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handlePrivacyOpen = () => {
      setOpenPrivacy(true);
    };

    const handlePrivacyClose = () => {
      setOpenPrivacy(false);
    };

    const handleTermsOpen = () => {
      setOpenTerms(true);
    };

    const handleTermsClose = () => {
      setOpenTerms(false);
    };

//   card button style
    const buttonStyle = {
      marginTop: '8px',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      border: '3px solid white',
      color: '#ad2f91',
      width: '100%',
      height: '40px',
      borderColor: isHovered ? '#ad2f91' : 'transparent',
      cursor: 'pointer',
      transition: 'border-color 0.3s ease'
    };
    const handleInputChange = (event) => {
      // const { value , selectionStart, selectionEnd} = event.target;
      const { value } = event.target;
      const cleanedValue = value.replace(/,/g, '');
      let coins = cleanedValue ? parseInt(cleanedValue) : '';
      if (isNaN(coins)) {
        coins = 0;
      }
      // const formattedValue = coins.toLocaleString('en-US',
      //   { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      // setFormattedCoins(formattedValue);
      setFormattedCoins(coins);
      formik.setFieldValue('coins', coins);
      // setTimeout(() => {
      //   event.target.setSelectionRange(selectionStart, selectionEnd);
      // }, 0);

      setIsInitial(false);
    };

    if (!isAuthenticated) {
      router.push('/login');
    }

    // card style :
    const styles = {
      font: {
        // to set custom fontFamily either 'cssFontSrc' or 'src' field is mandatory
        cssFontSrc: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap',
        src: 'url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2)',
        fontFamily: 'Roboto'
      },
      inputs: {
        fontSize: '15px',
        fontColor: 'black',
        errorColor: '#f05555'
      },
      placeholders: {
        fontColor: 'black',
        opacity: 0.7
        // textTransform: 'capitalize !important'
      },
      dropdown: {
        borderRadius: '5px',
        borderColor: '#8a97a0',
        borderWidth: '1px',
        backgroundColor: 'white',
        options: {
          base: {
            fontColor: '#8a97a0'
          },
          hover: {
            fontColor: 'white',
            backgroundColor: '#8280e9'
          }
        },
        removeCard: {
          fontColor: 'white',
          backgroundColor: 'red',
          confirmButton: {
            base: {
              fontColor: 'white',
              backgroundColor: 'green'
            },
            hover: {
              fontColor: 'white',
              backgroundColor: 'lightgreen'
            }
          },
          cancelButton: {
            base: {
              fontColor: 'white',
              backgroundColor: 'red'
            },
            hover: {
              fontColor: 'white',
              backgroundColor: '#f07572'
            }
          }
        }
      }
    };

    const transfertyLoaded = () => {
      const key = process.env.NEXT_PUBLIC_TRANSFERTY_API_KEY;
      //create the card instance:
      const app = window.Card(`${key}`);
      const customer_data = {
        token: customerToken,
        email: user.email
      };

      app.setCustomer(customer_data);

      const config = {
        transaction_type: 'payment',
        styles
      };

      const view = app.createView('Card.String', config);
      view.mount('#card-app-root');

      // for transferty card errors
      view.addEventListener('field-error', function (event) {
        const errorElement = document.getElementById('card-app-errors');
        if (event.error) {
          errorElement.textContent = event.error.message;
        } else {
          errorElement.textContent = '';
        }
      });

      const amount = euro;
      const currency = 'EUR';
      const details = { cardholder: '' };
      const form = document.getElementById('payment-form');

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        view.createPaymentToken(amount, currency, details).then(function (result) {
          // console.log('result', result);
          //get payment token from result
          if (result.error) {
            const errorElement = document.getElementById('card-app-errors');
            errorElement.textContent = result.error.message;
          } else {
            // Handle Card payment token.
            localStorage.setItem('paymentResult', JSON.stringify(result));
            handlePaymentToken(result.token);
          }
        });
      });
    };

    const curl = process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN;

//generate random order id
    function generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    const handlePaymentToken = async token => {
      try {

        const name = localStorage.getItem('customerName');

        if (!name) {
          throw new Error('Name is required');
        }

        const isChecked = localStorage.getItem('isChecked') === 'true'; // Get the boolean value
        if (!isChecked) {
          toast.error('You must accept the Terms and Conditions and Privacy Policy to purchase coins.');
          return;
        }

        const response = await axios.post(`${TRANSFERTY_URL}/v1/transaction/pay`, {
          reference: 'id23422',
          order_id: generateRandomString(16),
          order_description: 'Buying coins',
          token,
          amount: euro,
          currency: 'EUR',
          subscribe: false,
          allow_currency_convert: false,
          forced_convert: false,
          allow_cascading_after_3ds: false
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${curl}`
          }
        });
        const paymentInfo = response.data;
        // Reset `isChecked` after form submission

        setPaymentData(paymentData);
        // Check the response data here
        if (paymentInfo && paymentInfo.transaction.status === 'success') {
          handleCoinPurchase();
          localStorage.setItem('isChecked', 'false');
          setIsChecked(false);
        }

        Transaction(paymentInfo);
      } catch (err) {
        toast.error(err.message);
        console.error('err: ', err.message);
      }
    };

    //handle coins purchased
    const handleCoinPurchase = async () => {
      const loadingToast = toast.loading('Calculating amount...');
      try {
        const response = await axios.post(`${API_BASE_URL}/api/coins/buy`, {
          coins: formik.values.coins
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem('token')
          }
        });
        formik.resetForm();
        setFormattedCoins('1,000'); // Reset to initial formatted value
        setIsInitial(true); // Reset initial state
        setIsCardVisible(false);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.msg);
      } finally {
        toast.dismiss(loadingToast);
      }
    };

    // calculate amount
    const formik = useFormik({
      initialValues: {
        coins: ''
      },
      validationSchema: Yup.object({
        coins: Yup.number()
                  .required('Coins are required')
                  .positive('Coins must be more than 0')
      }),
      onSubmit: async (values, helpers) => {
        // if(!isChecked) {
        //   toast.error('Please accept the terms and conditions',
        //     { duration: 5000 });
        //   return;
        // }
      }
    });

    const Transaction = async (paymentData) => {

      const name = localStorage.getItem('customerName');
      try {
        //replace alphabets into the id and format it
        const id = paymentData.transaction?.external_id;
        const transactionIdStr = String(id);
        const numericId = transactionIdStr.replace(/\D/g, '');
        const prefix = 'WCRS';
        const firstThree = numericId.slice(0, 3);   // First 3 numbers
        const nextFive = numericId.slice(3, 8);     // Next 5 numbers
        const nextTwo = numericId.slice(8, 10);     // Next 2 numbers
        const remainig = numericId.slice(10);
        const formattedId = `${prefix}${firstThree}-${nextFive}-${nextTwo}`;
        const completeId = formattedId + remainig;
        const euro = paymentData.transaction.amount;
        const card = paymentData.card.mask;
        const status = paymentData.transaction.status;

        const response = await axios.post(`${API_BASE_URL}/api/transaction/create`, {
          data: paymentData,
          idr: parseFloat(idrEquivalent),
          coins: formik.values.coins,
          name,
          euro: parseInt(euro),
          card,
          status,
          // transaction_id: completeId
          transaction_id: completeId
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem('token')
          }
        });
        if (status === 'success') {
          toast.success('Coins purchased successfully',
            { duration: 5000 });
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.msg);
      }

    };

//rest api
    const fetchOtherCurrencies = async () => {
      try {
        const response = await axios.get(`https://open.er-api.com/v6/latest/EUR`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setEuroToOther(response.data.rates);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
      }
    };
    console.log('euroToOthers=', euroToOther);
    useEffect(() => {
      fetchOtherCurrencies();
    }, []);

    // const idrEquivalent = (formik.values.coins / 5 * euroToOther['IDR']).toFixed(2);
    // const euro = (formik.values.coins / 5);
    const idrEquivalent = (formik.values.coins * euroToOther['IDR']).toFixed(2);
    const euro = (formik.values.coins);

    const getTransfertyCustomerToken = async () => {
      try {
        const response = await axios.post(`${TRANSFERTY_URL}/v1/customer/token`, {
          id: user._id,
          details: { email: user.email }
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${curl}`
          }
        });
        setCustomerToken(response.data.data.customer_token);
      } catch (err) {
        console.error('err: ', err.message);
      }
    };

    getTransfertyCustomerToken();
    const handleCardVisible = () => {
      if (formik.values.coins > 0) {
        setIsCardVisible(true);
      }

      // formik.resetForm();
    };
    useEffect(() => {
      if (isCardVisible) {
        transfertyLoaded();
      }
    }, [isCardVisible]);

    const handleNameChange = e => {
      setCustomerName(e.target.value);
      localStorage.setItem('customerName', e.target.value);
    };

    useEffect(() => {
      // Retrieve the value from local storage on component mount
      const storedValue = localStorage.getItem('isChecked') === 'true';
      setIsChecked(storedValue);
    }, [isChecked]);

    const handleCheckboxChange = (e) => {
      const checked = e.target.checked;
      setIsChecked(checked);
      localStorage.setItem('isChecked', checked); // Store the checkbox state in local storage
    };

    return (
      <>
        <Script src="https://js-sandbox.transferty.com/v1/" onLoad={() => {
          transfertyLoaded();
        }}/>

        <Head>
          <title>Shop | {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <Box sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Box sx={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'flex-start', flexDirection: 'column'
          }}>
            <Box>
              <img src={`${WEB_URL}/ShopBG.png`} width="100px"/>
            </Box>
            <Box>
              <Card sx={{
                width: { md: 400, lg: 400, xl: 400, sm: 350, xs: 350 },
                maxWidth: { md: 400, lg: 400, xl: 400, sm: 350, xs: 350 },
                // maxWidth: 350,
                backgroundColor: 'rgb(253,229,209)',
                border: '7px solid rgb(173, 47, 145)',
                borderRadius: '20px'
              }}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                  <img
                    src={`${WEB_URL}/coins.png`}
                    width="70%"
                  />
                </Box>
                <Box sx={{
                  pl: 2, pr: 2
                }}>
                  <Typography variant="h5" sx={{ mb: 1, fontFamily: 'Tahoma' }}>
                    Purchase Coins
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ mb: 1, fontFamily: 'Tahoma' }}
                  >
                    Enter the amount of coins you want to purchase
                  </Typography>
                  <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                  >
                    <Stack spacing={2}>
                      <TextField
                        error={!!(formik.touched.coins && formik.errors.coins)}
                        fullWidth
                        helperText={formik.touched.coins && formik.errors.coins}
                        name="coins"
                        onBlur={formik.handleBlur}
                        onChange={handleInputChange}
                        type="text"
                        // placeholder="5 coin = 1 Euro"
                        placeholder="1,000"
                        variant="standard"
                        value={formattedCoins}
                        className="purchase-coins"
                        sx={{
                          textAlign: 'right',
                          '& input': {
                            color: isInitial ? 'text.secondary' : 'black'
                          },
                          '& .MuiFormLabel-root': {
                            fontFamily: 'Roboto !important',
                            fontSize: '12px !important'
                          },
                          '& .MuiFormLabel-root.Mui-error': {
                            color: '#AD2F91', // Label color when error
                            fontFamily: 'Roboto !important',
                            fontSize: '12px !important'
                          },
                          '& .MuiInputBase-input': {
                            fontFamily: 'Roboto !important',
                            fontSize: '12px !important' // Input text font size and family
                          },
                          '& .MuiInput-underline:after': {
                            borderBottomColor: '#AD2F91' // Bottom border color when error
                          },
                          '& .MuiFormHelperText-root': {
                            fontFamily: 'Roboto !important',
                            fontSize: '12px !important'
                          },
                          '& .MuiFormHelperText-root.Mui-error': {
                            color: '#AD2F91', // Helper text color when error
                            fontFamily: 'Roboto !important',
                            fontSize: '12px !important' // Error text font size and family
                          }
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography color="text.secondary" variant="body2" sx={{
                                fontFamily: 'Roboto !important',
                                fontSize: '12px !important'
                              }}>
                                Coins
                              </Typography>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Stack>
                    {/*payment from*/}
                    <Box sx={{ bgcolor: 'transparant', p: 1, pl: 0, pr: 0 }} id="card"
                         style={{ display: isCardVisible ? 'block' : 'none' }}>
                      <form id="payment-form">
                        <Box sx={{
                          backgroundColor: 'transparant',
                          borderRadius: '4px',
                          paddingTop: '7px',
                          paddingBottom: '7px',
                          pl: 0,
                          pr: 0,
                          position: 'relative',
                          transition: 'border .1s',
                          width: '100%'
                        }}>
                          <Typography variant="h6" htmlFor="card-app-root"
                                      sx={{ mb: 1, fontWeight: 'bold' }}>Card Details</Typography>
                          <TextField
                            error={!customerName}
                            fullWidth
                            helperText={!customerName ? 'Your Card Name is Required' : ''}
                            name="name"
                            onChange={handleNameChange}
                            type="text"
                            placeholder="Enter your Card Name"
                            variant="standard"
                            value={customerName}
                            sx={{
                              mb: 2,
                              '& .MuiFormLabel-root': {
                                fontFamily: 'Roboto !important',
                                fontSize: '12px !important'
                              },
                              '& .MuiFormLabel-root.Mui-error': {
                                color: '#AD2F91', // Label color when error
                                fontFamily: 'Roboto !important',
                                fontSize: '12px !important'
                              },
                              '& .MuiInputBase-input': {
                                fontFamily: 'Roboto !important',
                                fontSize: '12px !important' // Input text font size and family
                              },
                              '& .MuiInput-underline:after': {
                                borderBottomColor: '#AD2F91' // Bottom border color when error
                              },
                              '& .MuiFormHelperText-root': {
                                fontFamily: 'Roboto !important',
                                fontSize: '12px !important'
                              },
                              '& .MuiFormHelperText-root.Mui-error': {
                                color: '#AD2F91', // Helper text color when error
                                fontFamily: 'Roboto !important',
                                fontSize: '12px !important' // Error text font size and family
                              }
                            }}
                          />
                          <div id="card-app-root" aria-placeholder="Card Number">Card Number</div>
                          <div id="card-app-errors"
                               style={{ color: '#AD2F91', fontSize: '12px' }}></div>
                        </Box>
                        <Button
                          fullWidth
                          type="submit"
                        >
                          Purchase:
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: '100%'
                          }}>
                            <Typography
                              variant="body2"
                            >

                              {/*{Number(formik.values.coins / 5).toLocaleString('en-US',*/}
                              {/*  { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <b><EuroIcon*/}
                              {/*fontSize="medium"*/}
                              {/*sx={{ fontSize: '14px', verticalAlign: 'middle', marginBottom: '3px' }}*/}
                              {Number(formik.values.coins).toLocaleString('en-US',
                                { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <b><EuroIcon
                              fontSize="medium"
                              sx={{ fontSize: '14px', verticalAlign: 'middle', marginBottom: '3px' }}
                            /></b>
                            </Typography>
                          </Box>
                        </Button>
                      </form>
                    </Box>
                    {!isCardVisible && (
                      <Button
                        fullWidth
                        size="large"
                        sx={{
                          mt: 2,
                          fontFamily: 'Tahoma'
                        }}
                        type="submit"
                        disabled={formik.isSubmitting}
                        onClick={() => {
                          formik.handleSubmit();
                          handleCardVisible();
                        }}
                      >
                        Purchase:
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          width: '100%'
                        }}>
                          <Typography
                            color="#ffffff"
                            variant="body2"
                          >
                            {Number(formik.values.coins).toLocaleString('en-US',
                              { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <b><EuroIcon
                            fontSize="medium"
                            sx={{ fontSize: '14px', verticalAlign: 'middle', marginBottom: '3px' }}
                          />
                            {/*  {Number(formik.values.coins / 5).toLocaleString('en-US',*/}
                            {/*    { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <b><EuroIcon*/}
                            {/*  fontSize="medium"*/}
                            {/*  sx={{ fontSize: '14px', verticalAlign: 'middle', marginBottom: '3px' }}*/}
                            {/*/>*/}
                          </b>
                          </Typography>
                        </Box>
                      </Button>
                    )}
                    <Box
                      sx={{
                        marginTop: '5px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginBottom: 0
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        {Object.values(euroToOther).length && (
                          <Typography
                            color="text.secondary"
                            variant="body2"
                            sx={{
                              mb: 1,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Typography style={{ marginRight: '5px', fontSize: '12px' }}>
                              Equivalent: IDR {idrEquivalent
                              ? Number(idrEquivalent).toLocaleString('en-US')
                              : ' 0.00'}
                            </Typography>
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </form>
                  <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            sx={{
                              color: '#AD2F91',
                              '&.Mui-checked': {
                                color: '#AD2F91'
                              },
                              ml:2.5
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{
                            fontSize: {md: 10 , lg:10, xl:10, sm:8, xs:8},
                            color: '#6C737F'
                          }}>
                            I accept your
                            <Box
                              component="span"
                              onClick={handleTermsOpen}
                              sx={{
                                cursor: 'pointer',
                                color: '#AD2F91',
                                textDecoration: 'none',
                                mx: 0.5 // Use margin shorthand for horizontal margin
                              }}
                            >
                              Terms and Conditions
                            </Box>
                            and your
                            <Box
                              component="span"
                              onClick={handlePrivacyOpen}
                              sx={{
                                cursor: 'pointer',
                                textDecoration: 'none',
                                mx: 0.5, // Use margin shorthand for horizontal margin
                                color: '#AD2F91'
                              }}
                            >
                              Privacy Policy.
                            </Box>
                          </Typography>
                        }

                        sx={{
                          '& .MuiSvgIcon-root': { fontSize: 18 }
                        }}
                      />

                      <PrivacyPolicy open={openPrivacy} onClose={handlePrivacyClose}/>
                      <TermsAndConditions open={openTerms} onClose={handleTermsClose}/>
                  </FormGroup>
                </Box>
              </Card>

            </Box>
          </Box>
        </Box>
      </>
    );
  }
;

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

