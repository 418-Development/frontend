import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo418-light.png';
import { NavigationItem } from '../enums/navigation';
import Button from './Button'; // Adjust the import path as necessary

interface Props {
    activeNavigationItem: NavigationItem;
}

function Navigation({ activeNavigationItem }: Props) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const toggleNav = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid justify-content-between">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-3" />
                    <Button onClick={() => navigate("/")} style="link" className="navbar-brand">418 Development</Button>
                    <Button onClick={toggleNav} className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                </div>

                <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Button
                                onClick={() => navigate("/")}
                                className={`nav-link ${activeNavigationItem === NavigationItem.HOME ? "active" : ""}`}
                                style="link"
                            >
                                Home
                            </Button>
                        </li>
                        <li className="nav-item">
                            <Button
                                onClick={() => navigate("/users")}
                                className={`nav-link ${activeNavigationItem === NavigationItem.USERS ? "active" : ""}`}
                                style="link"
                            >
                                Users
                            </Button>
                        </li>
                    </ul>

                    {!isAuthenticated ? (
                        <div id="login-box" className="d-flex flex-column flex-lg-row align-items-center" style={{ gap: '0.5rem' }}>
                            <input className="form-control form-control-sm mb-2 mb-lg-0 me-lg-2" type="email" id="email" autoComplete="username" placeholder="Email" aria-label="Email" style={{ height: '40px' }} />
                            <input className="form-control form-control-sm mb-2 mb-lg-0 me-lg-2" type="password" id="password" autoComplete="current-password" placeholder="Password" aria-label="Password" style={{ height: '40px' }} />
                            <div className="d-flex">
                                <Button onClick={() => setIsAuthenticated(true)} style="success" outline={true} className="me-2 text-nowrap" type="submit">Login</Button>
                                <Button onClick={() => { }} style="success" outline={true} className="text-nowrap" type="submit">Sign Up</Button>
                            </div>
                        </div>
                    ) : (
                        <Button onClick={() => setIsAuthenticated(false)} style="primary" outline={true} >Sign out</Button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
