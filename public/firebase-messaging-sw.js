/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp({
    messagingSenderId: "your messagingSenderId again"
});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', (event) => {
    if (event.action) {
        clients.openWindow(event.action);
    }
    event.notification.close();
}); 