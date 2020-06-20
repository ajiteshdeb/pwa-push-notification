import React, { useEffect } from 'react';
import { Switch } from "antd";
import "antd/dist/antd.css";

import  { withFirebaseContext } from '../../utils/firebase/HOC/withFirebaseContext';

function Notification({ messaging }) {

  const renderSubscriptionOptions = () => {
    if (!('serviceWorker' in navigator) && !('PushManager' in window)) {
      return (
        <p>
          Notification feature is supported only in:<br />
          Chrome Desktop and Mobile (version 50+)<br />
          Firefox Desktop and Mobile (version 44+)<br />
          Opera on Mobile (version 37+)
        </p>
      );
    } else {
      return (
        <>
          <div className="enable-notif">
            <Switch onChange={onChange} />
            <span className="enable-notif-title">Enable/Disable Notifications</span>
          </div>
          <div className="notes">
            <h1>Important:</h1>
            <ol>
              <li>
                Notifications are delivered real time through your browser. You need to have your browser open (not necessarily the site) inorder to receive the notifications.
                </li>
              <li>
                To receive notifications in your mobile as well, please enable the option by visiting the site in your mobile browser.
                </li>
              <li>
                If you had previously blocked notifications from the site in your browser settings then you need to unblock it. Check out <a href="https://support.google.com/chrome/answer/3220216">Turn notifications on or off for Chrome.</a>
              </li>
              <li>
                If incase, you are not receiving any notifications then it could be an issue with your browser. Try deleting your browser cache and re-installing it if the issue persists.
                </li>
            </ol>
          </div>
        </>
      );
    }
  }

  const notificationPermission = async() => {
    let permissionGranted = false;
    let INSTANCE_TOKEN;
    try {
        if (Notification.permission !== 'granted') {
            await messaging.requestPermission();
        }else if (localStorage.getItem(INSTANCE_TOKEN) !== null) {
            permissionGranted = true;
        } else {
            const token = await messaging.getToken();
            // await this.sendTokenToDb(token);
            localStorage.setItem(INSTANCE_TOKEN, token);
            permissionGranted = true;
        }
    } catch (err) {
        console.log(err);
        if (err.hasOwnProperty('code') && err.code === 'messaging/permission-default') console.log('You need to allow the site to send notifications');
        else if (err.hasOwnProperty('code') && err.code === 'messaging/permission-blocked') console.log('Currently, the site is blocked from sending notifications. Please unblock the same in your browser settings');
        else console.log('Unable to subscribe you to notifications');
    } finally {
        return permissionGranted;
    }
}
  return (
    <div className="Notification">
      {renderSubscriptionOptions()}
    </div>
  );
}

export default withFirebaseContext(Notification);
