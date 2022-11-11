import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { json, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

const Edit = () => {
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [choosedMain, setChoosedMain] = useState("");
  const [choosed1, setChoosed1] = useState("");
  const [choosed2, setChoosed2] = useState("");
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [data, setData] = useState({
    name: "",
    dPrice: "",
    sPrice: "",
    mainImage: "",
    subImage1: "",
    subImage2: "",
    disc: "",
    catagory: "",
  });

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
  const externalImage =
    "https://images.unsplash.com/photo-1665686306574-1ace09918530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  const handleLogout = () => {
    removeCookie("admin", { path: "/" });
    navigate("/admin/adminLogin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.dPrice || !data.sPrice || !data.catagory) {
      notify("name dPrice sPrice catagory are required");
    } else {
      const url =
        "http://localhost/all/shopnow/admin.php?edit=" + location.state.id;
      const fData = new FormData();
      fData.append("name", data.name);
      fData.append("dPrice", data.dPrice);
      fData.append("sPrice", data.sPrice);
      fData.append("disc", data.disc);
      fData.append("catagory", data.catagory);
      if (choosedMain) {
        fData.append("choosedMain", choosedMain);
      }
      //   fData.append("subImage1", data.subImage1);
      //   fData.append("subImage2", data.subImage2);
      setLoading(true);

      axios
        .post(url, fData)
        .then((res) => {
          setLoading(false);

          navigate("/admin/dashboard");
          if (res.data === "success") {
            notify("Data edited successfully");
          } else if (res.data === "error") {
            notify("Something went wrong");
          }
        })
        .catch((err) => alert(err));
    }
  };

  const fetchData = () => {
    setLoading(true);
    const url =
      "http://localhost/all/shopnow/dashboard.php?id=" + location.state.id;
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setData({
          name: res.data[0].name,
          dPrice: res.data[0].dPrice,
          sPrice: res.data[0].sPrice,
          mainImage: res.data[0].mainImage,
          subImage1: res.data[0].subImage1,
          subImage2: res.data[0].subImage2,
          disc: res.data[0].disc,
          catagory: res.data[0].catagory,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!cookies.admin) {
      navigate("/admin/adminLogin");
    }
    fetchData();
  }, []);

  return (
    <>
      <section className="ftco-section">
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
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">
                Edit <span>Page</span>
              </h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row mb-5 d-flex justify-content-center">
                  <div className="col-md-4">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-comment"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span> Orders</span>
                          <a href="user_msg.php"> From users.</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4" id="mobile">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-mobile"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Add:</span>
                          <Link to="/admin/admin">Dress details</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-3" id="other">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-headphones"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Add:</span>Other items
                        </p>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-md-4">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>dashboard</span>
                          <Link to="/admin/dashboard">Menage your details</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row no-gutters" id="top_mob">
                  <div className="col-md-7">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3 className="mb-4">Edit Products</h3>

                      <form id="contactFormm" className="contactForm">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="name">
                                Dress Name
                              </label>
                              <input
                                required
                                type="text"
                                className="form-control"
                                name="phone_name"
                                id="name"
                                placeholder="Name *"
                                value={data.name}
                                onChange={(e) =>
                                  setData({ ...data, name: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="email">
                                Diplay price
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                name="dprice"
                                id="email"
                                placeholder="Diplay Price *"
                                value={data.dPrice}
                                onChange={(e) =>
                                  setData({ ...data, dPrice: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="subject">
                                Selling price
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                name="sprice"
                                id="subject"
                                placeholder="Selling price *"
                                value={data.sPrice}
                                onChange={(e) =>
                                  setData({ ...data, sPrice: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="subjectt">
                                Main image
                              </label>
                              <input
                                type="file"
                                required
                                className="form-control"
                                name="photo"
                                id="subjectt"
                                accept="image/*"
                                // value={data.mainImage}
                                onChange={(e) => {
                                  setData({
                                    ...data,
                                    mainImage: e.target.files[0],
                                  });
                                  setChoosedMain(e.target.files[0]);
                                  e.target.value = null;
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              {/* <label className="label" htmlFor="subjecttt">
                                `` Sub image
                              </label> */}
                              <input
                                style={{ display: "none" }}
                                type="file"
                                className="form-control"
                                name="subp2"
                                id="subjecttt"
                                accept="image/*"
                                // value={data.subImage1}
                                onChange={(e) => {
                                  setData({
                                    ...data,
                                    subImage1: e.target.files[0],
                                  });
                                  setChoosed1(e.target.files[0]);
                                  e.target.value = null;
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              {/* <label className="label" htmlFor="subjec">
                                Sub image
                              </label> */}
                              <input
                                style={{ display: "none" }}
                                type="file"
                                className="form-control"
                                name="subp3"
                                id="subjec"
                                accept="image/*"
                                // value={data.subImage2}
                                onChange={(e) => {
                                  setData({
                                    ...data,
                                    subImage2: e.target.files[0],
                                  });
                                  setChoosed2(e.target.files[0]);
                                  e.target.value = null;
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="#">
                                Short discription
                              </label>
                              <textarea
                                name="sdip"
                                required
                                className="form-control"
                                maxLength="140"
                                id="message"
                                cols="30"
                                rows="2"
                                placeholder="Write somethimg within 50 words *"
                                value={data.disc}
                                onChange={(e) =>
                                  setData({ ...data, disc: e.target.value })
                                }
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="#">
                                Catagory
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                name="dprice"
                                id="email"
                                placeholder="eg:-pent,shirt,women,saree,boy,girl"
                                value={data.catagory}
                                onChange={(e) =>
                                  setData({ ...data, catagory: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <button
                                onClick={(e) => handleSubmit(e)}
                                name="submit_mobile"
                                className="btn btn-primary"
                              >
                                Edit
                              </button>
                              <div className="submitting"></div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-stretch">
                    <div
                      className="info-wrap w-100 p-5 img"
                      style={{
                        backgroundImage: `url(${
                          choosedMain
                            ? URL.createObjectURL(choosedMain)
                            : data.mainImage &&
                              require(`../photos/${data.mainImage}`)
                        })`,
                        // backgroundImage: `url(${require(`../photos/111.jpg`)})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        height: "80%",
                      }}
                    ></div>
                  </div>
                  <div className="row col-md-12 ml-5">
                    <div className="col-md-6">
                      <div
                        className="info-wrap w-100 p-5 img"
                        style={{
                          backgroundImage: `url(${
                            choosed1
                              ? URL.createObjectURL(choosed1)
                              : data.subImage1 &&
                                require(`../photos/${data.subImage1}`)
                          })`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          height: "300px",
                          width: "500px",
                        }}
                      >
                        Sub images are not editable, you can delete the whole
                        data and re add this images
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="info-wrap w-100 p-5 img"
                        style={{
                          backgroundImage: `url(${
                            choosed2
                              ? URL.createObjectURL(choosed2)
                              : data.subImage2 &&
                                require(`../photos/${data.subImage2}`)
                          })`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          height: "300px",
                          width: "500px",
                        }}
                      >
                        Sub images are not editable, you can delete the whole
                        data and re add this images
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p onClick={() => handleLogout()} className="btn btn-info mt-4">
              Logout
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Edit;
