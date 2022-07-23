import React,{useState} from 'react'
import Formerror from './Formerror';
import axios from 'axios';

function Register(props) {
  const [input, setinput] = useState("");
  const [error, setError] = useState({});
  const [avatar, setAvatar] = useState(""); 
  const [file,setFile] = useState("")  
    function handleChange(e){
      const nameInput = e.target.name;
      const value = e.target.value;
      setinput(state =>({...state,[nameInput]:value}))
      
    }
    function handleChangeFile(e){
      //setAvatar(e.target.files)
      const file= e.target.files;
      console.log(file)
    
      let reader = new FileReader();
      reader.onload = (e) =>{
        setAvatar(e.target.result);
        setFile(file[0]);
      };
      reader.readAsDataURL(file[0]);
       
    }

    // -click form:
    //  + kiem tra tung the input =>show location(y chang bai 16)
    //  + ok het, dua tat nhung cai api can vao 1obj
    //  + tien hanh goi api va truyen obj nay qua
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit ={}
        let flag = true;
        
        if (input.name === undefined) {
          flag = false;
          errorSubmit.phone= "Vui long nhap name";
        }
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
        if (input.phone === undefined) {
          flag = false;
          errorSubmit.phone= "Vui long nhap Phone";
        }
        if (input.address === undefined) {
          flag = false;
          errorSubmit.address= "Vui long nhap address";
        }

        if (avatar === "") {
            flag = false;
            errorSubmit.avatar="Vui long gui hinh anh";
        } else {
            console.log(file['size'])
            if (file['size'] > 1048576 ) {
                flag = false;
               errorSubmit.avatar="File anh qua size";
            }
            console.log(file['type'])
            const ret = file['type'].replace('image/','');
            const duoi =["png","jpg","jpeg","PNG","JPG"];
            if (!duoi.includes(ret)) {
                flag = false;
                errorSubmit.avatar="khong phai la file hinh anh";
            }
        }
        if (!flag) {
            setError(errorSubmit);
        }
        if (flag) {
          const data ={
            name: input.name,
            email: input.email,
            password: input.password,
            phone: input.phone,
            address: input.address,
            avatar: avatar,
            level: 0
          }
          axios.post("http://localhost:8080/laravel/laravel/public/api/register",data)
          .then((res)=>{
            //res la ket qua API tra ve, co the dung hoac sai, nen log ra xem
            if(res.data.errors){
              setError(res.data.errors);
            }else{
              console.log(res)
            }
          })  
        }

        
    }

  return (
    
    <div className="signup-form">
        <h2>New User Signup!</h2>
        <form enctype="multipart/form-data" action="#" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" name='name' onChange={handleChange}/>
          <input type="email" placeholder="Email Address" name='email' onChange={handleChange} />
          <input type="password" placeholder="Password" name='password' onChange={handleChange} />
          <input type="text" placeholder="Phone" name='phone' onChange={handleChange} />
          <input type="text" placeholder="Address" name='address' onChange={handleChange} />
          <input type="file" placeholder="Avatar" name='avatar' onChange={handleChangeFile} />
          <button type="submit" className="btn btn-default">Signup</button>
        </form>
        <Formerror error={error} />
      </div>
  )
}

export default Register;