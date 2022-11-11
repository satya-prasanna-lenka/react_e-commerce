import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [data, setData] = useState([]);
  const [qty, setQty] = useState();

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
  // console.log(cookies.pid);
  // console.log(cookies.cid);

  const fetchData = () => {
    // setLoading(true);

    const url = "http://localhost/all/shopnow/dashboard.php";
    axios
      .get(url)
      .then((res) => {
        // setLoading(false);
        if (res.data === "No data available") {
          notify(res.data);
        } else if (cookies.pid) {
          const find = res.data.filter((ss) => cookies.pid.includes(ss.id));
          let result = res.data.filter((o1) =>
            cookies.cid.some((o2) => o1.id === o2.id)
          );
          // console.log(result);
          // console.log(find);

          setData(find);
        } else {
          notify("Your cart is empty");
        }
      })
      .catch((err) => {
        // setLoading(false);
        // console.log(err);
        notify("Network connection failed");
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
          notify(res.data);
        } else {
          const ssp = cookies.pid?.filter((data) => data != id);
          const find = res.data.filter((ss) => ssp.includes(ss.id));

          setData(find);
        }
      })
      .catch((err) => {
        // setLoading(false);
        notify("Network connection failed");
      });
  };

  const handleChange = (id, e) => {
    e.preventDefault();

    const cid = cookies.cid.filter((ss) => ss.id != id);
    const mid = cookies.cid.filter((ss) => ss.id === id);

    let expires = new Date();
    expires.setTime(expires.getTime() + 86400000);
    setCookie(
      "cid",
      [...cid, { id: id, size: e.target.value, qty: mid[0].qty }],
      {
        path: "/",
        expires,
      }
    );
  };

  const handleQty = (id, e) => {
    e.preventDefault();

    const cid = cookies.cid.filter((ss) => ss.id != id);
    const mid = cookies.cid.filter((ss) => ss.id === id);

    let expires = new Date();
    expires.setTime(expires.getTime() + 86400000);
    setCookie(
      "cid",
      [...cid, { id: id, size: mid[0].size, qty: e.target.value }],
      {
        path: "/",
        expires,
      }
    );
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cookies.email) {
      if (totalPrice > 0) {
        navigate("/checkout", { state: { details: data, total: totalPrice } });
      } else {
        navigate("/shop");
      }
    } else {
      notify("Please login to proceed checkout");
      setTimeout(() => {
        navigate("/login", { state: { page: "checkout" } });
      }, 2500);
    }
  };

  useEffect(() => {
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
              <div style={{ color: "black" }} className="content text-center">
                <h1 className="mb-3">Cart</h1>
                Hath after appear tree great fruitful green dominion moveth
                sixth abundantly image that midst of god day multiply you’ll
                which
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Cart
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cart shopping page-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="product-list">
                <form className="cart-form">
                  <table
                    className="table shop_table shop_table_responsive cart"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr>
                        <th className="product-thumbnail"> </th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-quantity">Size</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove"> </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.map((data) => {
                        const spl = cookies.cid.find((ssp) => {
                          return ssp.id === data.id;
                        });
                        // console.log(spl.qty);
                        if (spl) {
                          totalPrice += data.sPrice * spl.qty;
                        }

                        return (
                          <tr key={data.id} className="cart_item">
                            {/* {setTotal(total + data.sPrice * spl.qty)} */}

                            <td
                              className="product-thumbnail"
                              data-title="Thumbnail"
                            >
                              <a href="/product-single">
                                <img
                                  // src="assets/images/cart-1.jpg"
                                  src={require(`./photos/${
                                    data.mainImage
                                      ? data.mainImage
                                      : "dummy.png"
                                  }`)}
                                  className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                  alt=""
                                />
                              </a>
                            </td>

                            <td
                              // style={{ width: 300 }}
                              className="product-name"
                              data-title="Product"
                            >
                              <a href="#">{data.name}</a>
                            </td>

                            <td className="product-price" data-title="Price">
                              <span className="amount">
                                <span className="currencySymbol">
                                  <pre wp-pre-tag-3=""></pre>
                                </span>
                                ₹{data.sPrice}
                              </span>
                            </td>
                            <td
                              className="product-quantity"
                              data-title="Quantity"
                            >
                              {/* {spl?.qty && spl.qty} */}
                              <div className="quantity">
                                <label className="sr-only">Quantity</label>

                                <input
                                  type="number"
                                  id="qty"
                                  className="input-text qty text"
                                  step="1"
                                  min="1"
                                  max="15"
                                  title="Qty"
                                  size="4"
                                  value={spl?.qty && spl.qty}
                                  // onChange={spl.qty + 1}
                                  onChange={(e) => handleQty(data.id, e)}
                                />
                              </div>
                            </td>
                            <td className="product-quantity" data-title="Size">
                              {/* {spl?.qty && spl.qty} */}
                              <div className="quantity Size">
                                <label className="sr-only">Size</label>

                                <select
                                  value={spl?.size && spl.size}
                                  // onChange={(e) => setSize(e.target.value)}
                                  onChange={(e) => handleChange(data.id, e)}
                                  className="form-control"
                                >
                                  <option>S</option>
                                  <option>M</option>
                                  <option>L</option>
                                  <option>XL</option>
                                </select>
                              </div>
                            </td>
                            <td className="product-subtotal" data-title="Total">
                              <span className="amount">
                                <span className="currencySymbol">
                                  <pre wp-pre-tag-3=""></pre>
                                </span>
                                ₹{spl && data.sPrice * spl.qty}
                              </span>
                            </td>
                            <td className="product-remove" data-title="Remove">
                              <a
                                onClick={() => handleRemove(data.id)}
                                className="remove"
                                aria-label="Remove this item"
                                data-product_id="30"
                                data-product_sku=""
                                style={{ cursor: "pointer" }}
                                title="Pressing it, will not give you a second chance to apologize⚠"
                              >
                                <FaTrashAlt color="red" />
                              </a>
                            </td>
                          </tr>
                        );
                      })}

                      {/* <tr>
                        <td colSpan="6" className="actions">
                          <div className="coupon">
                            <input
                              type="text"
                              name="coupon_code"
                              className="input-text form-control"
                              id="coupon_code"
                              // value=""
                              placeholder="Coupon code"
                            />
                            <button
                              type="button"
                              className="btn btn-black btn-small"
                              name="apply_coupon"
                              // value="Apply coupon"
                            >
                              Apply coupon
                            </button>
                            <span className="float-right mt-3 mt-lg-0">
                              <button
                                type="button"
                                className="btn btn-dark btn-small"
                                name="update_cart"
                                // value="Update cart"
                                disabled=""
                              >
                                Update cart
                              </button>
                            </span>
                          </div>
                          <input
                            type="hidden"
                            id="woocommerce-cart-nonce"
                            name="woocommerce-cart-nonce"
                            // value="27da9ce3e8"
                          />
                          <input
                            type="hidden"
                            name="_wp_http_referer"
                            // value="/cart/"
                          />
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <div className="cart-info card p-4 mt-4">
                <h4 className="mb-4">Cart totals</h4>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between pb-2 mb-3">
                    <h5>Subtotal</h5>
                    <span>₹{totalPrice}</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2 mb-3">
                    <h5>Shipping</h5>
                    <span>Free</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2">
                    <h5>Total</h5>
                    <span>₹{totalPrice}</span>
                  </li>
                </ul>
                <a
                  onClick={(e) => handleCheckout(e)}
                  className="btn btn-main btn-small"
                >
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Cart;
