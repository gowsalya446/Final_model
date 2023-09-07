// import React from 'react';

// const Login=()=>{
//     return(
//         <div>This is Login page</div>
//     );
// }

// export default Login;


import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  let location = useLocation();


  console.log(location.pathname);
  const [user, setFormData] = useState({
    username: '',
    password: '',
  });
  function handleSubmit() {

    fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",

      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Parse response as JSON
        } else if (res.status === 400) {
          console.log("Unauthorized request");
          alert("Login Error");
          throw new Error("Unauthorized request");
        } else {
          console.log("Something went wrong");
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
        const { user, Access_token } = data;
        localStorage.setItem("token", Access_token);
        localStorage.setItem("user_details", JSON.stringify(user));
        localStorage.setItem("id", JSON.stringify(user.id));

        alert("Success");
        const users = JSON.parse(localStorage.getItem('user_details'));
        console.log("users:",users)
        const isSuperUser = users && users.is_superuser;
        if(isSuperUser)
        {
          navigate('/')}
        else{
          navigate("/home");
        }
        
      })
      .catch((err) => {
        alert("Check your Username Or Password");
        console.log(err);
      });
  }
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...user, [name]: value });
    console.log(user);
  }


  return (

    <div className="signinContainer text">
      <div className="signinForm">
        
        <h2 className="welcomeSubText">Login Page Boleto</h2>
        <br/><br/>
        <div className="mb-3 form-control-group">
          <label className="form-label">
            Username
          </label>
          <input type="email" id="username" className="form-control"
            placeholder="username" name="username" onChange={handleChange} value={user.username} />
            <br/>

        </div>
        <div className="mb-3 form-control-group">
          <label className="form-label">
            Password
          </label>
          <input type="password" placeholder="password" name="password" id="password" onChange={handleChange} value={user.password} className="form-control" />


        </div>

        <br/>
        <div className="btn-wrapper">
          <button className="btn btn-primary mb-3" type="button" onClick={handleSubmit}>
            Sign In</button>


        </div>

        <span className="loginText" htmlFor="">
          Don't have an account?  &nbsp;&nbsp;
          <Link to="/registration" className="loginLink" >
            SignUp Now  </Link>
        </span>


      </div>

    </div>
  );

}

export default Login