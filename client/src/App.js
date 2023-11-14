import { DarkModeProvider } from 'context/DarkModeContext';
import './App.css';
import Navbar from 'pages/navbar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <DarkModeProvider>
      <Navbar />
      <Outlet />
    </DarkModeProvider>
  );
}

export default App;
