import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminLogin.css";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const notify = (msg) => {
    toast.warn(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      notify("Please fill all the fields");
    } else {
      const url = "http://localhost/all/shopnow/adminLogin.php";
      const fData = new FormData();
      fData.append("email", email);
      fData.append("password", password);

      axios
        .post(url, fData)
        .then((res) => {
          setEmail("");
          setpassword("");
          if (res.data == "Email does not exist, Please register first") {
            notify("Email does not exist, Please register first");
          } else if (res.data == "Please activate your account") {
            notify("Please activate your account thorough the email sent");
          } else if (res.data == "Please put correct password") {
            notify("Please put correct password");
          } else if (res.data == "success") {
            notify("success");
            let expires = new Date();
            expires.setTime(expires.getTime() + 2629746000);

            setCookie("admin", email, { path: "/", expires });

            navigate("/admin/admin");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div className="body"></div>
      <div className="grad"></div>
      <ToastContainer />
      <div className="header">
        <p>
          A conformation msg will be send <br /> to a particucal eamil account
        </p>
        <div>
          Login<span>Admin</span>
        </div>
      </div>
      <br />
      <form className="login">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="email"
          name="email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
          type="password"
          placeholder="password"
          name="password"
        />

        <br />
        <p>
          Not signed up yet ? create an account
          <Link to="/admin/adminSignup">Click here</Link>
        </p>

        <input
          onClick={(e) => handleSubmit(e)}
          type="submitt"
          name="button"
          value="Login"
        />
        <div className="container"></div>
      </form>
    </div>
  );
};

export default AdminLogin;
