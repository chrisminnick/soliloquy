import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, setToken, setUser } from '../features/auth/authSlice';
import throttle from 'lodash/throttle';

export default function useLogin(email, password) {
  const [loginErr, setLoginErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = throttle(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await dispatch(login({ email, password }));
      localStorage.setItem('token', JSON.stringify(data.payload.accessToken));
      dispatch(setToken(data.payload.accessToken));
      dispatch(setUser(data.payload.userId));
      navigate('/posts', { replace: true });
    } catch (err) {
      setLoginErr(err.message);
    } finally {
      setIsLoading(false);
    }
  }, 1000);

  return { handleSubmit, loginErr, isLoading };
}
