/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NotificationAlert from 'react-notification-alert';
import {
  Button,
  Card,
  Col,
  Container, Row, Spinner
} from 'react-bootstrap';
import { APIpost, notice, callAPI } from 'API/callAPI';
import { CKEditor } from 'ckeditor4-react';

export default function CreateJoinUs() {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm();
  const [Ckdata, setCkdata] = useState('No data is entered!');
  const [tag, setTags] = useState();
  const [isLoad, setLoad] = useState(false);

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
  useEffect(() => {
    callAPI('join_us_tags').then((data) => {
      setTags(data);
    });
  }, []);
  const selectTag = (list) => {
    if (list.length) {
      return list.map((val, key) => (
        <option value={val.id} key={key}>{val.tag}</option>
      ));
    }
    return <option value="0">Not found tags</option>;
  };
  const submitPost = async (data) => {
    setLoad(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('organisation', data.organisation);
    formData.append('reporting_to', data.reporting_to);
    formData.append('location', data.location);
    if (Ckdata) {
      formData.append('jd', Ckdata);
    } else {
      formData.append('jd', 'No description');
    }
    formData.append('status', data.status);
    formData.append('project', data.project);
    formData.append('id_tag', data.id_tag);
    if (data.start_date) {
      formData.append('start_date', data.start_date);
    }

    let message = {
      mes: 'Error: Posting in Join Us failed. Maybe the API have problems!',
      status: 'danger'
    };
    await APIpost('join_us', formData).then((res) => {
      if (res === false) {
        notify(message.mes, message.status);
        notice('Error', 'Posting failed. Maybe the API have problems!');
        setLoad(false);
      } else {
        message = {
          mes: 'Post in Join Us successfully',
          status: 'success'
        };
        notice('Success ', 'Posting Join Us information created successfully');
        notify(message.mes, message.status);
        setLoad(false);
        setTimeout(window.location.reload(), 6000);
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
                <Card.Title as="h4">Join Us</Card.Title>
              </Card.Header>
              <Card.Body>
                <form method="POST" onSubmit={handleSubmit(submitPost)}>
                  <div className="row">
                    <div className="col lg-4">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
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
                    </div>
                    <div className="col lg-4">
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Title"
                          {...register('location', { required: true })}
                        />
                        {errors.location && (
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
                        <label>Organisation</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register('organisation', { required: true })}
                        />
                        {errors.organisation && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>
                    <div className="col lg-4">
                      <div className="form-group">
                        <label>Reporting to</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register('reporting_to', { required: true })}
                        />
                        {errors.reporting_to && (
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
                        <label>Status</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register('status', { required: true })}
                        />
                        {errors.status && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>
                    <div className="col lg-4">
                      <div className="form-group">
                        <label>Project</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register('project', { required: true })}
                        />
                        {errors.project && (
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
                        <label>Tags</label>
                        <select id="id_tag" className="form-control" {...register('id_tag', { required: true })}>
                          {tag && selectTag(tag)}
                        </select>
                        {errors.id_tag && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>
                    <div className="col lg-6">
                      <div className="form-group">
                        <label>Start Day</label>
                        <input className="form-control" type="date" {...register('start_date')} />
                        {errors.start_date && (
                        <strong>
                          <span className="text-danger">This field is required</span>
                        </strong>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Job Description</label>
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
