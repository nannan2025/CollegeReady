import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(
   <React.StrictMode>
     <BrowserRouter>
       <App />
     </BrowserRouter>
   </React.StrictMode>,
   document.getElementById("root")
);


