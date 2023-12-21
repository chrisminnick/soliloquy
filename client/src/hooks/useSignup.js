import { useState } from 'react';
import { api } from '../api/api';

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [signupMessage, setSignupMessage] = useState(null);

  const handleSignup = async (displayName, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.signup('user/signup', {
        displayName,
        email,
        password,
      });

      setSignupMessage(response.message);
      setIsLoading(false);
      return response;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return { handleSignup, isLoading, signupMessage, error };
}
