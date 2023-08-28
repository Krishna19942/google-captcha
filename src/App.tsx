import React from 'react';
import './App.css';
import { GoogleReCaptchaProvider, GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import axios from 'axios';

function App() {
  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBfhpK_TFSY6PNtWg8EjaJSjgIkI_GGey4",
    authDomain: "recaptchav3-61eb1.firebaseapp.com",
    projectId: "recaptchav3-61eb1",
    storageBucket: "recaptchav3-61eb1.appspot.com",
    messagingSenderId: "46461743954",
    appId: "1:46461743954:web:6938f44e60fb5d04e6808b",
    measurementId: "G-EP3WJ3ST65"
  };
  const app = initializeApp(firebaseConfig);


  const YourReCaptchaComponent = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = React.useCallback(async () => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }
  
      const token = await executeRecaptcha('submit');
      console.log('token received', token);

      // Call Google's API to get score
      const res = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=6Lcm7NwnAAAAACW9_sCcNU874f_QFlglX9RTdIvR&response=${token}`
      );
      
      // Extract result from the API response
      if (res.data.success){
        console.log('res',res.data)
        console.log('Valid');
      } else {
        console.log('res',res)
        console.log('Invalid');
      }
      

  // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
    // key is the counterpart to the secret key you set in the Firebase console.
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6Lcm7NwnAAAAALwID8kRKnkWhhAxMUSlO5PasZFk')
    });
      // Do whatever you want with the token
    }, [executeRecaptcha]);
  
    // You can use useEffect to trigger the verification as soon as the component being loaded
    React.useEffect(() => {
      handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);
  
    return (
      <div className="App">
          <div className="input-group">
            <input type="text" name="name" placeholder="Your name"/>
          </div>
          <div className="input-group">	
              <input type="email" name="email" placeholder="Your email"/>
          </div>
          <div className="input-group">
              <textarea name="message" placeholder="Type message..."></textarea>
          </div>

          <input type="hidden" name="submit_frm" value="1"/>

          <button className="g-recaptcha" 
            data-sitekey="6Lcm7NwnAAAAALwID8kRKnkWhhAxMUSlO5PasZFk" 
            data-callback='onSubmit' 
            data-action='submit'
            onClick={handleReCaptchaVerify}
            >
                Submit
            </button>
        </div>
    );
  };

  return (
    <div className="App">
      <GoogleReCaptchaProvider reCaptchaKey="6Lcm7NwnAAAAALwID8kRKnkWhhAxMUSlO5PasZFk" useEnterprise={true}>
        <YourReCaptchaComponent />        
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;
