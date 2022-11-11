import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Puff } from "react-loader-spinner";
import { useCookies } from "react-cookie";

function Home() {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [women, setWomen] = useState([]);
  const [men, setMen] = useState([]);
  const [pid, setPid] = useState([]);

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
    setLoading(true);

    const url = "http://localhost/all/shopnow/dashboard.php";
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        if (res.data === "No data available") {
          notify(res.data);
        } else {
          setData(res.data.reverse());
          const women = res.data.filter((ss) => ss.catagory == "women");
          setWomen(women.reverse());
          const men = res.data.filter((ss) => ss.catagory == "shirt");
          setMen(men.reverse());
        }
      })
      .catch((err) => {
        setLoading(false);
        notify("Network connection failed");
      });
  };

  const handelSingle = (id, e) => {
    e.preventDefault();

    navigate("/single-product", { state: { id: id } });
  };

  const handleCart = (id, e) => {
    e.preventDefault();

    if (cookies.pid) {
      const ss = cookies.pid?.filter((spl) => spl === id);
      // console.log(ss);

      if (ss?.length > 0) {
        notify("This item is already in cart");
      } else {
        const ss = [...cookies.pid, id];
        let expires = new Date();
        expires.setTime(expires.getTime() + 86400000);
        setCookie("pid", ss, {
          path: "/",
          expires,
        });
        setCookie("cid", [...cookies.cid, { id: id, size: "M", qty: "1" }], {
          path: "/",
          expires,
        });
        navigate("/cart");
      }
    } else {
      const ss = [id];
      let expires = new Date();
      expires.setTime(expires.getTime() + 86400000);
      setCookie("pid", ss, { path: "/", expires });
      setCookie("cid", [{ id: id, size: "M", qty: "1" }], {
        path: "/",
        expires,
      });
      navigate("/cart");
    }
  };
  // console.log(cookies.pid);
  // console.log(pid);
  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [navigate]);
  return (
    <div className="home-container">
      <div className="main-slider slider slick-initialized slick-slider">
        <div
          className="slider-item"
          style={{
            backgroundImage: "url('assets/images/slideshow1-2.jpg')",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12 offset-lg-6 offset-md-6">
                <div className="slider-caption">
                  <span className="lead">Trendy dress</span>
                  <h1 className="mt-2 mb-5">
                    <span className="text-color">Winter </span>Collection
                  </h1>
                  <Link to="/shop" className="btn btn-main">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="category section pt-3 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-6">
              <div className="cat-item mb-4 mb-lg-0">
                <img
                  src="assets/images/cat-1.jpg"
                  alt=""
                  className="img-fluid"
                />
                <div className="item-info">
                  <p className="mb-0">Stylish Leather watch</p>
                  <h4 className="mb-4">
                    up to <strong>50% </strong>off
                  </h4>

                  <Link to="#" className="read-more">
                    Shop now
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-12 col-md-6">
              <div className="cat-item mb-4 mb-lg-0">
                <img
                  src="assets/images/cat-2.jpg"
                  alt=""
                  className="img-fluid"
                />

                <div className="item-info">
                  <p className="mb-0">Ladies hand bag</p>
                  <h4 className="mb-4">
                    up to <strong>40% </strong>off
                  </h4>

                  <Link to="#" className="read-more">
                    Shop now
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-12 col-md-6">
              <div className="cat-item">
                <img
                  src="assets/images/cat-3.jpg"
                  alt=""
                  className="img-fluid"
                />
                <div className="item-info">
                  <p className="mb-0">Trendy shoe</p>
                  <h4 className="mb-4">
                    up to <strong>50% </strong>off
                  </h4>

                  <Link to="#" className="read-more">
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section products-main">
        <div style={{ position: "relative" }} className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="title text-center">
                <h2>New arrivals</h2>
                <p>The best Online sales to shop these weekend</p>
              </div>
            </div>
            {loading ? (
              <div
                style={{
                  position: "absolute",
                  // left: "50%",
                  width: "100px",
                  zIndex: "999",
                  top: "55%",
                }}
              >
                <Puff
                  height="80"
                  width="80"
                  radisu={1}
                  color="#FB5C42"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <ToastContainer />
            )}
          </div>
          <div className="row">
            {data?.slice(0, 8).map((data) => {
              return (
                <div
                  key={data.id}
                  className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5"
                >
                  <div className="product">
                    <div className="product-wrap">
                      <Link onClick={(e) => handelSingle(data.id, e)}>
                        {/* <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="assets/images/322.jpg"
                          alt="product-img"
                          /> */}
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          height={400}
                          src={require(`./photos/${
                            data.mainImage ? data.mainImage : "dummy.png"
                          }`)}
                          alt="Loading..."
                        />
                      </Link>
                      <Link onClick={(e) => handelSingle(data.id, e)}>
                        {/* <img
                          className="img-fluid w-100 mb-3 img-second"
                          src="assets/images/444.jpg"
                          alt="product-img"
                          /> */}
                        <img
                          className="img-fluid w-100 mb-3 img-second"
                          height={400}
                          src={require(`./photos/${
                            data.subImage1 ? data.subImage1 : "dummy.png"
                          }`)}
                          alt="Loading..."
                        />
                      </Link>
                    </div>

                    {/* <span className="onsale">Sale</span> */}
                    <div className="product-hover-overlay">
                      <Link onClick={(e) => handleCart(data.id, e)}>
                        <i className="tf-ion-android-cart"></i>
                      </Link>
                      <Link to="#">
                        <i className="tf-ion-ios-heart"></i>
                      </Link>
                    </div>

                    <div className="product-info">
                      <h2 className="product-title h5 mb-0">
                        <Link to="#">{data.name}</Link>
                      </h2>
                      <div className="row col-md-12">
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "red",
                          }}
                          className="price col-md-6"
                        >
                          ₹{data.dPrice}
                        </span>
                        <span className="price col-md-6 text-success">
                          ₹{data.sPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <Link to="/product-single">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="assets/images/111.jpg"
                      alt="product-img"
                    />
                  </Link>
                  <Link to="/product-single">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="assets/images/444.jpg"
                      alt="product-img"
                    />
                  </Link>
                </div>

                <div className="product-hover-overlay">
                  <Link to="#">
                    <i className="tf-ion-android-cart"></i>
                  </Link>
                  <Link to="#">
                    <i className="tf-ion-ios-heart"></i>
                  </Link>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <Link to="#">Open knit switer</Link>
                  </h2>
                  <span className="price">$29.10</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <Link to="/product-single">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="assets/images/222.jpg"
                      alt="product-img"
                    />
                  </Link>
                  <Link to="/product-single">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="assets/images/322.jpg"
                      alt="product-img"
                    />
                  </Link>
                </div>

                <span className="onsale">Sale</span>
                <div className="product-hover-overlay">
                  <Link to="#">
                    <i className="tf-ion-android-cart"></i>
                  </Link>
                  <Link to="#">
                    <i className="tf-ion-ios-heart"></i>
                  </Link>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <Link to="#">Official trendy</Link>
                  </h2>
                  <span className="price">$350.00 – $355.00</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <Link to="/product-single">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="assets/images/322.jpg"
                      alt="product-img"
                    />
                  </Link>
                  <Link to="/product-single">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="assets/images/111.jpg"
                      alt="product-img"
                    />
                  </Link>
                </div>

                <div className="product-hover-overlay">
                  <Link to="#">
                    <i className="tf-ion-android-cart"></i>
                  </Link>
                  <Link to="#">
                    <i className="tf-ion-ios-heart"></i>
                  </Link>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <Link to="#">Frock short</Link>
                  </h2>
                  <span className="price">$249</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <Link to="#">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="assets/images/444.jpg"
                      alt="product-img"
                    />
                  </Link>
                  <Link to="#">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="assets/images/222.jpg"
                      alt="product-img"
                    />
                  </Link>
                </div>

                <div className="product-hover-overlay">
                  <Link to="#">
                    <i className="tf-ion-android-cart"></i>
                  </Link>
                  <Link to="#">
                    <i className="tf-ion-ios-heart"></i>
                  </Link>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <Link to="#">Sleeve dress</Link>
                  </h2>
                  <span className="price">$59.10</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <Link to="#">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="assets/images/322.jpg"
                      alt="product-img"
                    />
                  </Link>
                  <Link to="#">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="assets/images/222.jpg"
                      alt="product-img"
                    />
                  </Link>
                </div>

                <div className="product-hover-overlay">
                  <Link to="#">
                    <i className="tf-ion-android-cart"></i>
                  </Link>
                  <Link to="#">
                    <i className="tf-ion-ios-heart"></i>
                  </Link>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <Link to="#">Stylish dress</Link>
                  </h2>
                  <span className="price">$99.00</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5 ">
              <div className="product">
                <div className="product-wrap">
                  <Link to="#">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="assets/images/111.jpg"
                      alt="product-img"
                    />
                  </Link>
                  <Link to="#">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="assets/images/444.jpg"
                      alt="product-img"
                    />
                  </Link>
                </div>

                <div className="product-hover-overlay">
                  <Link to="#">
                    <i className="tf-ion-android-cart"></i>
                  </Link>
                  <Link to="#">
                    <i className="tf-ion-ios-heart"></i>
                  </Link>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <Link to="#">Body suite</Link>
                  </h2>
                  <span className="price">$329.10</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5 ">
              <div className="product">
                <div className="product-wrap">
                  <Link to="#">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="assets/images/222.jpg"
                      alt="product-img"
                    />
                  </Link>
                  <Link to="#">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="assets/images/322.jpg"
                      alt="product-img"
                    />
                  </Link>
                </div>

                <div className="product-hover-overlay">
                  <Link to="#">
                    <i className="tf-ion-android-cart"></i>
                  </Link>
                  <Link to="#">
                    <i className="tf-ion-ios-heart"></i>
                  </Link>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <Link to="#">Sleeve linen shirt</Link>
                  </h2>
                  <span className="price">
                    <del>
                      60<pre wp-pre-tag-3=""></pre>
                    </del>
                    $50.10
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="ads section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 offset-lg-6">
              <div className="ads-content">
                <span className="h5 deal">Deal of the day 50% Off</span>
                <h2 className="mt-3 text-white">Trendy Suit</h2>
                <p className="text-md mt-3 text-white">
                  Hurry up! Limited time offer.Grab ot now!
                </p>

                <div id="simple-timer" className="syotimer mb-5"></div>
                <Link to="/shop" className="btn btn-main">
                  <i className="ti-bag mr-2"></i>Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section products-list">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-12">
              <img
                src="assets/images/adsv.jpg"
                alt="Product big thumb"
                className="img-fluid w-100"
              />
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="widget-featured-entries mt-5 mt-lg-0">
                <h4 className="mb-4 pb-3">Men Items</h4>

                {men?.slice(0, 5).map((data) => {
                  return (
                    <div key={data.id} className="media mb-3">
                      <Link
                        className="featured-entry-thumb"
                        onClick={(e) => handelSingle(data.id, e)}
                      >
                        <img
                          className="img-fluid mr-3"
                          src={require(`./photos/${
                            data.mainImage ? data.mainImage : "dummy.png"
                          }`)}
                          width="64"
                          alt="Loading..."
                        />
                        {/* <img
                          src="assets/images/p-1.jpg"
                          alt="Product thumb"
                          className="img-fluid mr-3"
                        /> */}
                      </Link>
                      <div className="media-body">
                        <h6 className="featured-entry-title mb-0">
                          <Link onClick={(e) => handelSingle(data.id, e)}>
                            {data.name}
                          </Link>
                        </h6>
                        <div className="row col-md-12">
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "red",
                            }}
                            className="price col-md-3"
                          >
                            ₹{data.dPrice}
                          </span>
                          <span className="price col-md-3 text-success">
                            ₹{data.sPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="media mb-3">
                  <Link className="featured-entry-thumb" to="#">
                    <img
                      src="assets/images/p-2.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link to="#">Nike - Brasilia Medium Backpack</Link>
                    </h6>
                    <p className="featured-entry-meta">$27.99</p>
                  </div>
                </div>

                <div className="media mb-3">
                  <Link className="featured-entry-thumb" to="#">
                    <img
                      src="assets/images/p-3.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link to="#">Guess - GU7295</Link>
                    </h6>
                    <p>$38.00</p>
                  </div>
                </div>

                <div className="media mb-3">
                  <Link className="featured-entry-thumb" to="#">
                    <img
                      src="assets/images/p-4.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link to="#">Adidas Originals Cap</Link>
                    </h6>
                    <p className="featured-entry-meta">$35.00</p>
                  </div>
                </div>

                <div className="media">
                  <Link className="featured-entry-thumb" to="#">
                    <img
                      src="assets/images/p-5.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link to="#">Big Star Flip Tops</Link>
                    </h6>
                    <p className="featured-entry-meta">$10.60</p>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="widget-featured-entries mt-5 mt-lg-0">
                <h4 className="mb-4 pb-3">Women Items</h4>
                {women?.slice(0, 5).map((data) => {
                  return (
                    <div key={data.id} className="media mb-3">
                      <Link
                        className="featured-entry-thumb"
                        onClick={(e) => handelSingle(data.id, e)}
                      >
                        <img
                          className="img-fluid mr-3"
                          src={require(`./photos/${
                            data.mainImage ? data.mainImage : "dummy.png"
                          }`)}
                          width="64"
                          alt="Loading..."
                        />
                        {/* <img
                          src="assets/images/p-1.jpg"
                          alt="Product thumb"
                          className="img-fluid mr-3"
                        /> */}
                      </Link>
                      <div className="media-body">
                        <h6 className="featured-entry-title mb-0">
                          <Link onClick={(e) => handelSingle(data.id, e)}>
                            {data.name}
                          </Link>
                        </h6>
                        <div className="row col-md-12">
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "red",
                            }}
                            className="price col-md-3"
                          >
                            ₹{data.dPrice}
                          </span>
                          <span className="price col-md-3 text-success">
                            ₹{data.sPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="media mb-3">
                  <Link className="featured-entry-thumb" to="/product-single">
                    <img
                      src="assets/images/p-7.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link to="#">Keds - Kickstart Pom Pom</Link>
                    </h6>
                    <p className="featured-entry-meta">$42.99</p>
                  </div>
                </div>

                <div className="media mb-3">
                  <Link className="featured-entry-thumb" to="#">
                    <img
                      src="assets/images/p-8.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link to="#">Nike - Brasilia Medium Backpack</Link>
                    </h6>
                    <p className="featured-entry-meta">$27.99</p>
                  </div>
                </div>

                <div className="media mb-3">
                  <Link className="featured-entry-thumb" to="#">
                    <img
                      src="assets/images/p-1.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link to="#">Guess - GU7295</Link>
                    </h6>
                    <p>$38.00</p>
                  </div>
                </div>

                <div className="media mb-3">
                  <Link className="featured-entry-thumb" to="#">
                    <img
                      src="assets/images/p-2.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link to="#">Adidas Originals Cap</Link>
                    </h6>
                    <p className="featured-entry-meta">$35.00</p>
                  </div>
                </div>

                <div className="media">
                  <Link className="featured-entry-thumb" to="#">
                    <img
                      src="assets/images/p-4.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </Link>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <Link to="#">Big Star Flip Tops</Link>
                    </h6>
                    <p className="featured-entry-meta">$10.60</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="features border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="feature-block">
                <i className="tf-ion-android-bicycle"></i>
                <div className="content">
                  <h5>Free Shipping</h5>
                  <p>On all order over $39.00</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="feature-block">
                <i className="tf-wallet"></i>
                <div className="content">
                  <h5>30 Days Return</h5>
                  <p>Money back Guarantee</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="feature-block">
                <i className="tf-key"></i>
                <div className="content">
                  <h5>Secure Checkout</h5>
                  <p>100% Protected by paypal</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-md-6">
              <div className="feature-block">
                <i className="tf-clock"></i>
                <div className="content">
                  <h5>24/7 Support</h5>
                  <p>All time customer support </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
