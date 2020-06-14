import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyDlks_RnDsygHZ_Y9aLLGHZsjxXziDOVQY",
    authDomain: "pwa-push-notification-bb6d7.firebaseapp.com",
    databaseURL: "https://pwa-push-notification-bb6d7.firebaseio.com",
    projectId: "pwa-push-notification-bb6d7",
    storageBucket: "pwa-push-notification-bb6d7.appspot.com",
    messagingSenderId: "404902062137",
    appId: "1:404902062137:web:9e7ac941723c7da889c5e8",
    measurementId: "G-LMM4VXRL8E"
  });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}

navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });