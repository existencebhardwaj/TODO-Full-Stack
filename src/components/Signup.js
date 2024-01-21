import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/Signup.css";
function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/signup", {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            alert("User already exists");
          } else if (res.data == "notexist") {
            history("/home", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      {/* <h1>Signup</h1>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link> */}
      <div className="content">
        <p className="header">Make account to see more</p>
        <form action="POST">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="detail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="detail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="submit"
            className="btn int"
            onClick={submit}
            value="Register Account"
          />
        </form>
        <footer>
          <hr />
          <Link className="links" to="/">
            Already have an account? Login
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Login;
