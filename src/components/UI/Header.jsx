import React, { useContext } from "react";
import MyModal from "./MyModal/MyModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignUpForm from "../forms/SignUpForm";
import SignInForm from "../forms/SignInForm";
import { observer } from "mobx-react-lite";
import { Context } from "../../App";
const Header = observer(() => {
  const { store } = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);
  return (
    <header className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <MyModal visible={visible} setVisible={setVisible}>
        {isSignUpFormVisible ? <SignUpForm /> : <SignInForm />}
      </MyModal>
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <Link to="/" className="nav-link px-2 link-secondary">
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link px-2 link-dark">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/posts" className="nav-link px-2 link-dark">
            Posts
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link px-2 link-dark">
            FAQs
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link px-2 link-dark">
            About
          </Link>
        </li>
      </ul>
      <div className="col-md-3 text-end">
        {store.isAuth ? (
          <button
            type="button"
            className="btn btn-outline-primary me-2"
            onClick={() => {store.logout()}}
          >
            Logout
          </button>
        ) : (
          <div>
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={() => {
                setVisible(true);
                setIsSignUpFormVisible(false);
              }}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setVisible(true);
                setIsSignUpFormVisible(true);
              }}
            >
              Sign-up
            </button>
          </div>
        )}
      </div>
    </header>
  );
});

export default Header;
