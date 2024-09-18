import React, { useState } from 'react'
import './login.css'
import logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase'
import netFlix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);


  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if(signState === 'Sign In'){
      await login(email,password);
    }else{
      await signUp(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading?<div className="login-spinner">
      <img src={netFlix_spinner} />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form >
          {signState === 'Sign Up'? <input type="text" value={name} onChange={(e) =>{setName(e.target.value)}} placeholder='Enter Your Name' /> : <></>}
          
          <input type="email" value={email} onChange={(e) =>{setEmail(e.target.value)}} placeholder='Enter Your Email' />
          <input type="password" value={password} onChange={(e) =>{setPassword(e.target.value)}} placeholder='Enter Your Password' />
          <button onClick={user_auth} type='submit' >{signState} </button>
          <div className="from-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In'?<p>New to Netflix? <span onClick={() => {setSignState("Sign Up")}}>Sign Up Now</span></p> : <p>Already have account? <span onClick={() => {setSignState("Sign In")}}>Sign In Now</span></p>}
        </div>
      </div>
    </div>  
  )
}

export default Login