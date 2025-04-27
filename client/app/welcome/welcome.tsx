import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect } from "react";
import firebaseConfig from "utils/firebaseApp";
import { serverUrl } from "utils/serverUrl";




export function Welcome() {// Initialize Firebase
  const app = initializeApp(firebaseConfig);
 
  useEffect(() => {
     // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(app);
  getToken(messaging, {vapidKey: "BMYYDizVlu3K4dSGRmjzFq52qiX1kifKrOuVQfjLoSF2OMokn3w0JtFt_yXqHgIUawiFcYlM8T3kWtK7GRoIFxg"}).then(async (currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken);
        // send token to server
        const req = await fetch(serverUrl + "/token/", {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          mode: "cors",
          body: JSON.stringify({token: currentToken})
        })
        // ...
      } else {
        // Show permission request UI
        requestPermission();
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  })
  return (
   <div className="flex my-3">
   <button className="btn btn-soft btn-primary m-2">Request Permission</button>
   <button className="btn btn-soft btn-secondary m-2">Reset UI</button>
   </div>
  );
}

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve a registration token for use with FCM.
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}