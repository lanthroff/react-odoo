import { Link } from "react-router-dom";
import { apiPost } from "../api.jsx";

export default function Home() {
  async function failUser() {
    const response = await apiPost("/post", { "marc": "champion" })
    console.log(response);
  }
  async function ping() {
    const result = await apiPost("/api", { age: 12, name: "clément" })
    console.log(result);
  }
  return (
    <>
      <div className="col-12 d-flex justify-content-around">
        <Link to="/login">Login</Link>
        <button className="btn btn-primary" onClick={failUser}>Fail user access</button>
        <button className="btn btn-primary" onClick={ping}>Ping</button>
      </div>
    </>)
}