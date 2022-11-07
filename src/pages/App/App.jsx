import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as runsAPI from '../../utilities/runs-api';
import AuthPage from '../AuthPage/AuthPage';
import CreateRunPage from '../CreateRunPage/CreateRunPage';
import HomePage from '../HomePage/HomePage';
import MyRunsPage from '../MyRunsPage/MyRunsPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [runData, setRunData] = useState([]);
  const [localRuns, setLocalRuns] = useState([]);
  const [userRuns, setUserRuns] = useState([]);

  const month = ('0' + (new Date().getMonth()+1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  const year = new Date().getFullYear();
  const todayStr = `${year}-${month}-${day}`;

  useEffect(function() {
    async function getNonUserRuns() {
      const runs = await runsAPI.getAllRuns();
      setRunData(runs);
    }
    getNonUserRuns();
  }, []);

  useEffect(function() {
    async function getRuns() {
      const getRuns = await runsAPI.getUserRuns();
      setUserRuns(getRuns);
    }
    getRuns();
  }, [runData]);

  return (
    <main className="App">
      { user ?
        <>
          <NavBar setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path='/' element={<HomePage user={user} runData={runData} setRunData={setRunData} localRuns={localRuns} setLocalRuns={setLocalRuns} userRuns={userRuns} setUserRuns={setUserRuns} />} />
            <Route path='/runs' element={<MyRunsPage user={user} runData={runData} setRunData={setRunData} userRuns={userRuns} setUserRuns={setUserRuns} />} />
            <Route path='/locations/new' element={<CreateRunPage user={user} todayStr={todayStr} />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
