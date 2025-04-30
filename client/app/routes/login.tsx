import {useFetcher} from 'react-router'
import toast, {Toaster} from 'react-hot-toast'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken,onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import firebaseConfig from "utils/firebaseApp";
import { serverUrl } from "utils/serverUrl";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import type { Route } from "./+types/login";


const app = initializeApp(firebaseConfig);

export async function clientAction({request}: Route.ClientActionArgs ){
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://personal-explorations.vercel.app/admin',
    // This must be true.
    handleCodeInApp: true,
   
    // The domain must be configured in Firebase Hosting and owned by the project.
    //linkDomain: 'custom-domain.com'
  };
  const formData = await request.formData()
  const bodyObj = Object.fromEntries(formData)
  const email = bodyObj.email
  console.log(email);
  const auth = getAuth(app);
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    return {msg: "Email Sent"}
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    return { error: error.message }
    // ...
  });
  return {msg: "Email Sent"}

}
export default function Login(){
  
    const fetcher = useFetcher()
    useEffect(() => {
      const toastOptions = {duration: 5000}
      fetcher.data ? fetcher.data.msg ? toast.success(fetcher.data.msg, toastOptions): toast.error(fetcher.data.error,toastOptions):''
 
   })
    return (<>
     <div className="hero bg-base-200 min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full mx-auto my-5 max-w-sm shrink-0 shadow-2xl rounded-none">
          <div className="card-body">
            <fetcher.Form
              method="post"
              className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
            >
              <legend className="fieldset-legend">Login</legend>
             
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <Toaster />
              <button className="btn btn-primary mt-4">
                {' '}
                {fetcher.state === 'idle' ? (
                  'Login'
                ) : (
                  <span className="loading loading-ball"></span>
                )}{' '}
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
    </>)
}