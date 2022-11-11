import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const location = useLocation();
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
      const url = "http://localhost/all/shopnow/login.php";
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
            expires.setTime(expires.getTime() + 86400000);
            setCookie("email", email, { path: "/", expires });
            if (location.state?.page === "checkout") {
              navigate("/checkout");
            } else {
              navigate("/");
            }
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="login-container">
      <ToastContainer />
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center heading">
                  <h2 className="mb-2">Login</h2>
                  <p className="lead">
                    Don’t have an account?
                    <Link to="/signup">Create a free account</Link>
                  </p>
                </div>

                <form action="#">
                  <div className="form-group mb-4">
                    <label htmlFor="email">Enter emailaddress</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter emailaddress"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">Enter Password</label>
                    <a className="float-right" href="/forgot-password">
                      Forget password?
                    </a>
                    <input
                      id="pass"
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-main mt-3 btn-block"
                  >
                    Login
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
