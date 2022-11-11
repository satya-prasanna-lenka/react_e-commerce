import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./adminLogin.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!name || !email || !password || !cpassword) {
      notify("all fiels are required", "warn");
    } else if (password !== cpassword) {
      notify("Passwords donot match", "warn");
    } else {
      const url = "http://localhost/all/shopnow/adminSignin.php";
      const fData = new FormData();
      fData.append("name", name);
      fData.append("email", email);
      fData.append("password", password);
      fData.append("cpassword", cpassword);
      setLoading(true);

      axios
        .post(url, fData)
        .then((res) => {
          setLoading(false);
          setName("");
          setEmail("");
          setPassword("");
          setCpassword("");
          if (res.data === "Email already exists") {
            notify("This email already registered");
          } else {
            notify(
              "Successfull😍,please check your mail to activate your account"
            );
          }
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <div>
      <div className="body"></div>
      <div className="grad">
        {loading ? (
          <div
            style={{
              position: "relative",
              left: "50%",
              width: "100px",
              zIndex: "999",
              top: "25%",
            }}
          >
            <Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              strokeWidthSecondary={1}
              color="blue"
              secondaryColor="red"
            />
          </div>
        ) : (
          <ToastContainer />
        )}
      </div>
      <div className="header">
        <p>
          A conformation msg will be send <br /> to a particucal eamil account
        </p>
        <div>
          signup<span>Admin</span>
        </div>
      </div>
      <br />
      <form className="login">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
          placeholder="username"
          name="name"
        />
        <br />
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
          required
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
          type="password"
          placeholder="confirm password"
          name="cpassword"
        />
        <br />
        <p>
          Back to login page
          <Link to="/admin/adminLogin">Click here</Link>
        </p>

        <input
          type="submitt"
          onClick={(e) => handleSubmit(e)}
          name="button"
          value="Signup"
        />
        <div className="container"></div>
      </form>
    </div>
  );
};

export default AdminSignup;
