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

export default function Banner() {
  const [listBanner, setList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [componentStatus, setStatus] = useState(0);
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
    callAPI('banners').then((data) => {
      setList(data);
    });
  }, []);

  useEffect(() => {
    callAPI('banners').then((data) => {
      setList(data);
    });
  }, [componentStatus]);

  const del = (id) => {
    const status = callAPI(`banner/${id}`, 'DELETE');
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
            HTML:
            {prop.text}
          </td>
          <td><img width="100" src={prop.image} alt="image of banner" /></td>
          <td>
            <div className="row">
              <b><i className="nc-icon nc-tag-content" /></b>
              <NavLink
                to={`/admin/table/banner/${prop.id}/edit`}
                className="nav-link"
                activeClassName="active"
              >
                {' '}
                Edit
              </NavLink>
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
            </div>
          </td>
        </tr>
      ));
    }
    return (
      <tr key={1}>
        <td colSpan="4" className="text-warning"> No data in table</td>
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
    const img = document.getElementById('image_raw').files[0];
    let image = '';
    await uploadImage(img).then((res) => {
      if (res) {
        image = res;
        formData.append('image', image);
      }
    });
    await APIpost('banners', formData);
    setStatus(componentStatus + 1);
    await notice('Success ', 'Create a banner successfully');
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
              New Banner
            </Button>
          </div>

          <Modal show={showModal} onHide={handleClose}>
            <Form onSubmit={onFormSubmit} encType="multipart/form-data">
              <Modal.Header closeButton>
                <Modal.Title>Create New Banner</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Content in banner</Form.Label>
                  <textarea className="form-control" rows="4" cols="50" onChange={(e) => getDataCK(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Choose the image for banner</Form.Label>
                  <input className="form-control" name="image_raw" id="image_raw" type="file" />
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
                <th className="border-0">Content</th>
                <th className="border-0">Image</th>
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
