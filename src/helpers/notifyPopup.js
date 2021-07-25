/* eslint-disable prefer-destructuring */
import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import NotificationAlert from 'react-notification-alert';

function NotifyPopup(props) {
  const notificationAlertRef = React.useRef(null);
  let options = {};
  const place = 'tr';
  const { type, mes } = props;
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
  return (
    <div>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
    </div>
  );
}
NotifyPopup.propTypes = {
  type: propTypes.string,
  mes: propTypes.string,
};
export default NotifyPopup;
