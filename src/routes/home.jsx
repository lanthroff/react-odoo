import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="col-4 text-center">
        <h3 className="text-primary">You can login</h3>
        <h3 className="text-secondary">Using your odoo credentials</h3>
      </div>
      <div className="col-4 d-flex justify-content-center align-items-center">
        <Link to="/login" className="fs-1">Login</Link>
      </div>
      <div className="col-4 d-flex justify-content-center align-items-center">
        <p className="text-secondary">
          You can then go to your account page and play with the todo list example.
        </p>
      </div>
    </>)
}