import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LoginPage ({onLogin}) {

    const [userDetails, setuserDetails] = useState({
        useremail: "",
        loginPassword: "",
        redirectToReferrer: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserDetails((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };


    const loginButton = async (e) => {debugger
        e.preventDefault();
        // Check if email and password are not empty
        if (!userDetails.useremail || !userDetails.loginPassword) {
          alert("Please enter both email and password.");
          return;
        }
        try {
          const response = await fetch(
            "http://localhost:8000/api/user/checkUserDetails",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userDetails),
            }
          );
          if (response.status === 200) {debugger
            alert("Login successful!");
            localStorage.setItem("userID", userDetails.useremail)
            onLogin();
            setuserDetails((prevInfo) => ({
              ...prevInfo,
              redirectToReferrer: true,
            }));
          } else {
            alert("User not found. Please register.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        }
      };
      if (userDetails.redirectToReferrer) {
        return <Navigate to="/" />;
      }

    return (
      <div className="box" style={{width:'550px' ,marginTop:'25px'}}>

      <div className="container" style={{width:'500px'}}>
          <h2 style={{textAlign:"center"}}>Login</h2>
          <form onSubmit={loginButton}>
              <div className="form-group">
                  <label htmlFor="useremail">Email:</label>
                  <input
                      type="email"
                      className="form-control"
                      id="useremail"
                      name="useremail"
                      value={userDetails.useremail}
                      onChange={handleChange}
                      placeholder="Please enter your email"
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="loginPassword">Password:</label>
                  <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      name="loginPassword"
                      value={userDetails.loginPassword}
                      onChange={handleChange}
                      placeholder="Please enter your password"
                  />
              </div>
              <div style={{textAlign:"center", margin:'20px'}}>

              <button type="submit" className="btn btn-primary" style={{width:'150px'}} >
                  Login
              </button>
              </div>
              <div style={{textAlign:"center", margin:'20px'}} >

              <Link to="/YourProfile" className="btn btn-link" >
                  New User? Register
              </Link>
              </div>
          </form>
      </div>
      </div>
  
    )
}

export default LoginPage;
