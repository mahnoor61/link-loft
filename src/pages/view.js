import { Icon } from '@iconify/react';
import currencyEur from '@iconify/icons-mdi/currency-eur';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';
import Info from '../components/dashboard/account/info';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ViewTransaction = () => {
  const router = useRouter();
  const { transactionId } = router.query;
  const [singleTransaction, setSingleTransaction] = useState('');

  useEffect(() => {
    const fetchTransaction = async () => {
      if (transactionId) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/admin/get-transaction/${transactionId}`,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            });

          if (response.data.data) {
            setSingleTransaction(response.data.data);
          } else {
            router.push('/'); // Redirect if no transaction data found
          }
          // setSingleTransaction(response.data.data);
        } catch (error) {
          console.log('error', error.response.data.msg);
          router.push('/');
        }
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const email = singleTransaction?.email;
  const name = singleTransaction?.transaction?.name;
  const transaction_Id = singleTransaction?.transaction?.transaction_id;
  const card = singleTransaction?.transaction?.card;
  const euro = singleTransaction?.transaction?.euro.toLocaleString();
  const roundedIdr = Number(singleTransaction?.transaction?.idr).toFixed(2);
  const formattedIdr = Number(parseInt(roundedIdr)).toLocaleString();
  const coins = singleTransaction?.transaction?.coins.toLocaleString();
  const status =
    singleTransaction?.transaction?.status === 'success' ||
    singleTransaction?.transaction?.status === 'Paid'
      ? 'Delivered'
      : 'Not Delivered';

  const time = new Date(singleTransaction?.transaction?.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
  const level = singleTransaction?.record?.data?.ReachedLevel;
  const useCoins = singleTransaction?.record?.data?.UsedGems;
  const totalCoins = singleTransaction?.record?.data?.TotalCoins;
  const leftOver = totalCoins - useCoins;
  console.log('formattedIdr', formattedIdr);
  return (
    <>
      {singleTransaction && (
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            py: 4
          }}
        >
          <Box>
            <Info
              name={name}
              email={email}
              level={level !== undefined && level === 0 ? 1 : level}
              totalCoins={totalCoins}
              leftOverCoins={leftOver}
              useCoins={useCoins}
              component={true}
            />
            <Box
              sx={{
                mt: 1,
                // bgcolor: '#FDE5D1',
                bgcolor: 'white',
                p: 2,
                border: '7px solid black',
                borderRadius: '20px'
              }}
            >
              <Typography variant="h6">
                Delivery Receipt
              </Typography>
              <Box sx={{ overflowY: 'auto', height: { md: 'auto', xs: '40vh', sm: '40vh' } }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mb: 2
                  }}
                >
                  <img alt="logo" src={`${WEB_URL}/logo.png`} width="50"
                       style={{ filter: 'grayscale(100%)' }}/>
                  <img alt="wendycrash" src={`${WEB_URL}/wendycrash.png`} width="110"
                       style={{ filter: 'grayscale(100%)' }}/>
                </Box>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginBottom: '20px'
                  }}
                >
                  <tbody>
                  <tr>
                    <th style={{ padding: '5px', textAlign: 'left' }}>Customer Details</th>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #ddd' }}>
                      Customer Name
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>{name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #ddd' }}>
                      Customer Email
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>{email}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #ddd' }}>
                      Payment Info
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>{card}</td>
                  </tr>
                  </tbody>
                </table>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                  <tr>
                    <th style={{ padding: '5px', textAlign: 'left' }}>Transaction Details</th>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #ddd' }}>
                      Voucher ID
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>{transaction_Id}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #ddd' }}>
                      Transaction Amount
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ margin: 0 }}>EUR: {euro}</p>
                        <Icon icon={currencyEur} width="16" color="#4d4d4d"/>
                      </div>
                      <p style={{ margin: 0 }}>IDR: {formattedIdr}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #ddd' }}>
                      Coins
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>{coins}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #ddd' }}>
                      Coins Status
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>{status}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #ddd' }}>
                      Delivery Date
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #ddd' }}>{time}</td>
                  </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ViewTransaction;
