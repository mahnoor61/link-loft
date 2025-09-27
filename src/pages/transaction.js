import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Paper,
  Stack,
  Chip, Card, CardContent,
  Container
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FilterHelper, { applyPagination } from '../utils/filter-pagination';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import EuroIcon from '@mui/icons-material/Euro';
import Popover from '@mui/material/Popover';
import { Icon } from '@iconify/react';
import currencyEur from '@iconify/icons-mdi/currency-eur';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/use-auth';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

const Transaction = () => {

  const router = useRouter();
  const { transactionId } = router.query;
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState(transactionId ? transactionId : '');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openDialogue, setOpenDialogue] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  const handleClickOpen = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialogue(true);
  };

  const handleClose = () => {
    setOpenDialogue(false);
  };

  const getTransactions = async () => {
    setLoading(true);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = window.localStorage.getItem('token');
    try {
      if (token) {
        const response = await axios.get(
          `${API_BASE_URL}/api/transaction/get-all-history`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            }
          }
        );
        setTransactions(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTransactions();
    const intervalId = setInterval(getTransactions, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (transactionId) {
      setSearchQuery(transactionId);
    }
  }, [transactionId]);

  const filtered = FilterHelper(transactions, searchQuery, ['transaction_id', 'coins']);

  // const filtered = FilterHelper(transactions, searchQuery, ['transaction_id', 'coins']);
  const paginatedList = applyPagination(filtered, page, rowsPerPage);
  const totalCount = filtered.length;

  // Calculate values for the receipt
  const getReceiptData = (transaction) => {
    if (!transaction) {
      return {};
    }

    const Idr = transaction.idr || '';
    const roundedIdr = Number(Idr).toFixed(2);
    const formattedIdr = Number(parseInt(roundedIdr)).toLocaleString();

    return {
      voucherId: transaction.transaction_id,
      voucherValue: formattedIdr,
      coins: transaction.coins,
      voucherStatus: transaction.status === 'success' || transaction.status === 'Paid'
        ? 'Delivered'
        : 'Not Delivered',

      deliveryDate: new Date(transaction.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      })
    };
  };

  const receiptData = selectedTransaction ? getReceiptData(selectedTransaction) : {};

  function printReceipt() {
    const printContents = document.getElementById('receipt').innerHTML;

    const styles = `
    <style>
      @media print {
        @page {
          margin: 0;
        }
        body {
          margin: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
          background-color: #FDE5D1 !important;
          zoom: 180%;
        }
        .print-only {
          display: block !important;
        }
      }
      .print-only {
        display: none;
      }
    </style>`;

    const originalTitle = document.title;
    document.title = `Delivery Receipt-${receiptData.voucherId}`;

    // Create a new iframe element
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write('<html><head><title>Print Receipt</title>');
    doc.write(styles); // Inject styles
    doc.write('</head><body>');
    doc.write(printContents);
    doc.write('</body></html>');
    doc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // Remove the iframe after printing
    iframe.contentWindow.onafterprint = () => {
      document.body.removeChild(iframe);
      document.title = originalTitle;
    };
  }

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [openSearchBox, setOpenSearchBox] = useState(false);
  const handleSearchBtn = () => {
    setOpenSearchBox(true);
  };
  //formate date and time:
  const formatDateTime = (t) => {
    const dateObj = new Date(t);

    // Format date
    const formattedDate = dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });

    // Format time in 24-hour format
    const formattedTime = dateObj.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    // Combine date and time
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            mb: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}
        >
          <img src={`${WEB_URL}/Transaction.png`} width="220px" height="40"/>
          {
            smDown ? <Button onClick={handleSearchBtn}>
                Search
              </Button>
              :
              <TextField
                variant="filled"
                placeholder="Search transaction..."
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  border: '3px solid #AD2F91',
                  '&::placeholder': {
                    color: 'rgba(71, 85, 105, 1)'
                  },
                  '& input': {
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'start',
                    padding: '0 8px'
                  },
                  height: 40,
                  width: { sm: '100%', xs: '100%', md: '40%' },
                  marginRight: '22px'
                }}
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <Box variant="text" disabled={true}>
                      <SearchIcon sx={{ mt: 1.5, color: 'rgba(71, 85, 105, 1)' }}/>
                    </Box>
                  )
                }}
              />
          }
        </Box>

        <Paper
          sx={{
            width: '100%',
            // height: 270,
            overflow: 'hidden',
            bgcolor: '#FDE5D1',
            borderRadius: '20px',
            // bgcolor:'yellow',
            border: '7px solid #AD2F91',
            '@media (min-width: 1200px) and (max-width: 1799px)': {  // lg
              height: transactions.length > 10 ? '40vh' : 250
              // height: transactions.length > 10 ? '40vh' : 1250
            },
            '@media (min-width: 1800px) and (max-width: 2559px)': {  // xl
              // height: transactions.length > 10 ? '45vh' : 550,
              height: transactions.length > 10 ? '75vh' : 400
            },
            '@media (min-width: 2560px)': {  // 2xl and above
              // height: transactions.length > 10 ? '45vh' : 400,
              height: transactions.length > 10 ? '55vh' : 550
            },
            '@media (min-width: 3840px)': {  // 3x and above
              // height: transactions.length > 10 ? '45vh' :550,
              height: transactions.length > 10 ? '70vh' : 550
            },
            '@media (min-width: 5120px)': {  // 4x and above
              // height: transactions.length > 10 ? '45vh' : 500,
              height: transactions.length > 10 ? '75vh' : 550
            }
          }}
        >
          <TableContainer
            sx={{
              // height: 200,
              display: 'flex',
              flexDirection: 'column',
              // bgcolor: 'pink',
              overflowY: 'auto', // Enable vertical scroll,
              '@media (min-width: 1200px) and (max-width: 1799px)': {  // lg
                height: transactions.length > 10 ? '30vh' : 200
                // height: transactions.length > 10 ? '30vh' : 1200,
              },
              '@media (min-width: 1800px) and (max-width: 2559px)': {  // xl
                // height: transactions.length > 10 ? '40vh' : 500,
                height: transactions.length > 10 ? '70vh' : 350
              },
              '@media (min-width: 2560px)': {  // 2xl and above
                // height: transactions.length > 10 ? '40vh' : 350,
                height: transactions.length > 10 ? '50vh' : 500
              },
              '@media (min-width: 3840px)': {  // 3x and above
                // height: transactions.length > 10 ? '40vh' : 500,
                height: transactions.length > 10 ? '65vh' : 500
              },
              '@media (min-width: 5120px)': {  // 4x and above
                // height: transactions.length > 10 ? '40vh' :450,
                height: transactions.length > 10 ? '70vh' : 500
              }
            }}
          >
            <Table stickyHeader aria-label="sticky table" className="asas">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: '#FDE5D1',
                      width: '400px', fontSize: '11px'
                    }}>Transaction
                    Id</TableCell>
                  <TableCell align="center" style={{
                    backgroundColor: '#FDE5D1',
                    width: '300px',
                    fontSize: '11px'
                  }}>Purchased Coins</TableCell>
                  <TableCell align="center" style={{
                    backgroundColor: '#FDE5D1',
                    width: '200px',
                    fontSize: '11px'
                  }}>Amount</TableCell>
                  <TableCell align="center" style={{
                    backgroundColor: '#FDE5D1',
                    width: '100px',
                    fontSize: '11px'
                  }}>Status</TableCell>
                  <TableCell align="center" style={{
                    backgroundColor: '#FDE5D1',
                    width: '250px',
                    fontSize: '11px'
                  }}>Received
                    Date</TableCell>
                  <TableCell align="center" style={{
                    backgroundColor: '#FDE5D1',
                    width: '10px',
                    fontSize: '11px'
                  }}>Receipt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{
                overflowY: 'auto',
                height: 30
              }}>
                {paginatedList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No transactions</TableCell>
                  </TableRow>
                ) : (
                  paginatedList.map((entry, index) => {
                    const {
                      transaction_id,
                      coins,
                      is_success,
                      idr,
                      time,
                      euro
                    } = entry;

                    const roundedIdr = Number(idr).toFixed(2);
                    const formattedIdr = Number(parseInt(roundedIdr)).toLocaleString();

                    return (
                      <TableRow key={index} tabIndex={-1}>
                        <TableCell align="left"
                                   style={{ fontSize: '12px' }}>{transaction_id}</TableCell>
                        <TableCell align="left" style={{
                          fontSize: '12px',
                          textAlign: 'center'
                        }}>{coins?.toLocaleString()}</TableCell>
                        <TableCell align="left" style={{ fontSize: '12px' }}>
                          EUR: {Number(euro)?.toLocaleString()}<br/>IDR: {formattedIdr}
                        </TableCell>
                        <TableCell align="left">
                          <Chip
                            label={is_success ? 'Coins Delivered' : 'Coins Not Delivered'}
                            style={{
                              color: 'white',
                              backgroundColor: is_success ? '#4caf50' : '#cc0000',
                              fontSize: '12px'
                            }}
                            variant="contained"
                          />
                        </TableCell>
                        {/*<TableCell align="left">{new Date(time).toLocaleString()}</TableCell>*/}
                        <TableCell align="left" style={{
                          width: '200px',
                          fontSize: '12px'
                        }}>{formatDateTime(time)}</TableCell>
                        <TableCell align="left">
                          <IconButton
                            onClick={() => handleClickOpen(entry)}
                          >
                            <RemoveRedEyeIcon size="small" sx={{ fontSize: '15px' }}/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[25, 50, 100, 125]}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Dialog
        open={openSearchBox}
        onClose={() => setOpenSearchBox(false)}
        aria-labelledby="search-transaction"
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#FDE5D1'
          }
        }}
      >
        <DialogTitle id="search-transaction" sx={{ px: 1 }}>
          Search Transaction
        </DialogTitle>
        <DialogContent sx={{ p: 1 }}>
          <TextField
            variant="filled"
            placeholder="Search transaction..."
            sx={{
              backgroundColor: 'white',
              borderRadius: '10px',
              '&::placeholder': {
                color: 'rgba(71, 85, 105, 1)'
              },
              '& input': {
                display: 'flex',
                alignItems: 'center',
                textAlign: 'start',
                padding: '0 8px'
              },
              width: { sm: '100%', xs: '100%', md: '40%' }
            }}
            onChange={event => setSearchQuery(event.target.value)}
            InputProps={{
              endAdornment: (
                <Box variant="text" disabled={true}>
                  <SearchIcon sx={{ mt: 1.5, color: 'rgba(71, 85, 105, 1)' }}/>
                </Box>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button size="sm" onClick={() => setOpenSearchBox(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={openDialogue}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: '#FDE5D1'
            }
          }}
        > <DialogTitle id="responsive-dialog-title" sx={{ paddingBottom: 0 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Delivery Receipt
            </Typography>
            <IconButton onClick={printReceipt}>
              <Icon icon="eva:download-outline" sx={{ color: '#4d4d4d' }}/>
            </IconButton>
          </Box>
        </DialogTitle>
          <DialogContent sx={{ overflowY: 'hidden' }}>
            <div id="receipt" className="receipt" style={{
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'space-around',
              backgoundColor: '#FDE5D1'
            }}>
              <Typography variant="h5" sx={{ mb: 2, display: 'none', fontSize: '12px !important' }}
                          className="print-only">
                Delivery Receipt
              </Typography>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                paddingBottom: '10px'
              }}>
                <img alt="logo" src={`${WEB_URL}/logo.png`} width="50"/>
                <img galt="wendycrash" src={`${WEB_URL}/wendycrash.png`} width="110"/>
              </div>
              <table style={{
                textAlign: 'left',
                marginBottom: '20px',
                width: '100%',
                borderCollapse: 'collapse'

              }}>
                <tbody>
                <tr>
                  <th style={{ padding: '5px' }}>Customer Details</th>
                </tr>
                {selectedTransaction && (
                  <>
                    <tr>
                      <td style={{
                        padding: '5px',
                        fontWeight: 500,
                        border: '1px solid #dddddd'
                      }}>Customer Name
                      </td>
                      <td style={{
                        padding: '5px',
                        border: '1px solid #dddddd'
                      }}>{selectedTransaction.name}</td>
                    </tr>
                    <tr>
                      <td style={{
                        padding: '5px',
                        fontWeight: 500,
                        border: '1px solid #dddddd'
                      }}>Customer Email
                      </td>
                      <td style={{
                        padding: '5px',
                        border: '1px solid #dddddd'
                      }}>{selectedTransaction.user_id.email}</td>
                    </tr>
                    <tr>
                      <td style={{
                        padding: '5px',
                        fontWeight: 500,
                        border: '1px solid #dddddd'
                      }}>Payment Info
                      </td>
                      <td className="obscured"
                          style={{
                            padding: '5px',
                            border: '1px solid #dddddd'
                          }}>{selectedTransaction.card}</td>
                    </tr>
                  </>
                )}
                </tbody>
              </table>
              <table style={{ textAlign: 'left', width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                <tr>
                  <th style={{ padding: '5px' }}>Transaction Details</th>
                </tr>
                <tr>
                  <td
                    style={{ padding: '5px', fontWeight: 500, border: '1px solid #dddddd' }}>Voucher
                    ID
                  </td>
                  <td style={{
                    padding: '5px',
                    border: '1px solid #dddddd'
                  }}>{receiptData.voucherId}</td>
                </tr>
                <tr>
                  <td style={{
                    padding: '5px',
                    fontWeight: 500,
                    border: '1px solid #dddddd'
                  }}>Transaction<br/> Amount
                  </td>
                  <td style={{ padding: '5px', border: '1px solid #dddddd' }}>
                    {selectedTransaction && (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <p style={{ margin: 0 }}>
                            EUR: {selectedTransaction.euro}
                          </p>
                          <Icon icon={currencyEur} width="16" color="#4d4d4d" sx={{ mb: 1 }}/>
                        </div>
                        <div>
                          <p style={{ margin: 0 }}>
                            IDR: {receiptData.voucherValue}
                          </p>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ padding: '5px', fontWeight: 500, border: '1px solid #dddddd' }}>Coins
                  </td>
                  <td
                    style={{
                      padding: '5px',
                      border: '1px solid #dddddd'
                    }}>{receiptData?.coins?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td
                    style={{ padding: '5px', fontWeight: 500, border: '1px solid #dddddd' }}>Coins
                    Status
                  </td>
                  <td style={{
                    padding: '5px',
                    border: '1px solid #dddddd'
                  }}>{receiptData.voucherStatus}</td>
                </tr>
                <tr>
                  <td style={{
                    padding: '5px',
                    fontWeight: 500,
                    border: '1px solid #dddddd'
                  }}>Delivery Date
                  </td>
                  <td style={{
                    padding: '5px',
                    border: '1px solid #dddddd'
                  }}>{receiptData.deliveryDate}</td>
                </tr>
                </tbody>
              </table>
              <a className="print-only"
                 href={`${WEB_URL}/view?transactionId=${receiptData.voucherId}`}
                 style={{
                   display: 'none',
                   width: '100%',
                   color:'#AD2F91',
                   marginTop: '10px'
                 }}>View your Coins Delivery here
              </a>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

Transaction.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Transaction;
