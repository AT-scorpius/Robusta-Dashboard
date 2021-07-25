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
import { notice } from 'API/callAPI';
import { callAPI } from 'API/callAPI';
import { APIpost } from 'API/callAPI';

export default function Donors() {
  const [listDonor, setList] = useState();
  const [donor, setIdDonor] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [componentStatus, setStatus] = useState(0);
  const [newAmount, setAmount] = useState();

  const getDataCK = (e) => {
    setAmount(e.target.value);
  };

  const handleShow = (id) => {
    setIdDonor(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setLoad(false);
    setStatus(componentStatus + 1);
  };

  useEffect(() => {
    callAPI('donors').then((data) => {
      setList(data);
    });
  }, []);

  useEffect(() => {
    callAPI('donors').then((data) => {
      setList(data);
    });
  }, [componentStatus]);

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
          <td>
            {prop.code}
          </td>
          <td>
            {prop.email}
          </td>
          <td>
            {prop.phone }
          </td>
          <td>
            {prop.message }
          </td>
          <td>
            {prop.selectedOption }
          </td>
          <td>
            {new Intl.NumberFormat().format(prop.total) }
            {' '}
            VNĐ
          </td>
          <td>
            <div className="row">
              <b><i className="nc-icon nc-tag-content" /></b>
              <NavLink
                to="#"
                onClick={() => { handleShow(prop); }}
                className="nav-link text-success"
                activeClassName="active"
              >
                {' '}
                Update Transaction
              </NavLink>
            </div>
          </td>
          <td>
            <div className="row">
              <b><i className="nc-icon nc-tag-content" /></b>
              <NavLink
                to={`/admin/table/transaction/${prop.id}`}
                className="nav-link"
                activeClassName="active"
              >
                {' '}
                Detail
              </NavLink>
            </div>
          </td>
        </tr>
      ));
    }
    return (
      <tr key={1}>
        <td colSpan="9" className="text-warning"> No data in table</td>
      </tr>
    );
  };

  // Submit in modal
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const formData = {
      id_donor: donor.id,
      amount: newAmount
    };
    await APIpost('transactions', formData);
    setStatus(componentStatus + 1);
    await notice('Success ', `Transaction update with sponsor: ${donor.name} [+ ${new Intl.NumberFormat().format(newAmount)} VNĐ]`);
    setLoad(false);
    handleClose();
  };
  return (
    <div>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4" className="text-danger">
            List of sponsors
          </Card.Title>
          <small>
            <NavLink to="/admin">... admin </NavLink>
            /
            <NavLink to="/admin/table"> list table </NavLink>
            / donors
          </small>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">

          <Modal show={showModal} onHide={handleClose}>
            <Form onSubmit={onFormSubmit} encType="multipart/form-data">
              <Modal.Header closeButton>
                <Modal.Title>
                  Update Transaction With Donor Code:
                  {donor && donor.code}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <input type="number" className="form-control" onChange={(e) => getDataCK(e)} />
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
          <Table className="table-hover">
            <thead>
              <tr>
                <th className="border-0">Number List</th>
                <th className="border-0">Name</th>
                <th className="border-0">Code of donor</th>
                <th className="border-0">Email</th>
                <th className="border-0">Phone</th>
                <th className="border-0">Message</th>
                <th className="border-0">Option Transaction</th>
                <th className="border-0">Total amount supported</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {listDonor ? show(listDonor) : (
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
