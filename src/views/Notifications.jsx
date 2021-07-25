/* eslint-disable no-nested-ternary */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import {
  Card,
  Container,
  Table,
  Spinner
} from 'react-bootstrap';
import { callAPI, APIput } from 'API/callAPI';

function Notifications() {
  const [listNotice, setNotice] = useState();
  const [componentStatus, setStatus] = useState(0);

  const del = (id) => {
    const status = callAPI(`notifications/${id}`, 'DELETE');
    if (status) {
      alert(`Successfully deleted notice with id: ${id}`);
    } else {
      alert('Delete failed');
    }
    setStatus(componentStatus + 1);
  };
  const readed = (id) => {
    const endpoint = `notifications/${id}`;
    const status = { read: 1 };
    APIput(endpoint, status).then((res) => {
      if (res) {
        setStatus(componentStatus + 1);
      }
    });
  };
  const showNotice = (list) => {
    if (list.length > 0) {
      return list.map((prop, key) => (
        <tr key={key}>
          <td>
            {key + 1}
          </td>
          <td>
            { prop.title === 'Success'
              ? <div className="text-success">{prop.title}</div>
              : (prop.title === 'Error'
                ? <div className="text-danger">{prop.title}</div>
                : <div className="text-primary">{prop.title}</div>)}
          </td>
          <td>
            { prop.title === 'Success'
              ? <div className="text-success">{prop.message}</div>
              : (prop.title === 'Error'
                ? <div className="text-danger">{prop.message}</div>
                : <div className="text-primary">{prop.message}</div>)}
          </td>
          <td>
            {
              prop.read === '0'
                ? (
                  <NavLink
                    onClick={() => readed(prop.id)}
                    to="#"
                    className="nav-link text-warning"
                    activeClassName="active"
                  >
                    <i className="nc-icon nc-tap-01" />
                    {' '}
                    Mark as readed?
                  </NavLink>
                ) : (
                  <div className="text-success">
                    &emsp;
                    <i className="nc-icon nc-check-2" />
                    {' '}
                    Readed
                    {' '}
                  </div>
                )
              }
          </td>
          <td>
            <NavLink
              onClick={() => del(prop.id)}
              to="#"
              className="nav-link text-danger"
              activeClassName="active"
            >
              <i className="nc-icon nc-simple-remove" />
              {' '}
              Delete
            </NavLink>
          </td>
        </tr>
      ));
    // eslint-disable-next-line no-else-return
    } else {
      return (
        <tr>
          <td className="text-warning">No announcements</td>
        </tr>
      );
    }
  };

  useEffect(() => {
    callAPI('notifications').then((data) => {
      if (data.length > 0) {
        const arr = data.reverse();
        setNotice(arr);
      }
    });
  }, []);
  useEffect(() => {
    callAPI('notifications').then((data) => {
      if (data.length > 0) {
        const arr = data.reverse();
        setNotice(arr);
      }
    });
  }, [componentStatus]);

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Notifications</Card.Title>
            <small>
              <NavLink to="/admin">... admin </NavLink>
              / notifications
            </small>
          </Card.Header>
          <Card.Body>
            <Table className="table-hover">
              <thead>
                <tr>
                  <th className="border-0">Number of row</th>
                  <th className="border-0">Title</th>
                  <th className="border-0">Content Notication</th>
                  <th className="border-0">Status</th>
                  <th className="border-0">Action</th>
                </tr>
              </thead>
              <tbody>
                {listNotice ? showNotice(listNotice) : (
                  <tr key={1}>
                    <td>
                      No announcements...
                      &emsp;
                      <Spinner animation="border" variant="warning" size="sm" />
                    </td>
                  </tr>

                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Notifications;
