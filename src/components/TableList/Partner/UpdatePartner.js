/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import NotificationAlert from 'react-notification-alert';
import {
  Button,
  Card,
  Col,
  Container, FormLabel, Image, Row, Spinner
} from 'react-bootstrap';
import { APIput, notice, callAPI } from 'API/callAPI';
import axios from 'axios';
import { CKEditor } from 'ckeditor4-react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

export default function UpdatePartner() {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm();
  const [Ckdata, setCkdata] = useState('No data is entered!');
  const [isLoad, setLoad] = useState(false);
  const [oldData, setOldData] = useState();
  const [newImg, setNewImg] = useState();
  const id = useParams();
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
    // Call API
  useEffect(() => {
    const endpoint = `partners/${id.id}`;
    callAPI(endpoint).then((res) => {
      if (!res) {
        alert('Error: Lost connect!');
      } else {
        setOldData(res);
      }
    });
  }, []);

  // Lấy content text
  const getDataCK = (e) => {
    setCkdata(e.target.value);
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
    if (Ckdata) {
      formData.append('note_for_image', Ckdata);
    }

    let message = {
      mes: 'Error: Update Partner Failed!',
      status: 'danger'
    };
    const image = data.logo[0];
    const imagePNV = data.imgPNV[0];
    await uploadImage(image).then((res) => {
      if (res) {
        formData.append('logo', res);
      }
    }).catch(() => {
      console.log('no image update');
    });
    await uploadImage(imagePNV).then((res) => {
      if (res) {
        formData.append('image_with_pn', res);
      }
    }).catch(() => {
      console.log('no image update');
    });
    const endpoint = `partners/${oldData.id}`;
    APIput(endpoint, formData).then((res) => {
      if (res === false) {
        notify(message.mes, message.status);
        notice('Error', 'Update partner failed!');
        setLoad(false);
      } else {
        message = {
          mes: 'Post successfully',
          status: 'success'
        };
        notice('Success ', 'Editing Post successfully');
        notify(message.mes, message.status);
        alert('Editing Post successfully');
        setLoad(false);
        history.push('/admin/table/partner');
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
                <Card.Title as="h4">
                  Update Parner
                  {oldData && `: ${oldData.name}`}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <form method="POST" onSubmit={handleSubmit(submitPost)}>
                  <div className="row">
                    <div className="col lg-6">
                      <div className="form-group">
                        <label>Image PNV with Partner</label>
                        <br />
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Enter short title"
                          {...register('imgPNV')}
                        />
                      </div>
                    </div>
                    <div className="col lg-6">
                      <div className="form-group">
                        <label>Image Logo of Partner</label>
                        <br />
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Enter short title"
                          {...register('logo')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col lg-1">
                      <div className="space">&emsp;</div>
                    </div> */}
                    <div className="col lg-5">
                      <div className="form-group">
                        <label>Image PNV with Partner</label>
                        <br />
                        <img width="200" src={oldData && oldData.image_with_pn} alt="Logo of Parner" />
                      </div>
                    </div>
                    <div className="col lg-5">
                      <div className="form-group">
                        <label>Image Logo of Partner</label>
                        <br />
                        <img width="200" src={oldData && oldData.logo} alt="Logo of Parner" />
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col lg-4">
                      <div className="form-group ">
                        <FormLabel>Summary about partner</FormLabel>
                        <br />
                        <textarea className="form-control" rows="6" onChange={(e) => getDataCK(e)} defaultValue={oldData && oldData.note_for_image} />
                      </div>
                    </div>
                  </div>
                  <div>
                    {isLoad ? (
                      <button type="button" className="btn btn-login btn-right">
                        Loading...
                        &emsp;
                        <Spinner animation="border" variant="warning" size="sm" />
                      </button>
                    )
                      : (<button type="submit" className="btn btn-login btn-right"> Update </button>)}
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
                  src={require('assets/img/photo-1431578500526-4d9613015464.jpeg').default}
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
