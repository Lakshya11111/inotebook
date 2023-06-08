import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credential, setCredential] = useState({name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Api call
    const response = await fetch("http://localhost:5000/api/auth/usercreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({name: credential.name, email: credential.email, password: credential.password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Redirect to home page
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Account created Successfully", "success");
    }
    else {
      props.showAlert("Invalid credential", "danger");
    }
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2 className="mt-3 my-3">Create your account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" value={credential.name} id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credential.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credential.password} id="password" name='password' onChange={onChange} required minLength={6}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="cpassword" className="form-control" value={credential.cpassword} id="cpassword" name='cpassword' onChange={onChange} required minLength={6}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
