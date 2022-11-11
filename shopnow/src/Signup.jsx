import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useCookies } from "react-cookie";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies();
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

  const notifyy = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
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
    } else if (password != cpassword) {
      notify("Passwords donot match", "warn");
    } else {
      const url = "http://localhost/all/shopnow/signup.php";
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
          console.log(res);
          setName("");
          setEmail("");
          setPassword("");
          setCpassword("");
          if (res.data.type == "Email already exist") {
            notify("This email already registered");
          } else if (res.data === "Success") {
            notifyy(
              "Successfull😍,please check your mail to activate your account"
            );
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } else if (res.data === "Error") {
            notify("Error");
          }
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="signUp-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center heading">
                  {loading ? (
                    <div
                      style={{
                        position: "relative",
                        left: "35%",
                        width: "100px",
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
                  <h2 className="mb-2">Sign Up</h2>
                  <p className="lead">
                    Already have an account? <Link to="/login"> Login now</Link>
                  </p>
                </div>

                <form action="#">
                  <div className="form-group mb-4">
                    <label htmlFor="email">Enter Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email Address"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="name">Enter username</label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="pass">Enter Password</label>
                    <input
                      id="pass"
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpass">Confirm Password</label>
                    <input
                      id="cpass"
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-main mt-3 btn-block"
                  >
                    Signup
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
export default SignUp;
