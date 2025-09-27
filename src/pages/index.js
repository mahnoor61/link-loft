// import Head from 'next/head';
// import { Box, Button } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useAuth } from '../hooks/use-auth';
// import { useRouter } from 'next/router';
// import { useAudioContext } from '../utils/audioContext';
// import { useGameInstance } from '../contexts/game-context';

// const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL;

// const Page = () => {
//   const [data, setData] = useState({});
//   const gameIframe = useRef(null);
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();
//   const { isSoundOn } = useAudioContext();
//   const { instance, setInstance } = useGameInstance();
//   const { token } = router.query;

//   useEffect(() => {
//     // Check if the token is present in the URL
//     if (token) {
//       // Store token in localStorage
//       localStorage.setItem('token', token);

//       // Remove the token from the URL by replacing it and then refresh the page
//       router.replace(router.pathname, undefined, { shallow: true }).then(() => {
//         // Reload the page one time after replacing the URL
//         window.location.reload();
//       });
//     }
//   }, [token, router]);

//   useEffect(() => {
//     // Define the global UnityLoaded functi.323on for load gameinstance
//     window.UnityLoaded = () => {
//       console.log('Unity is loaded and ready');
//       initializeGame();
//     };
//   }, []);

//   const fetchUserData = async () => {
//     gameIframe.current.contentWindow.unAuthenticatedRedirection = async () => {
//       if (!isAuthenticated) {
//         try {
//           router.push('/login');
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     };
//     if (isAuthenticated) {
//       try {
//         const token = window.localStorage.getItem('token');
//         const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//         const response = await axios.get(`${API_BASE_URL}/api/user/record/get-data`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-access-token': token
//           }
//         });
//         const res = response.data.data;
//         const responseData = response.data.data.data;
//         setData(responseData);
//         const newUserIntVal = res.isNew;
//         if (res.isNew) {
//           await gameIframe.current.contentWindow.gameInstance.SendMessage('NetworkAPIManager',
//             'DefaultData',
//             JSON.stringify({ isNewTrue: newUserIntVal }));

//         }
//         await gameIframe.current.contentWindow.gameInstance.SendMessage('NetworkAPIManager',
//           'WriteData',
//           JSON.stringify(responseData));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const initializeGame = () => {
//     const gameInstance = gameIframe.current.contentWindow.gameInstance;

//     setInstance(gameInstance);

//     fetchUserData();

//     gameInstance.SendMessage('NetworkAPIManager', 'WriteData', JSON.stringify(data));

//     gameIframe.current.contentWindow.updateData = async (data) => {
//       if (isAuthenticated) {
//         const json = JSON.parse(data);
//         try {
//           const token = window.localStorage.getItem('token');
//           const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//           const response = await axios.post(`${API_BASE_URL}/api/user/record/update-data`,
//             { data: json },
//             {
//               headers: {
//                 'Content-Type': 'application/json',
//                 'x-access-token': token
//               }
//             });
//         } catch (error) {
//           console.log(error);
//           toast.error(error.response.data.msg);
//         }
//       }
//       // else {
//       //   toast.error('Please login in order to save your progress!');
//       // }
//     };

//     gameIframe.current.contentWindow.defaultData = async (data) => {
//       if (isAuthenticated) {
//         const json = JSON.parse(data);
//         try {
//           const token = window.localStorage.getItem('token');
//           const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//           const response = await axios.post(`${API_BASE_URL}/api/user/record/set-data`,
//             { data: json },
//             {
//               headers: {
//                 'Content-Type': 'application/json',
//                 'x-access-token': token
//               }
//             });
//         } catch (error) {
//           console.log(error);
//           toast.error(error.response.data.msg);
//         }
//       } else {
//         toast.error('Please login in order to save your progress!');
//       }
//     };
//   };

//   return (
//     <>
//       <Head>
//         <title>Gameplay | {process.env.NEXT_PUBLIC_APP_NAME}</title>
//       </Head>
//       <Box
//         sx={{ height: '100vh', overflowY: 'hidden' }}>
//         <Box sx={{
//           backgroundColor: 'none'
//         }}
//         >
//           <iframe
//             ref={gameIframe}
//             src={`${BASE_URL}/game/index.html`}
//             frameBorder="0"
//             style={{
//               width: '100%',
//               height: '100vh'
//             }}
//           ></iframe>
//         </Box>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>

// );

// export default Page;

import Head from 'next/head';
import { Box, Toolbar, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from '../components/homepage/navbar';
import SectionOne from '../components/homepage/section-one';
import SectionTwo from '../components/homepage/section-two';
import SectionThree from '../components/homepage/section-three';
import SectionFour from '../components/homepage/section-four';
import Footer from '../components/homepage/footer';

export default function Homepage() {

  return (
    <>
      <Head>
        <title>Homepage | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Navbar />
      <Toolbar />
      <Box >
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </Box>
      <Footer />
    </>
  );
}



