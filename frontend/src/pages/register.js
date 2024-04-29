import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <div className="flex min-h-screen bg-white justify-center items-center">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
          <div className="text-black text-3xl text-center font-semibold mb-6">MAYNOOTH</div>
          {/* Email input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="your@email.com"
              autoComplete='off'
            />
          </div>
          {/* Password input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Create a password"
            />
          </div>
          {/* Confirm Password input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
            />
          </div>
          {/* Submit button */}
          <div className="mb-6">
            <button
              className="bg-black text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline hover:bg-gray-700"
              type="button"
              onClick={() => alert("Sign up clicked")}
            >
              Sign Up
            </button>
          </div>
          {/* Login link */}
          <div className="text-center">
            <button onClick={handleLoginClick} className="inline-block align-baseline font-bold text-sm text-gray-900 hover:text-gray-500">
              Already have an account? Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
