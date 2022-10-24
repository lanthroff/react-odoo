import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  Route, Routes, unstable_HistoryRouter as HistoryRouter
} from "react-router-dom";

import history from "./history.jsx";

import Root from "./routes/root.jsx";
import NotFound from "./routes/not-found.jsx";
import ErrorPage from "./routes/error.jsx";
import Login from "./routes/login.jsx";
import Profile from "./routes/profile.jsx";
import Home from "./routes/home.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/"
          element={<Root />}
          errorElement={<ErrorPage />}>
          <Route index={true} element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HistoryRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
