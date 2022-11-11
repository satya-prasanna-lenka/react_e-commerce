import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MagnifyingGlass } from "react-loader-spinner";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    street: "",
    apartment: "",
    town: "",
    dis: "",
    pin: "",
    phone: "",
    msg: "",
    orderDetails: "",
    total: "",
  });

  // console.log(...cookies.cid);

  const [first, last] = data?.name?.split(" ");

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

  const fetchData = () => {
    // setLoading(true);

    const url = "http://localhost/all/shopnow/login.php?email=" + cookies.email;

    axios
      .get(url)
      .then((res) => {
        // setLoading(false);
        // console.log(res.data[0].name);
        setData({
          ...data,
          name: res.data[0].name,
          email: res.data[0].email,
          orderDetails: JSON.stringify(cookies.cid),
          total: location.state.total,
        });
      })
      .catch((err) => console.log(err));
  };
  // console.log(data, "sss");

  const handleOrder = (e) => {
    e.preventDefault();
    if (
      !data.street ||
      !data.town ||
      !data.dis ||
      !data.pin ||
      !data.phone ||
      !data.orderDetails
    ) {
      notify("Please fill the form");
    } else {
      const url = "http://localhost/all/shopnow/order.php";
      const fData = new FormData();
      fData.append("name", data.name);
      fData.append("email", data.email);
      fData.append("street", data.street);
      fData.append("apartment", data.apartment ? data.apartment : "");
      fData.append("town", data.town);
      fData.append("dis", data.dis);
      fData.append("pin", data.pin);
      fData.append("phone", data.phone);
      fData.append("msg", data.msg ? data.msg : "");
      fData.append("orderDetails", data.orderDetails);
      fData.append("total", data.total);
      setLoading(true);

      axios
        .post(url, fData)
        .then((res) => {
          setLoading(false);
          // console.log(res);
          setData({
            name: data.name,
            street: "",
            apartment: "",
            town: "",
            dis: "",
            pin: "",
            phone: "",
            msg: "",
            orderDetails: "",
            total: "",
          });

          if (res.data === "email does not exist") {
            notify("This email already registered");
          } else if (res.data === "Success") {
            // console.log("success");
            notify("Order success");
            window.scrollTo(300, 300);
            removeCookie("cid");
            removeCookie("pid");
            fetchData();
            navigate("/myorders");
          } else {
            // console.log("err");
          }
        })
        .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/cart");
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(300, 300);
  }, [navigate]);
  return (
    <div className="checkout-container">
      <ToastContainer />
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Checkout</h1>
                <p>
                  Hath after appear tree great fruitful green dominion moveth
                  sixth abundantly image that midst of god day multiply you’ll
                  which
                </p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-wrapper">
        <div className="checkout shopping">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 pr-5">
                <div
                  className="coupon-notice "
                  data-toggle="modal"
                  data-target="#coupon-modal"
                >
                  {/* <div className="bg-light p-3">ss</div> */}
                </div>

                <div className="billing-details mt-5">
                  <h4 className="mb-4">Billing Details</h4>
                  <form className="checkout-form">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            placeholder=""
                            value={first && first}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label htmlFor="last_name">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            placeholder=""
                            value={last && last}
                          />
                        </div>
                      </div>
                      {/* <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="company_name">
                            Company Name(Optional)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="company_name"
                            placeholder=""
                          />
                        </div>
                      </div> */}

                      {/* <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="company_name">Country</label>
                          <select className="form-control">
                            <option value="">Select an Option</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                          </select>
                        </div>
                      </div> */}

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="street">Street Address</label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="street"
                            placeholder=""
                            value={data.street}
                            onChange={(e) =>
                              setData({ ...data, street: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="apartment">
                            Apartment, suite, unit etc. (optional) (optional)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="apartment"
                            placeholder="Apartment"
                            value={data.apartment}
                            onChange={(e) =>
                              setData({ ...data, apartment: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="spl">Town / City </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="spl"
                            placeholder="Apartment"
                            value={data.town}
                            onChange={(e) =>
                              setData({ ...data, town: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="District">District </label>
                          <select
                            required
                            value={data.dis}
                            onChange={(e) =>
                              setData({ ...data, dis: e.target.value })
                            }
                            id="District"
                            className="form-control"
                          >
                            <option value="">Select an Option</option>
                            <option value="Angul">Angul</option>
                            <option selected value="Balasore">
                              Balasore
                            </option>
                            <option value="Mayurbhanj">Mayurbhanj</option>
                            <option value="Bolganir">Bolganir</option>
                            <option value="Boudh">Boudh</option>
                            <option value="Bargarh">Bargarh</option>
                            <option value="Bhadrak">Bhadrak</option>
                            <option value="Cuttak">Cuttak</option>
                            <option value="Deogarh">Deogarh</option>
                            <option value="Dhenkanal">Dhenkanal</option>
                            <option value="Gajapati">Gajapati</option>
                            <option value="Jagatsinghpur">Jagatsinghpur</option>
                            <option value="Kalakhandi">Kalakhandi</option>
                            <option value="Jharsuguda">Jharsuguda</option>
                            <option value="Nayagarh">Nayagarh</option>
                            <option value="Sundargarh">Sundargarh</option>
                            <option value="Rayagada">Rayagada</option>
                            <option value="Puri">Puri</option>
                            <option value="Kendrapara">Kendrapara</option>
                            <option value="Koraput">Koraput</option>
                            <option value="Khurda">Khurda</option>
                            <option value="Malkangirir">Malkangirir</option>
                            <option value="Ganjam">Ganjam</option>
                            <option value="Sonepur">Sonepur</option>
                            <option value="Sambalpur">Sambalpur</option>
                            <option value="Kandahmal">Kandahmal</option>
                            <option value="Nabarangapur">Nabarangapur</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="postcode">
                            Postcode / ZIP (optional)
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="postcode"
                            placeholder=""
                            value={data.pin}
                            onChange={(e) =>
                              setData({ ...data, pin: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="phone">Phone </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder=""
                            value={data.phone}
                            onChange={(e) =>
                              setData({ ...data, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="email">Email address </label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder=""
                            value={data.email}
                          />
                        </div>
                      </div>

                      {/* <div className="col-lg-12">
                        <div className="form-check mb-4">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            Create an account?
                          </label>
                        </div>
                      </div> */}
                      {/* <div className="col-lg-12">
                        <div className="form-check mb-4">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck2"
                          >
                            Ship to a different address?
                          </label>
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="msg">Order notes (optional)</label>
                          <textarea
                            className="form-control"
                            id="msg"
                            cols="30"
                            rows="5"
                            placeholder="Notes about order e:g: want to say something"
                            value={data.msg}
                            onChange={(e) =>
                              setData({ ...data, msg: e.target.value })
                            }
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="product-checkout-details mt-5 mt-lg-0">
                  <h4 className="mb-4 border-bottom pb-4">Order Summary</h4>
                  {location.state?.details.map((data) => {
                    return (
                      <div className="media product-card">
                        <p>{data.name}</p>
                        <div className="media-body text-right">
                          <p className="h5">₹{data.sPrice}</p>
                        </div>
                      </div>
                    );
                  })}
                  <ul className="summary-prices list-unstyled mb-4">
                    <li className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span className="h5">₹{location.state?.total}</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span className="h5">Free</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>Total</span>
                      <span className="h5">₹{location.state?.total}</span>
                    </li>
                  </ul>
                  <form action="#">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Direct bank transfer
                      </label>

                      {/* <div className="alert alert-secondary mt-3" role="alert">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </div> */}
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios2"
                      >
                        Check payments
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck3"
                      >
                        I have read and agree to the website terms and
                        conditions *
                      </label>
                    </div>
                  </form>
                  <div className="info mt-4 border-top pt-4 mb-5">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{" "}
                    <a href="#">privacy policy</a>.
                  </div>
                  {loading ? (
                    <div
                      style={{
                        position: "relative",
                        left: "35%",
                        width: "100px",
                      }}
                    >
                      <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="MagnifyingGlass-loading"
                        wrapperStyle={{}}
                        wrapperClass="MagnifyingGlass-wrapper"
                        glassColor="#c0efff"
                        color="#e15b64"
                      />
                      <p>Placing order...</p>
                    </div>
                  ) : (
                    <>
                      <a
                        onClick={(e) => handleOrder(e)}
                        className="btn btn-main btn-small"
                      >
                        Place Order
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="coupon-modal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content py-5">
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Coupon Code"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-main btn-small"
                  data-dismiss="modal"
                >
                  Apply Coupon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
