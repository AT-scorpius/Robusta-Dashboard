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

export default function UpdatePost() {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm();
  const [Ckdata, setCkdata] = useState();
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
    const endpoint = `posts/${id.id}`;
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
    if (Ckdata) {
      formData.append('content', Ckdata);
      console.log(formData.get('content'));
    }
    // eslint-disable-next-line camelcase
    if (data.title === '' || data.title === oldData.title) {
      console.log('title is incorrect');
    } else {
      formData.append('title', data.title);
    }
    if (data.short_title === '' || data.short_title === oldData.short_title) {
      console.log('short_title is incorrect');
    } else {
      formData.append('short_title', data.short_title);
    }
    if (data.summary) {
      formData.append('summary', data.summary);
    }
    if (data.text_for_button) {
      formData.append('text_for_button', data.text_for_button);
    }
    if (data.id_category) {
      formData.append('id_category', data.id_category);
    }
    if (data.time_event) {
      formData.append('time_event', data.time_event);
    }

    let message = {
      mes: 'Error: Editing Post failed! (Maybe the data in put incorrect)',
      status: 'danger'
    };
    const image = data.image_cover[0];
    await uploadImage(image).then((res) => {
      if (res) {
        setNewImg(res);
        formData.append('image_cover', res);
      }
    }).catch(() => {
      console.log('no image update');
    });
    const endpoint = `posts/${id.id}`;
    APIput(endpoint, formData).then((res) => {
      if (res === false) {
        notify(message.mes, message.status);
        notice('Error', 'Editing post failed. Maybe the data in put incorrect!');
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
        setTimeout(history.push('/admin/table/post'), 3000);
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
                  Update Post
                  {id && ` ID: ${id.id}`}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <form method="POST" onSubmit={handleSubmit(submitPost)}>
                  <div className="form-group">
                    <label>Title (unique)</label>
                    <input
                      type="title"
                      className="form-control"
                      placeholder="Enter Title"
                      defaultValue={oldData ? oldData.title : ''}
                      {...register('title')}
                    />
                  </div>
                  <div className="row">
                    <div className="col lg-4">
                      <div className="form-group">
                        <label>Summary</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={oldData ? oldData.summary : ''}
                          placeholder="Enter summary"
                          {...register('summary')}
                        />
                      </div>
                    </div>
                    <div className="col lg-4">
                      <div className="form-group">
                        <label>Short Title (unique)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter short title"
                          defaultValue={oldData ? oldData.short_title : ''}
                          {...register('short_title')}
                        />
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
                          defaultValue={oldData ? oldData.text_for_button : ''}
                          {...register('text_for_button')}
                        />
                      </div>
                    </div>

                    <div className="col lg-8">
                      <div className="form-group">
                        <label>Image Cover</label>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Enter short title"
                          {...register('image_cover')}
                        />
                      </div>
                      <div className="row">
                        <div className="form-group">
                          <FormLabel>Old image of the post</FormLabel>
                          <br />
                          <Image width={150} src={oldData && oldData.image_cover} alt="old image" thumbnail />
                        </div>
                        <div className="space"> &emsp; &emsp;</div>
                        <div className="form-group">
                          <FormLabel>New image of the post</FormLabel>
                          <br />
                          <Image width={150} src={newImg || 'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg'} alt="new image" thumbnail />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col lg-4">
                      <div className="form-group ">
                        <select id="id_category" defaultValue={oldData && oldData.id_category} className="form-control" {...register('id_category')}>
                          <option value="1">News</option>
                          <option value="2">Intro</option>
                        </select>
                      </div>
                    </div>
                    <div className="col lg-6">
                      <div className="form-group">
                        <input className="form-control" type="date" {...register('time_event')} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Content</label>
                    <br />
                    {
                    oldData && (
                    <CKEditor
                      initData={oldData.content}
                      onChange={(e) => getDataCK(e)}
                    />
                    )
                    }
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
