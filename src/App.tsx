import React from 'react';
import './App.css';
import { GoogleReCaptchaProvider, GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function App() {
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
      // Do whatever you want with the token
    }, [executeRecaptcha]);
  
    // You can use useEffect to trigger the verification as soon as the component being loaded
    React.useEffect(() => {
      handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);
  
    return (
      <div className="App">
          <div className="input-group">
            <input type="text" name="name" value="" placeholder="Your name"/>
          </div>
          <div className="input-group">	
              <input type="email" name="email" value="" placeholder="Your email"/>
          </div>
          <div className="input-group">
              <textarea name="message" placeholder="Type message..."></textarea>
          </div>

          <input type="hidden" name="submit_frm" value="1"/>

          <button className="g-recaptcha" 
            data-sitekey="6Lf_u84nAAAAAAnNuPWpkfjdbRT3dLi28Nt-zMuz" 
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
      <GoogleReCaptchaProvider reCaptchaKey="6Lf_u84nAAAAAAnNuPWpkfjdbRT3dLi28Nt-zMuz">
        <YourReCaptchaComponent />        
      </GoogleReCaptchaProvider>
    </div>
  );
}

export default App;
