import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import firebaseConfig from "utils/firebaseApp";
import { serverUrl } from "utils/serverUrl";

import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    const auth = getAuth(app);
    async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = localStorage.getItem("emailForSignIn");
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt("Please provide your email for confirmation");
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
          .then(async (result: any) => {
            console.log(result);
            // Clear email from storage.
            localStorage.removeItem("emailForSignIn");

            setLoggedIn(true);
            // You can access the new user by importing getAdditionalUserInfo
            // and calling it with result:
            // getAdditionalUserInfo(result)
            // You can access the user's profile via:
            // getAdditionalUserInfo(result)?.profile
            // You can check if the user is new or existing:
            // getAdditionalUserInfo(result)?.isNewUser
          })
          .catch((error: any) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
            console.log(error);
          });

        const req = await fetch(serverUrl + "/auth/signup", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const response = await req.json();
        console.log(response);
        if (response.error) setLoggedIn(false);
        if (response.token) localStorage.setItem("token", response.token);
      }
    };
  });

  return (
    <>
      <p>
        {" "}
        {loggedIn ? `Congrats! You are loged in.` : "You are not logged in!"}
      </p>
    </>
  );
}
