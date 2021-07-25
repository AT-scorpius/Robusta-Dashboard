/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
// import { notice } from 'API/callAPI';
import { callAPI, notice, APIput } from 'API/callAPI';
import axios from 'axios';
import { CKEditor } from 'ckeditor4-react';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card, Col, FormLabel, Image, Row, Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Redirect, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

export default function UpdateBanner() {
  const [Ckdata, setCkdata] = useState('No data is entered!');
  const [data, setData] = useState();
  const [newImg, setImg] = useState();
  const [isLoad, setLoad] = useState(false);
  const history = useHistory();
  const id = useParams();

  const getDataCK = (e) => {
    setCkdata(e.editor.getData());
  };

  useEffect(() => {
    const endpoint = `banners/${id.id}`;
    callAPI(endpoint).then((res) => {
      if (!res) {
        alert('Error: Lost connect!');
      } else {
        setData(res);
      }
    });
  }, []);

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
    }).then((res) => {
      setImg(res.data.data.display_url);
      return res.data.data.display_url;
    }).catch(() => false);
  };

  // Submit in modal
  const onFormSubmit = (file) => {
    setLoad(true);
    const formData = new URLSearchParams();
    const string = Ckdata;
    let image = file.image_raw[0];
    uploadImage(image).then((res) => {
      if (res) {
        setImg(res);
        image = res;
        formData.append('image', res);
      }
    }).then(() => {
      const endpoint = `banners/${id.id}`;
      formData.append('text', string);
      APIput(endpoint, formData).then((respon) => {
        if (respon === false) {
          notice('Error', 'Editing Banner failed. Try Again!');
          setLoad(false);
          alert('Editing Banner failed!');
        } else {
          notice('Success ', 'Editing Banner successfully');
          setLoad(false);
          alert('Editing Banner successfully!');
          history.push('/admin/table/banner');
        }
      });
    });
  };
  const {
    register, handleSubmit
  } = useForm();
  return (
    <div>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Update Banner</Card.Title>
            </Card.Header>
            <Card.Body>
              <form method="POST" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="form-group">
                  <FormLabel>Content in banner </FormLabel>
                  <br />
                  {
                      data && (
                      <CKEditor
                        initData={data[0].text}
                        onChange={(e) => getDataCK(e)}
                      />
                      )
                  }

                </div>
                <div className="row">
                  <div className="col lg-8">
                    <div className="form-group">
                      <FormLabel>Choose the image for banner</FormLabel>
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Enter summary"
                        {...register('image_raw')}
                      />
                    </div>
                  </div>
                  <div className="col lg-4">
                    <div className="row">
                      <div className="form-group">
                        <FormLabel>Old image of banner</FormLabel>
                        <br />
                        <Image width={150} src={data && data[0].image} alt="old image" thumbnail />
                      </div>
                      <div className="space"> &emsp; &emsp;</div>
                      <div className="form-group">
                        <FormLabel>New image of banner</FormLabel>
                        <br />
                        <Image width={150} src={newImg || 'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg'} alt="new image" thumbnail />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <br />
                  {isLoad ? (
                    <button type="button" className="btn btn-login btn-right">
                      Loading...
                      &emsp;
                      <Spinner animation="border" variant="warning" size="sm" />
                    </button>
                  )
                    : (<button type="submit" className="btn btn-login btn-right"> Update </button>)}
                </div>
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

    </div>
  );
}
