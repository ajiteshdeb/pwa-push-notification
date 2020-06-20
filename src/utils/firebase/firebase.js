import app from 'firebase/app';
import '@firebase/messaging';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appID:process.env.REACT_APP_ID,
  measurementId:process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  messaging;
  constructor() {
   app.initializeApp(config);
   this.initializeMessaging();
  }

  reflog = () => {
    console.log(app.messaging.isSupported());
  }

  initializeMessaging = () => {
    if(app.messaging.isSupported()) {
      this.messaging = app.messaging();
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
                updateViaCache: 'none'
            });
            this.messaging.useServiceWorker(registration);
            this.messaging.onMessage((payload) => {
                const title = payload.notification.title;
                const options = {
                    body: payload.notification.body,
                    icon: payload.notification.icon,
                    actions: [
                        {
                            action: payload.fcmOptions.link,
                            title: 'Book Appointment'
                        }
                    ]
                };
                registration.showNotification(title, options);           
            });
        });
      }
    }
  }
}
export default Firebase;