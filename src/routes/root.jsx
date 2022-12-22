import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiGet } from "../api.jsx";
import "../index.scss";

export default function Root() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await apiGet("/ping");
      return res
    }
    fetchData().then((response) => {
      if (response) { setIsLogin(response.data.user) };
    });
  }, [])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-around bg-primary">
            <h1 className="text-secondary text-uppercase">header</h1>
            <nav className="navbar navbar-expand-lg">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link text-secondary" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-secondary" to={isLogin ? '/profile' : '/login'}>{isLogin ? 'My Account' : 'Log In'}</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className="row">
          <Outlet context={[setIsLogin]} />
        </div>
        <div className="row">
          <div className="col-12 mt-5 d-flex justify-content-center bg-primary"><h1 className="text-secondary text-uppercase">footer</h1></div>
        </div>
      </div>
    </>
  );
}