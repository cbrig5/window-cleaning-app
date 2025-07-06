import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import website from '../website';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

export default function useAuthStatus() {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const tokenExpiration = decodedToken.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (err) {
      console.error('JWT decode error:', err);
      setIsAuthorized(false);
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!isAuthorized) {
      setIsAuthorized(false);
      return;
    }
    try {
      const res = await website.post('/api/token/refresh/', {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log('Refresh token error:', error);
      setIsAuthorized(false);
    }
  };
  return isAuthorized;
}
