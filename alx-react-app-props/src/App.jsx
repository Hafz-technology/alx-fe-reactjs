


import './App.css'
import WelcomeMessage from './components/WelcomeMessage.jsx'
import Header from './components/Header.jsx'
import MainContent from './components/MainContent.jsx'
import Footer from './components/Footer.jsx'
import UserProfile from './components/UserProfile.jsx'
import { Counter } from './components/Counter.jsx'

import ProfilePage from './components/ProfilePage.jsx';
import { UserContext } from './components/UserContext';

function App() {
      const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    
    <>
      <div>
        <Header />
        <MainContent />
       <Counter />
        <WelcomeMessage /> 
       
        <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
          <Footer />
      <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
      </div>
     
     
    </>
  )
}

export default App
