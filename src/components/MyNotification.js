// import React from 'react';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
 
// class MyNotification extends React.Component {
//   createNotification = (type) => {
//     return () => {
//       switch (type) {
//         case 'info':
//           NotificationManager.info('Info message');
//           break;
//         case 'success':
//           NotificationManager.success('Success message', 'Title here');
//           break;
//         case 'warning':
//           NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
//           break;
//         case 'error':
//           NotificationManager.error('Error message', 'Click me!', 5000, () => {
//             alert('callback');
//           });
//           break;
//       }
//     };
//   }



import React, { Component } from 'react';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
 
class MyNotification extends Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }
 
  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Awesome Notifications!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
 
  render() {
    return (
      <div className="app-content">
        <ReactNotification ref={this.notificationDOMRef} />
        <button onClick={this.addNotification} className="btn btn-primary">
          Add Awesome Notification
        </button>
      </div>
    );
  }
}

export default MyNotification;