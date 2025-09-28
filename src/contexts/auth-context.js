import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const router = useRouter();
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const response = await axios.get(API_BASE_URL + '/api/user/auth',
          {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            }
          }
        );
        // localStorage.setItem('token', response.data.data.token);
        // delete response.data.data.token;

        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }
    } catch (err) {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
      console.log(err.response.data.msg);
    }

  };

  useEffect(
    () => {
      initialize();
    },
    []
  );

  const signIn = async ({ email, password }) => {
    try {
      const response = await axios.post(API_BASE_URL + `/api/user/login`,
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const { user, token } = response.data.data;
      window.localStorage.setItem('token', token);
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.msg || 'Login failed');
    }
  };

  const signUp = async ({ email, username, password, profilePhoto }) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      if (profilePhoto) {
        formData.append('profile_photo', profilePhoto);
      }

      const response = await axios.post(API_BASE_URL + '/api/user/register', formData);
      return response.data.data; // { unique_id }
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Registration failed');
    }

  };

  const verifyRegistration = async ({ code, unique_id }) => {
    try {
      const response = await axios.post(API_BASE_URL + '/api/user/verify',
        { code, unique_id },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const { user, token } = response.data.data;
      window.localStorage.setItem('token', token);
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Verification failed');
    }
  };

  const forgotPassword = async ({ email }) => {
    try {
      const response = await axios.post(API_BASE_URL + '/api/user/forgot-password',
        { email },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.data; // { unique_id }
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Failed to send reset code');
    }
  };

  const resetPassword = async ({ code, unique_id, new_password }) => {
    try {
      await axios.post(API_BASE_URL + '/api/user/reset-password',
        { code, unique_id, new_password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Failed to reset password');
    }
  };

  const signOut = () => {

    localStorage.removeItem('token');

    router.push('/');
    dispatch({
      type: HANDLERS.SIGN_OUT
    });

  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        verifyRegistration,
        forgotPassword,
        resetPassword,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
