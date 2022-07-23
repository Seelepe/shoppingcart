import React,{useState} from 'react';
import Formerror from './Formerror';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const [error, setError] = useState({});
  
  function handleChange(e){
    const nameInput = e.target.name;
    const value = e.target.value;
    setinput(state =>({...state,[nameInput]:value}))      
  }
  function handleSubmit(e){
    e.preventDefault();
    let errorSubmit ={}
    let flag = true;
        
    if (input.email === undefined) {
      flag = false;
      errorSubmit.email= "Vui long nhap email";
    }else{
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      regex.test(input.email);
    }
    if (input.password === undefined) {
      flag = false;
      errorSubmit.password= "Vui long nhap password";
    }
    if (input.check === undefined) {
      flag = false;
      errorSubmit.check= "Vui long chon";
    }
    if (!flag) {
      setError(errorSubmit);
    }
    if (flag) {
      const data ={
        email: input.email,
        password: input.password,
        level: 0
      }
      axios.post("http://localhost:8080/laravel/laravel/public/api/login",data)
      .then((res)=>{
        //res la ket qua API tra ve, co the dung hoac sai, nen log ra xem
        if(res.data.errors){
          setError(res.data.errors);
        }else{
            //console.log(res)
            let check =JSON.stringify(res)
            //console.log(check);
            localStorage.setItem("check", check)

            let kiemtra =JSON.stringify(true)
            //console.log(kiemtra);
            localStorage.setItem("isCheck", kiemtra)
            navigate('/');
        }
        
      })      
    }
  }
  return (
    <div className="login-form">
        <h2>Login to your account</h2>
        <form action="#" onSubmit={handleSubmit} >
          <input type="email" placeholder="Email Address" name='email' onChange={handleChange} />
          <input type="password" placeholder="Password" name='password' onChange={handleChange} />
          <span>
            <input type="checkbox" className="checkbox" name='check' onChange={handleChange}/> 
            Keep me signed in
          </span>
          <button type="submit" className="btn btn-default">Login</button>
        </form>
        <Formerror error={error} />
      </div>
  )
}

export default Login;