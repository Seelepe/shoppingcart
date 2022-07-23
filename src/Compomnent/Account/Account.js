import React,{useState, useEffect} from 'react'
import Formerror from '../Member/Formerror';
import axios from 'axios';

function Account(props) {
  const [input, setinput] = useState("");
  const [error, setError] = useState({});
  const [avatar, setAvatar] = useState(""); 
  const [file,setFile] = useState("")  
  
  useEffect(()=>{
    let userData = JSON.parse(localStorage.getItem("check"))

      setinput({
        id:userData.data.Auth.id,
        name: userData.data.Auth.name,
        email: userData.data.Auth.email,
        //password: userData.data.Auth.password,
        phone: userData.data.Auth.phone,
        address: userData.data.Auth.address,
        
      })
    
  },[])

  function renderForm(){
   
          return(
            <form  enctype="multipart/form-data" action="#" onSubmit={handleSubmit}>
                <input type="text" value={input.name} name='name' onChange={handleChange}/>
                <input type="email" readOnly value={input.email} name='email' onChange={handleChange} />
                <input type="password" value="" name='password' onChange={handleChange} />
                <input type="text" value={input.phone} name='phone' onChange={handleChange} />
                <input type="text" value={input.address} name='address' onChange={handleChange} />
                <input type="file"  name='avatar' onChange={handleChangeFile} />
                <button type="submit" className="btn btn-default">Signup</button> 
            </form>
          )
  }

  
    function handleChange(e){
      const nameInput = e.target.name;
      const value = e.target.value;
      setinput(state =>({...state,[nameInput]:value}))
      
    }
    function handleChangeFile(e){
      const file= e.target.files;
      //console.log(file)
    
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
        
        
        // if (input.name === undefined) {
        //   flag = false;
        //   errorSubmit.phone= "Vui long nhap name";
        // }
        // // if (input.email === undefined) {
        // //     flag = false;
        // //     errorSubmit.email= "Vui long nhap email";
        // // }else{
        // //     var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // //     regex.test(input.email);
        // // }
        // if (input.password === undefined) {
        //     flag = false;
        //     errorSubmit.password= "Vui long nhap password";
        // }
        // if (input.phone === undefined) {
        //   flag = false;
        //   errorSubmit.phone= "Vui long nhap Phone";
        // }
        // if (input.address === undefined) {
        //   flag = false;
        //   errorSubmit.address= "Vui long nhap address";
        // }

        // if (avatar === "") {
        //     flag = false;
        //     errorSubmit.avatar="Vui long gui hinh anh";
        // } else {
        //     //console.log(file['size'])
        //     if (file['size'] > 1048576 ) {
        //         flag = false;
        //        errorSubmit.avatar="File anh qua size";
        //     }
        //     //console.log(file['type'])
        //     const ret = file['type'].replace('image/','');
        //     const duoi =["png","jpg","jpeg","PNG","JPG"];
        //     if (!duoi.includes(ret)) {
        //         flag = false;
        //         errorSubmit.avatar="khong phai la file hinh anh";
        //     }
        // }
        if (!flag) {
            setError(errorSubmit);
        }
        if (flag) {
          let userData = JSON.parse(localStorage.getItem("check"))
          console.log(userData.data.Auth)
          //goi dung dan API
          let url= "http://localhost:8080/laravel/laravel/public/api/user/update/" + input.id
          let accessToken = userData.data.success.token; //lấy chính xác token
            console.log("lấy token:",accessToken)
            //config de gui token qua API
            let config = {
              headers:{
              'Authorization': 'Bearer '+ accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
              }
            }; 
          // kiem tra input da nhap chua
          console.log(input.address)
            const formdata = new FormData();
              formdata.append('id_user', input.id);
              formdata.append('name', input.name);
              formdata.append('email',input.email);
              formdata.append('password', input.password ? input.password : "");
              formdata.append('phone',input.phone);
              formdata.append('address',input.address);
              // formdata.append('avatar',avatar)

            axios.post(url,formdata,config)
            .then((res)=>{
              //res la ket qua API tra ve, co the dung hoac sai, nen log ra xem
              console.log("post thanh cong", res)
            })
          //}  
        }

        
    }
    return (  
        <div className="signup-form">
            {renderForm()}
            <Formerror error={error} />
        </div>
    )
}

export default Account;