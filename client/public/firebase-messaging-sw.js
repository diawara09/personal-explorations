importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAzhoCSeWRGb2OBbXZM9Bzc9orgamZdeu0",
    authDomain: "realtime-database-85a38.firebaseapp.com",
    databaseURL: "https://realtime-database-85a38-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "realtime-database-85a38",
    storageBucket: "realtime-database-85a38.firebasestorage.app",
    messagingSenderId: "491623270168",
    appId: "1:491623270168:web:15b174fd9f931a2df6006d"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });