import React, { useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import '../src/App.css';

const YourProfile = ({ isRegi }) => {
  const [userDetails, setuserDetails] = useState({
    username: "",
    userEmail: "",
    password: "",
    userPhoneNumber: "",
    userShippingAddress: "",
  });
  const navigate = useNavigate();

  const assignValue = (e) => {
    const { name, value } = e.target;
    setuserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let message = "";
    if (!userDetails.userEmail) {
      message += "| Email |";
    }
    if (!userDetails.username) {
      message += "| Name | "
    }
    if (!userDetails.password) {
      message += "| password |"
    }
    if (!userDetails.userPhoneNumber) {
      message += "| phone number |"
    }
    if (!userDetails.userShippingAddress) {
      message += "| Shipping Address |"
    }
    if (message !== "") {
      alert("Please Enter " + message);
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:8000/api/user/createGoogleUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );
      if (res.ok) {
        alert("Success");
        navigate('/LoginPage');
      } else {
        alert("Error!! Try Again.")
      }
    }
    catch (e) {
      alert("Server Error!!");
    }
  };

  return (
<div className='box' style={{marginBottom:'150px', marginTop:'25px'}}>
    <div className="container" >
      <h1 style={{textAlign:'center'}}>Register User</h1>
      <form onSubmit={handleSave}>
        <div className="inputfield">
          <label htmlFor='name' className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="username" value={userDetails.username} onChange={assignValue} />
        </div>
        <div className="inputfield">
          <label className="form-label" htmlFor='email'>Email</label>
          <input type="email" className="form-control" id="email" name="userEmail" value={userDetails.userEmail} onChange={assignValue} />
        </div>
        <div className="inputfield">
          <label className="form-label" htmlFor='password'>Password</label>
          <input type="password" className="form-control" id="password" name="password" value={userDetails.password} onChange={assignValue} />
        </div>
        <div className="inputfield">
          <label className="form-label" htmlFor='phoneNumber'>Phone Number</label>
          <input type="tel" className="form-control" name='userPhoneNumber' id="phoneNumber" value={userDetails.userPhoneNumber} onChange={assignValue} />
        </div>
        <div className="inputfield">
          <label className="form-label" htmlFor='StreetAddress'>Shipping Address</label>
          <input type="text" className="form-control" id="StreetAddress" name='userShippingAddress' value={userDetails.userShippingAddress} onChange={assignValue} />
        </div>
        <div style={{textAlign:'center',margin:'20px'}}>
        <Button type="submit" variant="primary" className='btn btn-primary btn-lg' style={{width:'150px'}} >
          Register 
        </Button>
        </div>
        <div style={{textAlign:'center', margin:'20px'}}>

        <Button type="cancel" variant="primary" className='btn btn-primary btn-lg' style={{width:'150px',backgroundColor:'red'}} onClick={()=>{(navigate('/LoginPage'))}} >
          Cancel
        </Button>
        </div>
      </form>
    </div>

</div>
  );
};

export default YourProfile;
