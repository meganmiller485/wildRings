import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Custom-Hooks';

const NavBar = () => {
  const { user } = useAuth();
  console.log('this is user', user);
  return (
    <div>
      <nav className='navbar'>
        <div className='logo-Nav'>Wild Rings</div>
        <ul className='navbar-elements'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About</NavLink>
          </li>
          <li>
            <NavLink to='/regions'>Regions</NavLink>
          </li>
          <li>
            <NavLink to='/prints'>Prints</NavLink>
          </li>
          <li>
            <NavLink to='/getinvolved'>Get Involved</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>Contact</NavLink>
          </li>
          <li>
            {user.id ? (
              <span>Logout</span>
            ) : (
              <NavLink to='/member'>Login/Register</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
