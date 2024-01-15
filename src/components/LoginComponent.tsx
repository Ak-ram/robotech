import { addUser } from '@/redux/proSlice';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Combined message state
  const [isAuth, setIsAuth] = useState(false); // Combined message state
  const [route, setRoute] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const dispatch = useDispatch();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsSubmitDisabled(!e.target.value || !password);
    setMessage(''); // Clear previous messages when input changes
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsSubmitDisabled(!email || !e.target.value);
    setMessage(''); // Clear previous messages when input changes
  };

    const handleSubmit = () => {
      // if (email === 'ibrahem' && password === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
        if (email === process.env.NEXT_PUBLIC_AUTH_USERNAME && password === process.env.NEXT_PUBLIC_AUTH_PASSWORD) {
        // Assuming you want to dispatch user information when the login is successful
        const userInformation = { email, password };
        dispatch(addUser(userInformation));
    
        setMessage('You are authorized to login.'); // Set authorized message
        setIsAuth(true);
        setRoute('/admin');
      } else {
        setMessage('Forbidden: Incorrect username or password.'); // Set error message
        setIsAuth(false);
      }
    };

  return (
    <div className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login Form with Floating Labels</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className={`${isAuth ? 'hidden' : 'block'} py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7`}>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-0 -top-3.5 text-gray-600 text-sm ${email ? '-top-3.5' : 'peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2'} transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-0 -top-3.5 text-gray-600 text-sm ${password ? '-top-3.5' : 'peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2'} transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}
                  >
                    Password
                  </label>
                </div>
                <button
                  onClick={handleSubmit}
                  className={`bg-blue-500 '} text-white rounded-md px-2 py-1 ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitDisabled}
                >
                  Submit
                </button>
              </div>
              <div className="relative mt-5">
                {!isAuth && message && <p className={`${message.includes('authorized') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
                {isAuth && (
                  <div className='text-sm mt-2'>
                    You are authorized now, visit
                    <Link className='underline hover:text-blue-600 mx-1' href={route}>Admin page</Link>
                    to manage your data
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
