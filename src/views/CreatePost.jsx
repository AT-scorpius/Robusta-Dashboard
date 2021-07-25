/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NotificationAlert from 'react-notification-alert';
import {
  Button,
  Card,
  Col,
  Container, Row, Spinner
} from 'react-bootstrap';
import { APIpost, notice } from 'API/callAPI';
import axios from 'axios';
import { CKEditor } from 'ckeditor4-react';
import { useHistory } from 'react-router-dom';

export default function CreatePost() {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm();
  const [Ckdata, setCkdata] = useState('No data is entered!');
  const [isLoad, setLoad] = useState(false);
  const history = useHistory();
  // Hiện thông báo
  const notificationAlertRef = React.useRef(null);
  const notify = (mes, type) => {
    let options = {};
    const place = 'tr';
    options = {
      place,
      message: (
        <div>
          <div>
            <b>This page says: </b>
            {` ${mes}`}
          </div>
        </div>
      ),
      type,
      icon: 'nc-icon nc-tag-content',
      autoDismiss: 5,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  // Lấy content text
  const getDataCK = (e) => {
    setCkdata(e.editor.getData());
  };

  // up ảnh
  const uploadImage = (img) => {
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
  const submitPost = async (data) => {
    setLoad(true);
    const formData = new URLSearchParams();
    formData.append('title', data.title);
    formData.append('short_title', data.short_title);
    formData.append('summary', data.summary);
    if (Ckdata) {
      formData.append('content', Ckdata);
    } else {
      formData.append('content', 'No data');
    }
    formData.append('text_for_button', data.text_for_button);
    formData.append('id_category', data.id_category);
    if (data.time_event) {
      formData.append('time_event', data.time_event);
    }
    let message = {
      mes: 'Error: Posting failed. Maybe the data input incorrect!',
      status: 'danger'
    };
    let image = data.image_cover[0];
    await uploadImage(image).then((res) => {
      image = res;
    });
    formData.append('image_cover', image);
    await APIpost('posts', formData).then((res) => {
      if (res === false) {
        notify(message.mes, message.status);
        notice('Error', 'Posting failed. Maybe the data input incorrect!!');
        setLoad(false);
      } else {
        message = {
          mes: 'Post successfully',
          status: 'success'
        };
        notice('Success ', `Post with titled: [ ${data.title} ] created successfully`);
        notify(message.mes, message.status);
        setLoad(false);
        setTimeout(history.push('/admin/table/post'), 6000);
      }
    });
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>

        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Create Post</Card.Title>
              </Card.Header>
              <Card.Body>
                <form method="POST" onSubmit={handleSubmit(submitPost)}>
                  <div className="form-group">
                    <label>Title (Unique)</label>
                    <input
                      type="title"
                      className="form-control"
                      placeholder="Enter Title"
                      {...register('title', { required: true })}
                    />
                    {errors.title && (
                      <strong>
                        <span className="text-danger">This field is required</span>
                      </strong>
                    )}
                  </div>
                  <div className="row">
                    <div className="col lg-4">
                      <div className="form-group">
                        <label>Summary</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter summary"
                          {...register('summary', { required: true })}
                        />
                        {errors.title && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>
                    <div className="col lg-4">
                      <div className="form-group">
                        <label>Short Title (Unique)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter short title"
                          {...register('short_title', { required: true })}
                        />
                        {errors.short_title && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col lg-4">
                      <div className="form-group">
                        <label>Text on button</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register('text_for_button', { required: true })}
                        />
                        {errors.text_for_button && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>

                    <div className="col lg-8">
                      <div className="form-group">
                        <label>Image Cover</label>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Enter short title"
                          {...register('image_cover', { required: true })}
                        />
                        {errors.image_cover && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col lg-4">
                      <div className="form-group ">
                        <select id="id_category" className="form-control" {...register('id_category', { required: true })}>
                          <option value="1">News</option>
                          <option value="2">Intro</option>
                        </select>
                        {errors.id_category && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>
                    <div className="col lg-6">
                      <div className="form-group">
                        <input className="form-control" type="date" {...register('time_event')} />
                        {errors.time_event && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Content</label>
                    <br />
                    <CKEditor initData={<p>Write something...</p>} onChange={(e) => getDataCK(e)} />
                  </div>
                  <div>
                    {isLoad ? (
                      <button type="button" className="btn btn-login btn-right">
                        Loading...
                        &emsp;
                        <Spinner animation="border" variant="warning" size="sm" />
                      </button>
                    )
                      : (<button type="submit" className="btn btn-login btn-right"> Post </button>)}
                  </div>
                  <br />
                </form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require('assets/img/photo-1431578500526-4d9613015464.jpeg')
                      .default
                  }
                />
              </div>
              <Card.Body>
                <div className="author">
                  <a href="https://www.facebook.com/passerelles.numeriques">
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require('assets/img/faces/pn-logo.png').default}
                    />
                    <h5 className="title">Passerelles numériques</h5>
                  </a>
                  <p className="description">A Gateway for Life</p>
                  <p>Passerelles numériques is a French NGO created in 2005 and operating in Cambodia, the Philippines and Vietnam</p>
                </div>
              </Card.Body>
              <hr />
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square" />
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square" />
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
