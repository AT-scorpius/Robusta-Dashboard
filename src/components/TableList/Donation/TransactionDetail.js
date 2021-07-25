/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
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
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { callAPI } from 'API/callAPI';
import Donors from '../../../views/Donors';

export default function TransactionDetail() {
  const [listTrans, setList] = useState();
  const [listDonor, setListDonor] = useState();
  const [name, setName] = useState();
  const history = useHistory();
  const id = useParams();
  useEffect(() => {
    callAPI('transactions').then((data) => {
      if (data.length > 0) {
        const arr = [];
        data.map((val) => {
          if (val.id_donor == id.id) {
            arr.push(val);
          }
        });
        setList(arr);
      }
    }).catch(() => {
      alert('Error: Lost Connect');
    });
    callAPI(`donors/${id.id}`).then((data) => {
      if (data) {
        setName(data.name);
      }
    }).catch(() => {
      alert('Error: Lost Connect');
    });
  }, []);

  const show = (list) => {
    if (list.length) {
      return list.map((prop, key) => (
        <tr key={key}>
          <td>
            {key + 1}
          </td>
          <td>
            {new Intl.NumberFormat().format(prop.amount) }
            {' '}
            VNĐ
          </td>
          <td>
            {prop.created_at}
          </td>
        </tr>
      ));
    }
    return (
      <tr>
        <td colSpan="4" className="text-warning"> No data in table</td>
      </tr>
    );
  };

  return (
    <div>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">
            Transaction Detail of Donors:
            {' '}
            {name && name}
          </Card.Title>
          <small>
            <NavLink to="/admin">... admin </NavLink>
            /
            <NavLink to="/admin/table"> list table </NavLink>
            / transaction detail
          </small>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <br />
          <br />
          <Table className="table-hover">
            <thead>
              <tr>
                <th className="border-0">Number List</th>
                <th className="border-0">Amount</th>
                <th className="border-0">Transaction time</th>
              </tr>
            </thead>
            <tbody>
              {listTrans ? show(listTrans) : (
                <tr>
                  <td colSpan="5">
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
