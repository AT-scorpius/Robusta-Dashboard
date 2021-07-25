/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable import/no-unresolved */
import { APIpost, notice, callAPI } from 'API/callAPI';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, Modal, Row, Spinner, Table
} from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function NumberOverview() {
  const [listData, setList] = useState();
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
    callAPI('number_overviews').then((data) => {
      setList(data);
    });
  }, []);

  useEffect(() => {
    callAPI('number_overviews').then((data) => {
      setList(data);
    });
  }, [componentStatus]);
  const show = (list) => {
    if (list) {
      return (
        <tr>
          <td>
            {list.current_students}
          </td>
          <td>{list.alumni}</td>
          <td>{list.total_students}</td>
          <td>
            {list.percent_get_job}
            %
          </td>
          <td>
            {new Intl.NumberFormat().format(list.average_wage) }
            {' '}
            VNĐ
          </td>
          <td>
            {list.percent_alumni_it}
            %
          </td>
          <td>
            {list.alumni_allowance}
            %
          </td>
          <td>
            <NavLink
              to="#"
              onClick={() => handleShow()}
              className="nav-link"
              activeClassName="active"
            >
              {' '}
              Update
            </NavLink>
          </td>
        </tr>
      );
    }
  };
  useEffect(() => {
    callAPI('number_overviews').then((data) => {
      setList(data);
    });
  }, []);
  // Submit in modal
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const cur_stu = document.getElementById('cur_stu').value;
    const al = document.getElementById('alumni').value;
    const total = document.getElementById('total').value;
    const e_rate = document.getElementById('e_rate').value;
    const i_e_r = document.getElementById('i_e_r').value;
    const a_w = document.getElementById('a_w').value;
    const a_d_r = document.getElementById('a_d_r').value;
    const formData = {
      total_students: total,
      alumni: al,
      current_students: cur_stu,
      average_wage: a_w,
      percent_get_job: e_rate,
      percent_alumni_it: i_e_r,
      alumni_allowance: a_d_r,

    };
    await APIpost('number_overviews/1', formData);
    setStatus(componentStatus + 1);
    await notice('Success ', 'Update number overviews successful');
    setLoad(false);
    handleClose();
  };
  return (
    <div>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">
            Number Overview Table
          </Card.Title>
          <small>
            <NavLink to="/admin">... admin </NavLink>
            /
            <NavLink to="/admin/table"> list table </NavLink>
            / number overview
          </small>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <br />
          <Modal show={showModal} onHide={handleClose}>
            <Form onSubmit={onFormSubmit} encType="multipart/form-data">
              <Modal.Header closeButton>
                <Modal.Title>
                  Update Data Number Overview
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Student</Form.Label>
                      <input type="number" id="cur_stu" className="form-control" defaultValue={listData && listData.current_students} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Alumni</Form.Label>
                      <input type="number" id="alumni" className="form-control" defaultValue={listData && listData.alumni} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Total student</Form.Label>
                      <input type="number" id="total" className="form-control" defaultValue={listData && listData.total_students} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Employment rate (%)</Form.Label>
                      <input type="number" id="e_rate" className="form-control" defaultValue={listData && listData.percent_get_job} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>IT Employment rate (%)</Form.Label>
                      <input type="number" id="i_e_r" className="form-control" defaultValue={listData && listData.percent_alumni_it} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Alumni donation rate (%)</Form.Label>
                  <input type="number" id="a_d_r" className="form-control" defaultValue={listData && listData.alumni_allowance} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Average wage</Form.Label>
                  <input type="number" id="a_w" className="form-control" defaultValue={listData && listData.average_wage} />
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
                <th className="border-0">Number of current student</th>
                <th className="border-0">Alumni</th>
                <th className="border-0">Total Students</th>
                <th className="border-0">Employment rate</th>
                <th className="border-0">Average Wage</th>
                <th className="border-0">IT employment rate</th>
                <th className="border-0">Alumni's return donation rate</th>
                <th className="border-0">Update data</th>
              </tr>
            </thead>
            <tbody>
              {listData ? show(listData) : (
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
