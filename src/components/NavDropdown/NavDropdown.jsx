import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import './NavDropdown.css';

export default function NavDropdown({ handleLogOut }) {
  const [showMenu, setShowMenu] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(true);

  function toggleMenu() {
    setShowMenu(!showMenu);
    setToggleBtn(!toggleBtn);
    document.querySelector('.nav-dropdown').classList.toggle('hidden');
  }

  const menuBtn = toggleBtn ? 
    <FontAwesomeIcon icon={faBars} size='xl' onClick={toggleMenu} className='ham-btn' /> 
    : 
    <FontAwesomeIcon icon={faXmark} size='xl' onClick={toggleMenu} className='x-btn' />;

  return (
    <>
      {menuBtn}
      <nav className='nav-dropdown hidden'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/runs'>My Runs</Link></li>
          <li><Link to='/locations/new'>Create a Run</Link></li>
          <li><Link to='' onClick={handleLogOut}>Log Out</Link></li>
        </ul>
      </nav>
    </>
  );
}