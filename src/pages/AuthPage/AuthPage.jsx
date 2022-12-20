import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
    <div className="full-screen-container">
      <div className='login-container'>
        <h1>HomeCourt - Change</h1>
        { showLogin ?
            <LoginForm setUser={setUser} />
            :
            <SignUpForm setUser={setUser} />
        }
        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? 'Sign Up' : 'Log In'}
        </button>
      </div>
    </div>
  );
}