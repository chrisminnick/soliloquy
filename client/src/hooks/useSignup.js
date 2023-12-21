import { useState } from 'react';

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signupMessage, setSignupMessage] = useState(null);

  const handleSignup = async (displayName, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8081/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not sign up.');
      }
      setSignupMessage(data.message);
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return { handleSignup, isLoading, signupMessage, error };
}
