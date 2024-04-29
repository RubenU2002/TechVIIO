import '../index.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const handleLogin = async () => {
    if(email === '' || password === '') return alert('Email and password are required');
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      // Guardar el JWT en localStorage o en un contexto si es necesario
      localStorage.setItem('token', data.token);
      
      // Redireccionar al usuario o hacer algo una vez que la autenticación es exitosa
      navigate('/home');
    } catch (error) {
      console.error('Hubo un problema con la petición Fetch:', error);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-white justify-center items-center">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-lg px-8 pt-6 pb-8 mb-4">
          <div className="text-black text-3xl text-center font-semibold mb-6">MAYNOOTH</div>
          {/* Email input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-black w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              onChange={handleEmailChange}
              autoComplete='off'
            />
          </div>
          {/* Password input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border-2 border-black w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
              id="password"
              type="password"
              placeholder="Your password"
              required
              onChange={handlePasswordChange}
            />
          </div>
          {/* Remember me checkbox */}
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox"/>
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <a href="/login" className="inline-block align-baseline font-normal text-sm text-black hover:text-gray-500">
              Forgot password?
            </a>
          </div>
          {/* Submit button */}
          <div className="mb-6">
            <button
              className="bg-black text-white font-medium py-3 px-4 w-full"
              type="button"
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>
          <div className="text-center mb-6">
            <span className="text-gray-600 text-sm">OR</span>
          </div>
          {/* Social login buttons */}
          <div className="space-y-4 mb-6">
            <button
              className="border-2 border-black text-black font-normal py-3 px-4 w-full"
              type="button"
            >
              Continue with Google
            </button>
            <button
              className="border-2 border-black text-black font-normal py-3 px-4 w-full"
              type="button"
            >
              Continue with Facebook
            </button>
          </div>
          {/* Sign up link */}
          <div className="text-center">
            <button onClick={handleSignUpClick} className="inline-block align-baseline font-bold text-sm text-gray-900 hover:text-gray-500">
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

