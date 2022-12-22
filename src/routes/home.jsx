import { Link } from "react-router-dom";
import { ReactComponent as EducacodeLogo } from "../educacode.svg";

export default function Home() {
  return (
    <>
      <div className="mt-4 mt-lg-0 order-2 order-lg-1 col-12 col-lg-4 d-flex justify-content-center align-items-center">
        <div>
          <h3 className="text-primary">You can login</h3>
          <h4 className="text-secondary">Using your odoo credentials</h4>
        </div>
      </div>
      <div className="order-1 order-lg-2 col-12 col-lg-4 text-center">
        <EducacodeLogo className="d-block w-100" />
        <Link to="/login" className="fs-1">Login</Link>
      </div>
      <div className="mt-4 mt-lg-0 order-3 col-12 col-lg-4 d-flex justify-content-center align-items-center">
        <p className="text-secondary">
          You can then go to your account page and play with the todo list example.
        </p>
      </div>
    </>)
}