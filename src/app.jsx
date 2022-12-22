import React from "react";
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
export default function App() {
  return (
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
  )
}
