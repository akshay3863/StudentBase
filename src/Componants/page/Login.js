import React, { useState } from "react";
import Logo from "../../Assest/logo.svg";
import Input from "../layout/Input";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
function Login() {
  let history = useHistory();
  const firebase = useFirebase();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const onChange = (event) => {
    setuser({ ...user, [event.target.name]: event.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await firebase.login(user);
    history.push("/");
  };
  return (
    <div className="container">
      <div className="py-5">
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <div className="card shadow">
              <div className="card-body">
                <img
                  src={Logo}
                  alt="COmpany Logo"
                  width="100px"
                  style={{
                    display: "block",
                    margin: "auto",
                    marginBottom: "20px",
                  }}
                />
                <form onSubmit={submit}>
                  <div className="form-group">
                    <Input
                      name="email"
                      placeholder="Enter Your E-mail"
                      value={user.email}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      value={user.password}
                      onChange={onChange}
                    />
                  </div>
                  <button className="btn btn-primary btn-block" type="submit">
                    Login to dashboard
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
