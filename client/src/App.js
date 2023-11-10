import './App.css';
import Navbar from 'pages/navbar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
