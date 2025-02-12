// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';  // Import Provider
import store from './admin/reduxStore/store';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<GoogleOAuthProvider 
  clientId="430613112361-d43j86lb9goe7nsn91c2vd3gkmf2cv9r.apps.googleusercontent.com"
  onScriptLoadError={(error) => console.error("Google OAuth Script Error:", error)}
>

    <Provider store={store}>
      <App />
    </Provider>

</GoogleOAuthProvider>

);

reportWebVitals();
