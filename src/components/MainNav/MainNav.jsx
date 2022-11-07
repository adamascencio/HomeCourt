import { Link } from 'react-router-dom';
import './MainNav.css';

export default function MainNav({ handleLogOut }) {
  return (
    <nav className='navbar fixed-top bg-primary'>
      <Link to='/'><span>Home</span></Link>
      <Link to='/runs'>My Runs</Link>
      <Link to='/locations/new'>Create a Run</Link>
      <Link className='flex-item' to='' onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}