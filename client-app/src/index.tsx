import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { store, StoreContext } from "./app/stores/store";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import ScrollToTop from "./app/layout/ScrollToTop";

export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <ScrollToTop />
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
