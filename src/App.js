import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';

// This acts as your screen navigator
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {!isLoggedIn ? (
        <div onClick={() => setIsLoggedIn(true)}>
          <LoginScreen />
        </div>
      ) : (
        <HomeScreen />
      )}
    </div>
  );
};

export default App;
