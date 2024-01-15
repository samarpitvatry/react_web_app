// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import './styles/fonts.css';
import SideNavBar from './components/SideNavBar'; // Import the SideNavBar component
import { HomePage } from './pages/HomePage';
import { Account } from './pages/Account';
import { Company } from './pages/Company';
import AccountDetails from './pages/AccountDetails'; // Import AccountDetails component
import CompanyDetails from './pages/CompanyDetails'; // Import CompanyDetails component
import logo from './assets/BT_logo_modified.png';
import { FaBell,FaRegBell, FaUserTie,FaRegUser  } from 'react-icons/fa';


function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} alt="BT Logo" className="BT-logo-icon" />
                    <div className="header-icons">
                        <FaUserTie style={{ width: '30px', height: '30px'}} />
                        <FaRegBell />
                    </div>
                </header>
                <div className="content-area">
                    <SideNavBar />
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/account/details/:accountId" element={<AccountDetails />} />
                            <Route path="/company" element={<Company />} />
                            <Route path="/company/detail/:companyId" element={<CompanyDetails />} />
                            {/* Add more routes as needed */}
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;


