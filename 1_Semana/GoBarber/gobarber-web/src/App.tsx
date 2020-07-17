import React from 'react';
import './App.css';
import GlobalStyle from './styles/global';
import SignIn from './pages/Sigin/index';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <>
      <SignIn />
      <GlobalStyle />
    </>
  );
};

export default App;
