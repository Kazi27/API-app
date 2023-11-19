// import React, { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./styles.css";

// import App from "./App";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );


import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store/Store'; // Import your Redux store

import App from './App'; // Your main App component

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
