import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideNavBar.css';
import { FaHome, FaAddressBook, FaUserCircle, FaBusinessTime, FaBuilding, FaMobileAlt, FaScroll, FaPeopleArrows, FaServicestack, FaSitemap, FaGlobe, FaFileAlt, FaCogs } from 'react-icons/fa';

function SideNavBar() {
    return (
        <div className="side-nav-bar">
            <ul className="nav-links">
                <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}><FaHome/> Home</NavLink></li>
                {/* <li className="nav-header">COSS</li> */}
                <li><NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}><FaAddressBook/> Contact</NavLink>
                </li>
                <li><NavLink to="/account" className={({isActive}) => isActive ? "active" : ""}><FaUserCircle/> Account</NavLink>
                </li>
                <li><NavLink to="/meeting"
                             className={({isActive}) => isActive ? "active" : ""}><FaBusinessTime/> Meeting</NavLink>
                </li>
                {/* <li className="nav-header">Onwards</li> */}
                <li><NavLink to="/company"
                             className={({isActive}) => isActive ? "active" : ""}><FaBuilding/> Company</NavLink></li>
                <li><NavLink to="/site" className={({isActive}) => isActive ? "active" : ""}><FaSitemap/> Site</NavLink>
                </li>
                <li><NavLink to="/device"
                             className={({isActive}) => isActive ? "active" : ""}><FaMobileAlt/> Device</NavLink></li>
                <li><NavLink to="/entitlement"
                             className={({isActive}) => isActive ? "active" : ""}><FaScroll/> Entitlement</NavLink></li>
                <li><NavLink to="/people" className={({isActive}) => isActive ? "active" : ""}><FaPeopleArrows/> People</NavLink>
                </li>
                {/*
                <li><NavLink to="/service"
                             className={({isActive}) => isActive ? "active" : ""}><FaServicestack/> Service</NavLink>
                </li>
                <li><NavLink to="/virtualevent" className={({isActive}) => isActive ? "active" : ""}><FaGlobe/> Virtual
                    Event</NavLink></li>
                */}
                <li><NavLink to="/reports"
                             className={({isActive}) => isActive ? "active" : ""}><FaFileAlt/> Reports</NavLink></li>
                <li><NavLink to="/system"
                             className={({isActive}) => isActive ? "active" : ""}><FaCogs/> System</NavLink></li>
                {/* Add other links similarly */}
            </ul>
        </div>
    );
}

export default SideNavBar;