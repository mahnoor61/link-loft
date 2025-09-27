// AuthGuard.js
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/use-auth';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      // router.replace('/')
      //       .catch(console.error);
      router.replace({
        pathname: '/login',
        query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
      })
            .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady]);

  if (!checked) {
    return null;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
