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
  Card, Form, Modal, Row, Spinner, Table
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { callAPI } from 'API/callAPI';
import axios from 'axios';
import { APIpost } from 'API/callAPI';
import { notice } from 'API/callAPI';

export default function Feedback() {
  const [listPost, setList] = useState();
  const [componentStatus, setStatus] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [Ckdata, setCkdata] = useState('No data is entered!');
  const getDataCK = (e) => {
    setCkdata(e.target.value);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setLoad(false);
    setStatus(componentStatus + 1);
  };
  useEffect(() => {
    callAPI('feedback').then((data) => {
      setList(data);
    }).catch(() => {
      alert('Error: Lost Connect');
    });
  }, []);

  useEffect(() => {
    callAPI('feedback').then((data) => {
      setList(data);
    });
  }, [componentStatus]);

  const del = (id) => {
    const endpoint = `feedback/${id}`;
    const status = callAPI(endpoint, 'DELETE');
    if (status) {
      alert(`Successfully deleted banner with id: ${id}`);
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
            {prop.name}
          </td>
          <td><img width="100" src={prop.image} alt="image of post" /></td>
          <td>
            {prop.quote}
          </td>
          <td>
            {prop.info}
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
      <tr>
        <td colSpan="10" className="text-warning"> No data in table</td>
      </tr>
    );
  };
  // Upload Image
  const uploadImage = async (img) => {
    const body = new FormData();
    body.append('key', '22db36e00bee3ef919df52f806224a17');
    body.append('image', img);
    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
      headers: {
        'content-type': 'multipart/form-data',
      }
    }).then((res) => res.data.data.display_url).catch(() => false);
  };

  // Submit in modal
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const formData = new URLSearchParams();
    const string = Ckdata;
    formData.append('text', string);
    const img = document.getElementById('image_cover').files[0];
    const name = document.getElementById('name').value;
    const infor = document.getElementById('infor').value;
    formData.append('name', name);
    formData.append('infor', infor);
    let image = '';
    await uploadImage(img).then((res) => {
      if (res) {
        image = res;
        formData.append('image', image);
      }
    });
    await APIpost('feedback', formData);
    setStatus(componentStatus + 1);
    await notice('Success ', 'Create a feedback successfully');
    setLoad(false);
    handleClose();
  };

  return (
    <div>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">
            Feedback Table
          </Card.Title>
          <small>
            <NavLink to="/admin">... admin </NavLink>
            /
            <NavLink to="/admin/table"> list table </NavLink>
            / feedback
          </small>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <br />
          <div>
             &emsp;&emsp;
            <Button variant="outline-danger" onClick={handleShow}>
              <i className="nc-icon nc-simple-add" />
              &ensp;
              New Feedback
            </Button>
          </div>
          <Modal show={showModal} onHide={handleClose}>
            <Form onSubmit={onFormSubmit} encType="multipart/form-data">
              <Modal.Header closeButton>
                <Modal.Title>Create New Feedback</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <input className="form-control" type="text" id="name" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Infor</Form.Label>
                    <input className="form-control" type="text" id="infor" required />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Quote</Form.Label>
                  <textarea className="form-control" rows="4" cols="50" onChange={(e) => getDataCK(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Choose the image cover</Form.Label>
                  <input className="form-control" name="image_cover" id="image_cover" type="file" />
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
                      Save Changes
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
                <th className="border-0">Name</th>
                <th className="border-0">Image</th>
                <th className="border-0">Quote</th>
                <th className="border-0">Info</th>
                <th className="border-0" colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {listPost ? show(listPost) : (
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
