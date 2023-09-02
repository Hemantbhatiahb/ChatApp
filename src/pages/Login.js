import React from 'react'
import {  signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const [emailInput,setEmailInput] =  useState('');
  const [passwordInput,setPasswordInput] =  useState('');
  const [error,setError]  =  useState(null) ;
  const navigate =  useNavigate();
  const formSubmitHandler =async(event)=>{
    event.preventDefault();
    const enteredEmail  =  emailInput ;
    const enteredPassword  =  passwordInput ;

    if(enteredEmail.trim().length === 0  || !enteredEmail.includes('@') || enteredPassword.trim().length <=4) {
      alert('email or password not valid!')
      return;
    }

    try { 
       await signInWithEmailAndPassword(auth,enteredEmail,enteredPassword);
      navigate('/');
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={formSubmitHandler}>
          <input type="email" placeholder="email" onChange={e => setEmailInput(e.target.value)}/>
          <input type="password" placeholder="password" onChange={e => setPasswordInput(e.target.value)}/>
          <input style={{display:'none'}} type="file" id="file"/>
          <button>Sign in</button>
          {error && <span>{error}</span>}
        </form>
        <p>You don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </div>
  )
}

export default LoginPage