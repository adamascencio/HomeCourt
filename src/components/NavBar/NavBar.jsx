import { useState, useEffect } from 'react';
import * as userService from '../../utilities/users-service';
import MainNav from '../MainNav/MainNav';
import NavDropdown from '../NavDropdown/NavDropdown';

export default function NavBar({ setUser }) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    windowDimensions.width > 768 ? 
      <MainNav handleLogOut={handleLogOut} /> 
      : 
      <NavDropdown handleLogOut={handleLogOut} />
  );
}