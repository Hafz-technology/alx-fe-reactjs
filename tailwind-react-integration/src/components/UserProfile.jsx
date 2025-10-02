import devsecureLogo from '../assets/devsecure_logo.png'

function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-8 max-w-sm mx-auto, my-20 rounded-lg shadow-lg sm:p-4 sm:max-w-xs md:p-8 md:max-w-sm hover:shadow-xl">
     <img className="rounded-full w-36 h-36 mx-auto sm:w-24 sm:h-24 md:w-36 md:h-36 hover:scale-110 transition-transform duration-300 ease-in-out" src={devsecureLogo} alt="Logo" />
      <h1 className="text-xl text-blue-800 my-4 sm:text-lg md:text-xl hover:text-blue-500">Dev Secure Company</h1>
      <p className="text-gray-600 text-base sm:text-sm md:text-base">Dev Secure Technology and Training</p>
    </div>
  );
}

export default UserProfile;



