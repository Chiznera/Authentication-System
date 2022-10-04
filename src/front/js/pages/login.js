import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (store.logStatus) {
      navigate("/private");
    }
  }, [store.logStatus]);

  return (
    <div className="container">
      <form className="my-5">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            onChange={(e) => setEmail(e.target.value)}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            onChange={(e) => setPassword(e.target.value)}
            id="exampleInputPassword1"
          />
        </div>
        {/* <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <div
          //   type="submit"
          class="btn btn-primary"
          onClick={() => actions.login(email, password)}
        >
          Submit
        </div>
      </form>
    </div>
  );
};
