import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
function App() {
  return (
    <div className="App">
      <GoogleReCaptchaProvider reCaptchaKey="6Lf_u84nAAAAAAnNuPWpkfjdbRT3dLi28Nt-zMuz">
        <div className="App">
          testing
        </div>
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;
