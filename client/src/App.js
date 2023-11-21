import { DarkModeProvider } from 'context/DarkModeContext';
import { AuthContextProvider } from 'context/AuthContext';
import './App.css';
import Navbar from 'pages/navbar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <AuthContextProvider>
      <DarkModeProvider>
        <Navbar />
        <Outlet />
      </DarkModeProvider>
    </AuthContextProvider>
  );
}

export default App;
