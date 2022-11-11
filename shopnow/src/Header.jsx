import "jquery/dist/jquery.slim.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function Header() {
  const [cookies, setCookie] = useCookies();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  var totalPrice = 0;

  const notify = (msg) => {
    toast.warn(msg, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const fetchData = () => {
    // setLoading(true);

    const url = "http://localhost/all/shopnow/dashboard.php";
    axios
      .get(url)
      .then((res) => {
        // setLoading(false);
        if (res.data === "No data available") {
          // notify(res.data);
        } else if (cookies.pid) {
          const find = res.data?.filter((ss) => cookies.pid?.includes(ss.id));
          let result = res.data.filter((o1) =>
            cookies.cid.some((o2) => o1.id === o2.id)
          );
          // console.log(result);
          // console.log(find);

          setData(find);
        } else {
          // notify("Your cart is empty");
        }
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
        // notify("Network connection failed");
      });
  };

  const handleRemove = (id) => {
    // console.log(id);
    let expires = new Date();
    expires.setTime(expires.getTime() + 86400000);
    if (cookies.pid && !cookies.cid) {
      const ssp = cookies.pid?.filter((data) => data != id);
      setCookie("pid", ssp, { path: "/", expires });
    } else if (cookies.cid && !cookies.pid) {
      const ssc = cookies.cid?.filter((data) => data.id != id);
      setCookie("cid", ssc, { path: "/", expires });
    } else {
      const ssp = cookies.pid?.filter((data) => data != id);
      const ssc = cookies.cid?.filter((data) => data.id != id);

      setCookie("pid", ssp, { path: "/", expires });
      setCookie("cid", ssc, { path: "/", expires });
    }
    // console.log(ss);
    const url = "http://localhost/all/shopnow/dashboard.php";
    axios
      .get(url)
      .then((res) => {
        // setLoading(false);
        if (res.data === "No data available") {
          // notify(res.data);
        } else {
          const ssp = cookies.pid?.filter((data) => data != id);
          const find = res.data.filter((ss) => ssp.includes(ss.id));

          setData(find);
        }
      })
      .catch((err) => {
        // setLoading(false);
        // notify("Network connection failed");
      });
  };
  const handleCheckout = (e) => {
    e.preventDefault();
    if (cookies.email) {
      if (totalPrice > 0) {
        navigate("/checkout", {
          state: { details: data, total: totalPrice },
        });
      } else {
        navigate("/shop");
      }
    } else {
      // notify("Please login to proceed checkout");
      setTimeout(() => {
        navigate("/login", { state: { page: "checkout" } });
      }, 2500);
    }
  };

  // console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation"
      id="navbar"
    >
      <ToastContainer />
      <div className="container">
        <Link className="navbar-brand font-weight-bold" to={{ pathname: "/" }}>
          E-Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="main-navbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={{ pathname: "/" }}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>

            <li className="nav-item dropdown dropdown-slide">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown4"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Pages.
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown4">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Blog Single</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">404 Page</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown dropdown-slide">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown3"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shop.
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
                <li>
                  <Link to={{ pathname: "/shop" }}>Shop</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/single-product" }}>
                    Product Details
                  </Link>
                </li>
                <li>
                  <Link to={{ pathname: "/checkout" }}>Checkout</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/cart" }}>Cart</Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown dropdown-slide">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown5"
                role="button"
                data-delay="350"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Account.
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                <li>
                  <Link to={{ pathname: "/login" }}>Login Page</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/signup" }}>SignUp Page</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/forgot-password" }}>
                    Forgot Password
                  </Link>
                </li>
                <li>
                  <Link to={{ pathname: "/admin/adminLogin" }}>Admin</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <ul
          className="top-menu list-inline mb-0 d-none d-lg-block"
          id="top-menu"
        >
          <li className="list-inline-item">
            <a href="#" className="search_toggle" id="search-icon">
              <i className="tf-ion-android-search"></i>
            </a>
          </li>

          <li className="dropdown cart-nav dropdown-slide list-inline-item">
            <a
              href="#"
              className="dropdown-toggle cart-icon"
              data-toggle="dropdown"
              data-hover="dropdown"
            >
              <i className="tf-ion-android-cart"></i>
            </a>
            <div className="dropdown-menu cart-dropdown">
              {data?.map((data) => {
                const spl = cookies.cid.find((ssp) => {
                  return ssp.id === data.id;
                });

                if (spl) {
                  totalPrice += data.sPrice * spl.qty;
                }
                return (
                  <div className="media">
                    <a href="/product-single">
                      <img
                        className="media-object img- mr-3"
                        src={require(`./photos/${
                          data.mainImage ? data.mainImage : "dummy.png"
                        }`)}
                        alt="image"
                      />
                    </a>
                    <div className="media-body">
                      <h6>{data && data.name}</h6>
                      <div className="cart-price">
                        <span>{spl && spl.qty} x</span>
                        <span>₹{data && data.sPrice}</span>
                      </div>
                    </div>
                    <a onClick={() => handleRemove(data.id)} className="remove">
                      <i className="tf-ion-close"></i>
                    </a>
                  </div>
                );
              })}

              {/* <div className="media">
                <a href="/product-single">
                  <img
                    className="media-object img-fluid mr-3"
                    src="assets/images/cart-2.jpg"
                    alt="image"
                  />
                </a>
                <div className="media-body">
                  <h6>Skinny Jeans</h6>
                  <div className="cart-price">
                    <span>1 x</span>
                    <span>1250.00</span>
                  </div>
                </div>
                <a href="#" className="remove">
                  <i className="tf-ion-close"></i>
                </a>
              </div> */}

              <div className="cart-summary">
                <span className="h6">Total</span>
                <span className="total-price h6">
                  ₹{totalPrice && totalPrice}.00
                </span>

                <div className="text-center cart-buttons mt-3">
                  <Link
                    to="/cart"
                    className="btn btn-small btn-transparent btn-block"
                  >
                    View Cart
                  </Link>
                  <Link
                    onClick={(e) => handleCheckout(e)}
                    className="btn btn-small btn-main btn-block"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li className="list-inline-item">
            {cookies.email && (
              <a href="#">
                <i className="tf-ion-ios-person mr-3"></i>
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
