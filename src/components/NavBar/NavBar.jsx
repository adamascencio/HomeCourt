import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='navbar fixed-top bg-primary'>
      <Link to='/'><span>Home</span></Link>
      <Link to='/runs'>My Runs</Link>
      <Link to='/locations/new'>Create a Run</Link>
      <Link className='flex-item' to='' onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}