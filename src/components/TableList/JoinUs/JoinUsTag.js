/* eslint-disable no-const-assign */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useLocation } from 'react';
import {
  Button,
  Card, Form, Modal, Spinner, Table
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { notice } from 'API/callAPI';
import { callAPI } from 'API/callAPI';
import { APIpost } from 'API/callAPI';

export default function JoinUsTag() {
  const [listBanner, setList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [componentStatus, setStatus] = useState(0);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setLoad(false);
    setStatus(componentStatus + 1);
  };

  useEffect(() => {
    callAPI('join_us_tags').then((data) => {
      setList(data);
    });
  }, []);

  useEffect(() => {
    callAPI('join_us_tags').then((data) => {
      setList(data);
    });
  }, [componentStatus]);

  const del = (id) => {
    const status = callAPI(`join_us_tags/${id}`, 'DELETE');
    if (status) {
      alert(`Successfully deleted join us tag with id: ${id}`);
    } else {
      alert('Delete failed');
    }
    setStatus(componentStatus + 1);
  };
  const show = (list) => {
    if (list.length) {
      return list.map((prop, key) => (
        <tr key={key}>
          <td>
            {key + 1}
          </td>
          <td>
            {prop.tag}
          </td>
          <td>
            <NavLink
              to="#"
              onClick={() => del(prop.id)}
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
    }
    return (
      <tr key={1}>
        <td colSpan="10" className="text-warning"> No data in table</td>
      </tr>
    );
  };

  // Submit in modal
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const text = document.getElementById('tag').value;
    const formData = {
      tag: text
    };
    await APIpost('join_us_tags', formData);
    setStatus(componentStatus + 1);
    await notice('Success ', 'Create a Tag Name successfully');
    setLoad(false);
    handleClose();
  };
  return (
    <div>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">
            Banner Table
          </Card.Title>
          <small>
            <NavLink to="/admin">... admin </NavLink>
            /
            <NavLink to="/admin/table"> list table </NavLink>
            / banner
          </small>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <br />
          <div>
        &emsp;&emsp;
            <Button variant="outline-danger" onClick={handleShow}>
              <i className="nc-icon nc-simple-add" />
              &ensp;
              New Join Us Tag
            </Button>
          </div>

          <Modal show={showModal} onHide={handleClose}>
            <Form onSubmit={onFormSubmit} encType="multipart/form-data">
              <Modal.Header closeButton>
                <Modal.Title>Create New Tag Name</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>New Tag Name</Form.Label>
                  <input className="form-control" id="tag" type="text" required />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {isLoad ? (
                  <Button variant="primary">
                    Loading...
                    &ensp;
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                )
                  : (
                    <Button variant="primary" type="submit">
                      Create
                    </Button>
                  ) }

              </Modal.Footer>
            </Form>
          </Modal>
          <br />
          <Table className="table-hover">
            <thead>
              <tr>
                <th className="border-0">Number List</th>
                <th className="border-0">Tag Name</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {listBanner ? show(listBanner) : (
                <tr>
                  <td>
                    Loading...
                    &emsp;
                    <Spinner animation="border" variant="warning" size="sm" />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
