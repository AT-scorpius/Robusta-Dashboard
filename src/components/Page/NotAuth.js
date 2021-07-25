/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import { Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NotAuth = () => (
  <>
    <Helmet>
      <title>404 | Not Authentication this Page</title>
    </Helmet>
    <div className="outer-login">
      <div className="inner-login">
        <div>
          Loading...
          &emsp;
          <Spinner animation="border" variant="warning" size="sm" />
        </div>
        <h3>
          Checking data...
          {' '}
          <small><Link to="/login">Login?</Link></small>
        </h3>
      </div>
    </div>

  </>
);

export default NotAuth;
