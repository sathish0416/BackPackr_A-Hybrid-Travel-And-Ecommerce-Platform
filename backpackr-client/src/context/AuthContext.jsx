import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on load
    const storedToken = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (storedToken && userData) {
      setToken(storedToken);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      setError('');

      // Match backend routes: /login for users, /agency/login for agencies
      const loginEndpoint = role === 'agency'
        ? 'http://localhost:5000/api/auth/agency/login'
        : 'http://localhost:5000/api/auth/login';

      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const pendingApproval = role === 'agency' && data.message?.toLowerCase().includes('pending');
        if (pendingApproval) {
          return {
            success: false,
            error: 'Your agency account is pending approval. Please wait for admin confirmation.',
            redirectTo: '/auth/agency/pending-approval'
          };
        }
        throw new Error(data.message || 'Invalid email or password. Please check your credentials and try again.');
      }

      const account = data.user || data.agency;
      if (!account) {
        throw new Error('Login failed. Please try again.');
      }

      const normalizedUser = {
        ...account,
        name: account.name || account.agencyName || account.email?.split('@')[0],
        role: account.role || role,
        status: account.status || (account.role === 'agency'
          ? (account.isApproved === false ? 'pending' : 'approved')
          : 'active')
      };

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      setToken(data.token);
      setUser(normalizedUser);
      
      return { success: true, user: normalizedUser };
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Unable to connect to the server. Please check your internet connection and try again.');
      return { success: false, error: error.message || 'Unable to connect to the server. Please check your internet connection and try again.' };
    }
  };

  // Method to handle Google sign-in token validation
  const validateGoogleToken = async (token) => {
    try {
      setError('');
      
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to verify your Google account. Please try signing in again.');
      }
      
      const userData = await response.json();
      
      // Handle different response formats
      const userObj = userData.data || userData;
      
      const normalizedUser = {
        ...userObj,
        name: userObj.name || userObj.agencyName || userObj.email?.split('@')[0],
        agencyName: userObj.agencyName || userObj.name, // Ensure agencyName is preserved
        status: userObj.status || (userObj.role === 'agency'
          ? (userObj.isApproved === false ? 'pending' : 'approved')
          : 'active')
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      setToken(token);
      setUser(normalizedUser);
      
      return { success: true, user: normalizedUser };
    } catch (error) {
      console.error('Token validation error:', error);
      setError(error.message || 'Google sign-in failed. Please try again.');
      return { success: false, error: error.message || 'Google sign-in failed. Please try again.' };
    }
  };

  const register = async (userData, role) => {
    try {
      setError('');
      setLoading(true);
      
      // 1. First, register the user
      const registerEndpoint = role === 'agency' 
        ? 'http://localhost:5000/api/auth/agency/register'
        : 'http://localhost:5000/api/auth/register';
      
      const registerResponse = await fetch(registerEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      const registerData = await registerResponse.json();
      
      if (!registerResponse.ok) {
        throw new Error(registerData.message || 'Registration failed. Please check your information and try again.');
      }

      // For agencies, don't auto-login
      if (role === 'agency') {
        return { 
          success: true, 
          user: registerData.user,
          message: 'Registration successful! Your account is pending admin approval.'
        };
      }

      // For regular users, auto-login after registration
      try {
        const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password
          }),
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
          throw new Error(loginData.message || 'Registration successful but automatic login failed. Please log in manually.');
        }

        // Update auth state
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
        setToken(loginData.token);
        setUser(loginData.user);
        
        return { 
          success: true, 
          user: loginData.user,
          redirectTo: '/home'  // Add redirect path
        };
        
      } catch (loginError) {
        console.error('Auto-login error:', loginError);
        // Registration was successful, but auto-login failed
        return { 
          success: true, 
          user: registerData.user,
          message: 'Registration successful! Please log in.',
          redirectTo: '/auth/login/user'
        };
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please check your internet connection and try again.');
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please check your internet connection and try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setError('');
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    register,
    validateGoogleToken,
    setUser,
    isAuthenticated: !!token && !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
