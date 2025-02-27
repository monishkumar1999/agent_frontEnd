import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./admin/reduxStore/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <GoogleOAuthProvider
    clientId="430613112361-d43j86lb9goe7nsn91c2vd3gkmf2cv9r.apps.googleusercontent.com"
    onScriptLoadError={(error) =>
      console.error("Google OAuth Script Error:", error)
    }
  >
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

reportWebVitals();
