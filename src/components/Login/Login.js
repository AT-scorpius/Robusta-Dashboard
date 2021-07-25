/* eslint-disable react/button-has-type */
/* eslint-disable function-paren-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */

import './style.css';
// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postLogin, callLogin } from 'API/callAPI';
import { Redirect, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

function Login(props) {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm();
  const [isLoad, setLoad] = useState(false);
  const [err, getErr] = useState(false);
  const history = useHistory();

  const errLogin = false;

  useEffect(() => {
    sessionStorage.removeItem('__token__');
  }, []);
  useEffect(() => {
    sessionStorage.removeItem('__token__');
  }, [err]);
  const onSubmitLogin = async (data) => {
    setLoad(true);
    const check = document.getElementById('save_login');
    const body = {
      email: data.email,
      password: data.password
    };

    if (check.checked) {
      await callLogin(body, true).then((res) => {
        setLoad(false);
        if (res) {
          history.replace('/admin');
          window.location.reload();
        } else {
          setLoad(false);
          getErr(true);
        }
      }).catch(() => {
        getErr(true);
      });
    } else {
      await callLogin(body, false).then((res) => {
        setLoad(false);
        console.log(res);
        if (res) {
          history.replace('/admin');
          window.location.reload();
        } else {
          getErr(true);
        }
      }).catch(() => {
        setLoad(false);
        getErr(true);
      });
    }
  };
  return (
    <div>
      <div className="body-login">
        <div className="outer-login">
          <div className="inner-login">
            <form method="POST" onSubmit={handleSubmit(onSubmitLogin)}>
              <div className="logo-img-login">
                <img
                  src="https://www.passerellesnumeriques.org/misc/logo-en.png"
                  alt="PNV-"
                />
              </div>
              <br />
              <h3>
                <b>Log in </b>
              </h3>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <small>
                    <span className="text-danger">This field must be email</span>
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <small>
                    <span className="text-danger">This field cannot be left blank</span>
                  </small>
                )}
                <br />
                <small>
                  {err ? (
                    <div className="text-danger">
                      {' '}
                      <b>Login failed:</b>
                      {' '}
                      Check your account and password
                    </div>
                  ) : (<div> </div>)}
                </small>
              </div>

              <div className="form-group">
                <input type="checkbox" id="save_login" />
                &nbsp;
                <label htmlFor="save_login"> Save login? </label>
              </div>
              {isLoad ? (
                <button className="btn btn-login btn-lg btn-block">
                  Loading...
                  &ensp;
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </button>
              )
                : (
                  <button type="submit" className="btn btn-login btn-lg btn-block">Sign in</button>
                ) }

            </form>

          </div>
        </div>
      </div>

    </div>
  );
}
export default Login;
