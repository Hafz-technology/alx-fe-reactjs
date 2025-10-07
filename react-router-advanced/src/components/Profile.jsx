import { Outlet, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  return (
    <div>
      <h2>Profile Page (Parent Route)</h2>
      <nav>
        {/* Navigating to child routes. Relative paths are preferred. */}
        <Link to="details">Details</Link> |{' '}
        <Link to="settings">Settings</Link>
      </nav>
      <hr />
      {/* Outlet is necessary for nested routes to render child components */}
      <Outlet /> 
    </div>
  );
};

export default Profile;


