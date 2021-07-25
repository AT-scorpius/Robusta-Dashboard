/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
import React from 'react';
import NotificationAlert from 'react-notification-alert';

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col
} from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { routeTable } from 'routes.js';

// Accordion,
function TableList() {
  const notificationAlertRef = React.useRef(null);
  const listTable = (routes) => routes.map((prop, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{prop.name}</td>
      <td>
        <NavLink
          to={prop.layout + prop.path}
          className="nav-link"
          activeClassName="active"
        >
          {' '}
          Manage This Table
        </NavLink>
      </td>

    </tr>
  ));
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List Of Table For Management</Card.Title>
                <small>
                  <NavLink to="/admin">... admin </NavLink>
                  /
                  <NavLink to="/admin/table"> list table </NavLink>
                </small>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">Number List</th>
                      <th className="border-0">Name Of Table</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    { listTable(routeTable) }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
