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
import { getBanner, callAPI } from 'API/callAPI';

export default function ListPost() {
  const [listPost, setList] = useState();
  const [componentStatus, setStatus] = useState(0);

  useEffect(() => {
    callAPI('posts').then((data) => {
      setList(data);
    }).catch(() => {
      alert('Error: Lost Connect');
    });
  }, []);

  useEffect(() => {
    callAPI('posts').then((data) => {
      setList(data);
    });
  }, [componentStatus]);

  const del = (id) => {
    const endpoint = `posts/${id}`;
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
      console.log(list);
      return list.map((prop, key) => (
        <tr key={key}>
          <td>
            {key + 1}
          </td>
          <td>
            {prop.title}
          </td>
          <td>
            {prop.short_title}
          </td>
          <td>
            {prop.summary}
          </td>
          <td><img width="100" src={prop.image_cover} alt="image of post" /></td>
          <td>
            {prop.content}
          </td>
          <td>
            {prop.time_event }
          </td>
          <td>
            <div className="row">
              <b><i className="nc-icon nc-tag-content" /></b>
              <NavLink
                to={`/admin/table/post/${prop.id}/edit`}
                className="nav-link"
                activeClassName="active"
              >
                {' '}
                Edit
              </NavLink>
            </div>
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
        <td colSpan="4" className="text-warning"> No data in table</td>
      </tr>
    );
  };

  return (
    <div>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">
            Post Table
          </Card.Title>
          <small>
            <NavLink to="/admin">... admin </NavLink>
            /
            <NavLink to="/admin/table"> list table </NavLink>
            / post
          </small>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <br />
          <br />
          <Table className="table-hover">
            <thead>
              <tr>
                <th className="border-0">Number List</th>
                <th className="border-0">Title</th>
                <th className="border-0">List Title</th>
                <th className="border-0">Sumary</th>
                <th className="border-0">Image Cover</th>
                <th className="border-0">Content of post</th>
                <th className="border-0">Time Event</th>
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
