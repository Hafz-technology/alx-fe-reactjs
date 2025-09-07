import { useContext } from 'react';
import { UserContext } from './UserContext';

function UserDetails() {
  // Use the useContext hook to consume the data from the UserContext.
  // This component now has direct access to the user data without
  // needing to pass it down through intermediate components.
  const userData = useContext(UserContext);

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;