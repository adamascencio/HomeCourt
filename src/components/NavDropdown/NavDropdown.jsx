import { Link } from 'react-router-dom';
import './NavDropdown.css';

export default function NavDropdown({ handleLogOut }) {
  return (
    <nav className='nav-dropdown fixed-top bg-primary'>
      <Link to='/'><span>Home</span></Link>
      <Link to='/runs'>My Runs</Link>
      <Link to='/locations/new'>Create a Run</Link>
      <Link to='' onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}