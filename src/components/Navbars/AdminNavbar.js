/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import {
  Navbar, Container, Nav, Dropdown, Button
} from 'react-bootstrap';
import { callAPI } from 'API/callAPI';

function Header() {
  const history = useHistory();
  const location = useLocation();

  const activeRoute = (routeName) => (location.pathname.indexOf(routeName) > -1 ? 'notifications' : 'admin/notifications');
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle('nav-open');
    const node = document.createElement('div');
    node.id = 'bodyClick';
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle('nav-open');
    };
    document.body.appendChild(node);
  };
  const [listNotice, setNotice] = useState();

  useEffect(() => {
    callAPI('notifications').then((data) => {
      let count = 0;
      if (data) {
        const arr = data;
        arr.map((value) => {
          if (value.read === '0') {
            count++;
          }
        });
      }
      setNotice(count);
    });
  }, []);

  const readed = () => {
    setNotice([]);
  };
  async function LogOut() {
    await localStorage.removeItem('__token__');
    await sessionStorage.removeItem('__token__');
    history.replace('/login');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v" />
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >
                <span className="d-lg-none ml-1">Dashboard</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className="nav-link"
                activeClassName="active"
                onClick={() => readed()}
                to={activeRoute('admin/')}
              >
                <i className="nc-icon nc-bell-55" />
                <span className="notification">{listNotice && listNotice}</span>
                <span className="d-lg ml-1">Notification</span>
              </NavLink>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                onClick={() => LogOut()}
              >
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
