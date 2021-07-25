/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

const NotFound = () => (
  <>
    <Helmet>
      <title>404 | Not Found this Page</title>
    </Helmet>
    <div className="outer-login">
      <div className="inner-login">
        <h3 className="center">
          Not Found this Page
          <br />
          <small className="text-right"><NavLink to="/">Go to the homepage? </NavLink></small>
        </h3>
      </div>
    </div>

  </>
);

export default NotFound;
