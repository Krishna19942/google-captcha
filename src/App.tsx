import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
function App() {
  return (
    <div className="App">
      <GoogleReCaptchaProvider reCaptchaKey="6Lf_u84nAAAAAAnNuPWpkfjdbRT3dLi28Nt-zMuz">
        <GoogleReCaptcha onVerify={()=> {console.log('true')}} />
        <div className="App">
        <button className="g-recaptcha" 
          data-sitekey="6Lf_u84nAAAAAAnNuPWpkfjdbRT3dLi28Nt-zMuz" 
          data-callback='onSubmit' 
          data-action='submit'
          onClick={()=> {console.log('true submit')}}
          
          >Submit</button>
        </div>
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;
