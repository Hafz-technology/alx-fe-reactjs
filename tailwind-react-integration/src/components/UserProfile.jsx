import devsecureLogo from '../assets/devsecure_logo.png'

function UserProfile() {
  return (
    <div className="user-profile">
     <img src={devsecureLogo} alt="Logo" />
      <h1>Dev Secure Company</h1>
      <p>Dev Secure Technology and Training</p>
    </div>
  );
}

export default UserProfile;