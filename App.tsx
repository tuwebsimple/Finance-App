import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './screens/Login';
import Home from './screens/Home';
import Budget from './screens/Budget';
import Transactions from './screens/Transactions';
import AddTransaction from './screens/AddTransaction';

const Layout: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/add'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {shouldShowNavbar && <Navbar />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
};

export default App;