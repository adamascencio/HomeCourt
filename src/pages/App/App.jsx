import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import CreateRunPage from '../CreateRunPage/CreateRunPage';
import HomePage from '../HomePage/HomePage';
import MyRunsPage from '../MyRunsPage/MyRunsPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const month = ('0' + (new Date().getMonth()+1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const year = new Date().getFullYear();
  const todayStr = `${year}-${month}-${day}`;

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path='/' element={<HomePage user={user} />} />
            <Route path='/runs' element={<MyRunsPage user={user} />} />
            <Route path='/locations/new' element={<CreateRunPage user={user} todayStr={todayStr} />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
