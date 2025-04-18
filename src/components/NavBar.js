import React from "react";
import { Navbar, Nav, NavDropdown, Button, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";
import iconCEDF from '../images/cedfIcon.png'
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';

const AppNavBar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () =>{
        dispatch(logout());
        navigate('/login');
    };

    const hasRole = (role) => user?.role === role;

    return (
        <Navbar  variant='dark' expand="lg" className='text-light vw-100' style={{backgroundImage: 'linear-gradient(45deg, black, #c90e11)', backgroundSize:'cover'}}>
          <Container fluid className='ms-4 me-4 w-100'>
            <Navbar.Brand href="#home"  style={{fontFamily:'cursive', fontSize:'10px'}}>
              <img
                src={iconCEDF}
                alt="Logo"
                style={{ height: '40px' }}
                className='me-2'
              />
              Civil Engineering Data Framework
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                
                <NavDropdown title="Monitoring" id="nav-dropdown-1" className='me-3' >
                  <NavDropdown.Item as={Link} to="/job-monitor" id="nav-dropdown-item">
                    Job Monitor
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/job-summary">
                    Job Summary
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/inbound-files">
                    Inbound Files
                  </NavDropdown.Item>
                </NavDropdown>
                {(hasRole('admin') || hasRole('developer')) && (
                <NavDropdown title="Development" id="nav-dropdown-2" className='me-3'>
                    <NavDropdown.Item as={Link} to="/menu2/page1">
                        Job Chain
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/jobDefinition">
                        Job Definition
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu2/page2">
                        CM Extract/Download
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu2/page2">
                        CM Extract/Download
                    </NavDropdown.Item>
                    </NavDropdown>
                )}
                {(hasRole('admin')) && (
                    <NavDropdown title="Administration" id="nav-dropdown-3" className='me-3'>
                    <NavDropdown.Item as={Link} to="/menu3/page2">
                        Data Location
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page1">
                        Event Values
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page2">
                        Legacy System
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page1">
                        Migration Event
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page2">
                        Migration Type
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page1">
                        Operating Envirnment
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page2">
                        Operating Parameter
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page1">
                        PCR
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page2">
                        Run Job
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page2">
                        Source Location
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page1">
                        User Administration
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menu3/page2">
                        Validation Results
                    </NavDropdown.Item>
                    </NavDropdown>
                )}
              </Nav>
              <Nav>
                <Nav.Item className="d-flex align-items-center me-3">
                  {user.username}
                </Nav.Item>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
};

export default AppNavBar;