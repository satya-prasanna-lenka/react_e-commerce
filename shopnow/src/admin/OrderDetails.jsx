import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import { json, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [allData, setAllData] = useState([]);
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
    const url = "http://localhost/all/shopnow/orderDetails.php";
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        if (res.data === "No data available") {
          notify(res.data);
          setData([]);
        } else {
          setData(res.data);
          //   res.data?.map((data) => {
          //     console.log(JSON.parse(data.orderDetails));
          //   });
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchallData = () => {
    setLoading(true);

    const url = "http://localhost/all/shopnow/dashboard.php";
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        if (res.data === "No data available") {
          notify(res.data);
        } else {
          setAllData(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        notify("Network connection failed");
      });
  };

  const handleDelete = (id, e) => {
    // alert("Are you sure you want to delete this item.");
    e.preventDefault();
    const url = `http://localhost/all/shopnow/orderDetails.php?id=${id}`;
    axios
      .post(url)
      .then((res) => {
        if (res.data === "success") {
          notify("Deleted successfully");
        } else {
          notify(res.data);
        }
        fetchData();
      })
      .catch((err) => alert(err));
  };

  //   const handleEdit = (id, e) => {
  //     e.preventDefault();
  //     // console.log(id);
  //     navigate("/admin/edit", { state: { id: id } });
  //   };

  useEffect(() => {
    fetchData();
    fetchallData();
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
          <h1>Orders</h1>

          <div className="row col-md-12">
            {data?.map((data) => {
              return (
                <div key={data.id} className="block personal fl">
                  <h2 className="title">{data.name}</h2>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "500px",
                      overflow: "scroll",
                      overflowX: "hidden",
                    }}
                    className="content"
                  >
                    {/* <img
                      height={400}
                      src={require(`../photos/${
                        data.mainImage ? data.mainImage : "dummy.png"
                      }`)}
                      alt="Loading..."
                    /> */}
                    {JSON.parse(data.orderDetails)?.map((spl) => {
                      const ss = allData?.filter((kli) => kli.id === spl.id);
                      // console.log(ss);
                      // console.log(spl);
                      return (
                        <>
                          <div
                            style={{
                              border: "2px solid blue",
                              borderRadius: 5,
                              padding: 10,
                              width: "90%",
                            }}
                          >
                            <strong> {ss[0]?.name}</strong>
                            <p>Catagory{ss[0]?.catagory}</p>
                            <h5>Qty :{spl.qty}</h5>
                            <h6>Size :{spl.size}</h6>
                            <h6>Price :{ss[0]?.sPrice}</h6>
                          </div>
                        </>
                      );
                    })}
                    {/* <div className="row col-md-12">
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
                    </div> */}
                  </div>

                  <ul className="features">
                    <li>
                      <span className="fontawesome-cog"></span>
                      {data.email}
                    </li>
                    <li>
                      <span className="fontawesome-star"></span>
                      Address: {data.dis},{data.town},{data.apartment},
                      {data.street},{data.pin}
                    </li>
                    <li>
                      <span className="fontawesome-dashboard"></span>
                      Phone: {data.phone}
                    </li>
                    <li>
                      <span className="fontawesome-cloud">Total payment</span>₹
                      {data.total}
                    </li>{" "}
                    <li>
                      <span className="fontawesome-cloud">Date</span>
                      {data.date}
                    </li>
                    <li>
                      <span></span>
                      {data.msg}
                    </li>
                  </ul>

                  <div className="pt-footer row col-md-13">
                    <div
                      title="Pressing ir, will not give you a second chance to recover⚠"
                      style={{ cursor: "pointer" }}
                      className="btn btn-danger col-md-12 "
                      onClick={(e) => handleDelete(data.id, e)}
                    >
                      Delete
                    </div>
                    {/* <div
                      style={{ cursor: "pointer" }}
                      className="btn btn-primary col-md-6"
                      onClick={(e) => handleEdit(data.id, e)}
                    >
                      Edit
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>

          {/* <h1>Men</h1>
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
          </div> */}
          {/* <h1>Boy</h1>
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
