import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../api.jsx";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [setIsLogin] = useOutletContext();

  const navigate = useNavigate();

  function loginChange(event) {
    setLogin(event.target.value);
  }

  function passwordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    setErrorMessage("");
    event.preventDefault();
    const response = await apiPost("/api/login", { login: login, password: password })
    if (response.status === 200 && response.data.success) {
      setIsLogin(true);
      navigate("/");
    } else {
      setErrorMessage(response.data);
    }
  }

  return (
    <>
      <div className="col-12 d-flex justify-content-around">
        <h1 className="text-primary">Log In</h1>
      </div>
      <div className="col-12 d-flex justify-content-around">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <label className="text-secondary">Login:
                <input className="form-control" type="text" value={login} onChange={loginChange} />
              </label>
              <br />
              <label className="text-secondary">Password:
                <input className="form-control" type="text" value={password} onChange={passwordChange} />
              </label>
              <br />
              <div className="w-100 text-center mt-4">
                <button type="submit" className="btn btn-secondary"><span className="text-primary">Log In</span></button>
              </div>
            </form>
            {errorMessage ? <div className="alert alert-danger w-100 mt-3">{errorMessage}</div> : ''}
          </div>
        </div>
      </div>
      {/* <div className="col-12 d-flex justify-content-around">
        <button className="btn btn-primary" onClick={handlePost}>TEST</button>
      </div> */}
    </>
  );
}