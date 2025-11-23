import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { validateGoogleToken } = useAuth();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const userType = searchParams.get('userType');
      const error = searchParams.get('error');

      if (error) {
        setError('Authentication failed. Please try again.');
        setStatus('error');
        setTimeout(() => {
          navigate(`/auth/login/${userType || 'user'}`);
        }, 3000);
        return;
      }

      if (!token) {
        setError('No authentication token received.');
        setStatus('error');
        setTimeout(() => {
          navigate(`/auth/login/${userType || 'user'}`);
        }, 3000);
        return;
      }

      try {
        // Validate the token and update auth context
        const result = await validateGoogleToken(token);
        console.log('AuthCallback - Token validation result:', result);
        
        if (result.success) {
          setStatus('success');
          
          setTimeout(() => {
            const userData = result.user;
            console.log('AuthCallback - User data for redirect:', userData);
            
            // Check if this is a first-time Google user or profile not completed
            const needsProfileCompletion = userData.isFirstTimeGoogleUser === true || 
                                         userData.profileCompleted === false ||
                                         (!userData.name && !userData.agencyName);
            
            if (needsProfileCompletion) {
              // Redirect to appropriate complete profile page
              if (userData.role === 'agency') {
                navigate('/auth/complete-agency-details');
              } else {
                navigate('/auth/complete-user-details');
              }
            } else if (userType === 'agency') {
              navigate('/auth/agency/pending-approval'); // Agencies need approval
            } else {
              navigate('/home'); // Users go directly to home
            }
          }, 1500);
        } else {
          throw new Error(result.error || 'Failed to validate token');
        }
        
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Failed to complete authentication.');
        setStatus('error');
        setTimeout(() => {
          navigate(`/auth/login/${userType || 'user'}`);
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, validateGoogleToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900">Completing sign-in...</h2>
              <p className="text-gray-600 mt-2">Please wait while we authenticate your account.</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Sign-in successful!</h2>
              <p className="text-gray-600 mt-2">Redirecting you to your dashboard...</p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Authentication failed</h2>
              <p className="text-red-600 mt-2">{error}</p>
              <p className="text-gray-500 text-sm mt-2">You will be redirected to the login page...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
