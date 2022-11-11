import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [women, setWomen] = useState([]);
  const [men, setMen] = useState([]);
  const [boy, setBoy] = useState([]);
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
          setData(res.data);
          const women = res.data.filter((ss) => ss.catagory == "women");
          setWomen(women);
          const men = res.data.filter((ss) => ss.catagory == "shirt");
          setMen(men);
          const boy = res.data.filter((ss) => ss.catagory == "boy");
          setBoy(boy);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id, e) => {
    alert("Are you sure you want to delete this item.");
    e.preventDefault();
    const url = `http://localhost/all/shopnow/deleteProduct.php?delete=${id}`;
    axios
      .post(url)
      .then((res) => {
        if (res.data === "Success") {
          notify("Deleted successfully");
        } else {
          notify(res.data);
        }
        fetchData();
      })
      .catch((err) => alert(err));
  };

  const handleEdit = (id, e) => {
    e.preventDefault();
    // console.log(id);
    navigate("/admin/edit", { state: { id: id } });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="wrapper">
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
        <div className="pricing-table group">
          <h1 className="heading">Dashboard</h1>
          <h1>Women</h1>

          <div className="row col-md-12">
            {women.map((data) => {
              return (
                <div key={data.id} className="block personal fl">
                  <h2 className="title">₹{data.sPrice}</h2>

                  <div className="content">
                    <img
                      height={400}
                      src={require(`../photos/${
                        data.mainImage ? data.mainImage : "dummy.png"
                      }`)}
                      alt="Loading..."
                    />
                    <div className="row col-md-12">
                      <div className="col-md-6">
                        <img
                          height={100}
                          src={require(`../photos/${
                            data.subImage1 ? data.subImage1 : "dummy.png"
                          }`)}
                          alt="Loading..."
                        />
                      </div>
                      <div className="col-md-6">
                        <img
                          height={100}
                          src={require(`../photos/${
                            data.subImage2 ? data.subImage2 : "dummy.png"
                          }`)}
                          alt="Loading..."
                        />
                      </div>
                    </div>
                  </div>

                  <ul className="features">
                    <li>
                      <span className="fontawesome-cog"></span>
                      {data.name}
                    </li>
                    <li>
                      <span className="fontawesome-star"></span>
                      Display Price:₹ {data.dPrice}
                    </li>
                    <li>
                      <span className="fontawesome-dashboard"></span>
                      Selling price: ₹{data.sPrice}
                    </li>
                    <li>
                      <span className="fontawesome-cloud"></span>
                      {data.disc}
                    </li>
                  </ul>

                  <div className="pt-footer row col-md-13">
                    <div
                      style={{ cursor: "pointer" }}
                      className="btn btn-danger col-md-6 "
                      onClick={(e) => handleDelete(data.id, e)}
                    >
                      Delete
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="btn btn-primary col-md-6"
                      onClick={(e) => handleEdit(data.id, e)}
                    >
                      Edit
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <h1>Men</h1>
          <div className="row col-md-12 mt-5">
            {men.map((data) => {
              return (
                <div key={data.id} className="block professional fl">
                  <h2 className="title">₹{data.sPrice}</h2>

                  <div className="content">
                    <img
                      height={400}
                      src={require(`../photos/${
                        data.mainImage ? data.mainImage : "dummy.png"
                      }`)}
                      alt="Loading..."
                    />
                    <div className="row col-md-12">
                      <div className="col-md-6">
                        <img
                          height={100}
                          src={require(`../photos/${
                            data.subImage1 ? data.subImage1 : "dummy.png"
                          }`)}
                          alt="Loading..."
                        />
                      </div>
                      <div className="col-md-6">
                        <img
                          height={100}
                          src={require(`../photos/${
                            data.subImage2 ? data.subImage2 : "dummy.png"
                          }`)}
                          alt="Loading..."
                        />
                      </div>
                    </div>
                  </div>

                  <ul className="features">
                    <li>
                      <span className="fontawesome-cog"></span>
                      {data.name}
                    </li>
                    <li>
                      <span className="fontawesome-star"></span>
                      Display Price:₹ {data.dPrice}
                    </li>
                    <li>
                      <span className="fontawesome-dashboard"></span>
                      Selling price: ₹{data.sPrice}
                    </li>
                    <li>
                      <span className="fontawesome-cloud"></span>
                      {data.disc}
                    </li>
                  </ul>

                  <div className="pt-footer row col-md-13">
                    <div
                      style={{ cursor: "pointer" }}
                      className="btn btn-danger col-md-6 "
                      onClick={(e) => handleDelete(data.id, e)}
                    >
                      Delete
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="btn btn-primary col-md-6"
                      onClick={(e) => handleEdit(data.id, e)}
                    >
                      Edit
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h1>Boy</h1>
          <div className="row col-md-12 mt-5">
            {boy.map((data) => {
              return (
                <div key={data.id} className="block business fl">
                  <h2 className="title">₹{data.sPrice}</h2>

                  <div className="content">
                    <img
                      height={400}
                      src={require(`../photos/${
                        data.mainImage ? data.mainImage : "dummy.png"
                      }`)}
                      alt="Loading..."
                    />
                    <div className="row col-md-12">
                      <div className="col-md-6">
                        <img
                          height={100}
                          src={require(`../photos/${
                            data.subImage1 ? data.subImage1 : "dummy.png"
                          }`)}
                          alt="Loading..."
                        />
                      </div>
                      <div className="col-md-6">
                        <img
                          height={100}
                          src={require(`../photos/${
                            data.subImage2 ? data.subImage2 : "dummy.png"
                          }`)}
                          alt="Loading..."
                        />
                      </div>
                    </div>
                  </div>

                  <ul className="features">
                    <li>
                      <span className="fontawesome-cog"></span>
                      {data.name}
                    </li>
                    <li>
                      <span className="fontawesome-star"></span>
                      Display Price:₹ {data.dPrice}
                    </li>
                    <li>
                      <span className="fontawesome-dashboard"></span>
                      Selling price: ₹{data.sPrice}
                    </li>
                    <li>
                      <span className="fontawesome-cloud"></span>
                      {data.disc}
                    </li>
                  </ul>

                  <div className="pt-footer row col-md-13">
                    <div
                      style={{ cursor: "pointer" }}
                      className="btn btn-danger col-md-6 "
                      onClick={(e) => handleDelete(data.id, e)}
                    >
                      Delete
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="btn btn-primary col-md-6"
                      onClick={(e) => handleEdit(data.id, e)}
                    >
                      Edit
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="block business fl">
              <h2 className="title">Business</h2>

              <div className="content">
                <p className="price">
                  <sup>$</sup>
                  <span>249</span>
                  <sub>/mo.</sub>
                </p>
                <p className="hint">For established business</p>
              </div>

              <ul className="features">
                <li>
                  <span className="fontawesome-cog"></span>25 WordPress Install
                </li>
                <li>
                  <span className="fontawesome-star"></span>400,000 visits/mo.
                </li>
                <li>
                  <span className="fontawesome-dashboard"></span>Unlimited Data
                  Transfer
                </li>
                <li>
                  <span className="fontawesome-cloud"></span>30GB Local Storage
                </li>
              </ul>

              <div className="pt-footer">
                <p>Host My Website</p>
              </div>
            </div>
            <div className="block business fl">
              <h2 className="title">Business</h2>

              <div className="content">
                <p className="price">
                  <sup>$</sup>
                  <span>249</span>
                  <sub>/mo.</sub>
                </p>
                <p className="hint">For established business</p>
              </div>

              <ul className="features">
                <li>
                  <span className="fontawesome-cog"></span>25 WordPress Install
                </li>
                <li>
                  <span className="fontawesome-star"></span>400,000 visits/mo.
                </li>
                <li>
                  <span className="fontawesome-dashboard"></span>Unlimited Data
                  Transfer
                </li>
                <li>
                  <span className="fontawesome-cloud"></span>30GB Local Storage
                </li>
              </ul>

              <div className="pt-footer">
                <p>Host My Website</p>
              </div>
            </div>
            <div className="block business fl">
              <h2 className="title">Business</h2>

              <div className="content">
                <p className="price">
                  <sup>$</sup>
                  <span>249</span>
                  <sub>/mo.</sub>
                </p>
                <p className="hint">For established business</p>
              </div>

              <ul className="features">
                <li>
                  <span className="fontawesome-cog"></span>25 WordPress Install
                </li>
                <li>
                  <span className="fontawesome-star"></span>400,000 visits/mo.
                </li>
                <li>
                  <span className="fontawesome-dashboard"></span>Unlimited Data
                  Transfer
                </li>
                <li>
                  <span className="fontawesome-cloud"></span>30GB Local Storage
                </li>
              </ul>

              <div className="pt-footer">
                <p>Host My Website</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
