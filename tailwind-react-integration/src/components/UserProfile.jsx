import devsecureLogo from '../assets/devsecure_logo.png'

function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-8 max-w-sm mx-auto, my-20 rounded-lg shadow-lg">
     <img src={devsecureLogo} alt="Logo" />
      <h1>Dev Secure Company</h1>
      <p>Dev Secure Technology and Training</p>
    </div>
  );
}

export default UserProfile;