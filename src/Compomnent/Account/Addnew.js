import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Formerror from '../Member/Formerror';

function Addnew() {
    const [category, setcategory] = useState("");
    const [brand, setbrand] = useState("");

    const [input, setinput] = useState("");
    const [error, setError] = useState({});
    
    const [getFile,setFile] = useState("");
    const [status,setStatus] = useState(1);

    useEffect(()=>{
        axios.get("http://localhost:8080/laravel/laravel/public/api/category-brand")
        .then(resp=>{
            setcategory(resp.data.category)
            setbrand(resp.data.brand)           
        }).catch()
    },[])
    function rendercategory(){  
      if (Object.keys(category).length >0) {
        return category.map((value, key)=>{
          return(
              <option key={key} value={value.id}>{value.category}</option>
          )
        })
      }
    }
    function renderbrand(){  
      if (Object.keys(brand).length >0) {
        return brand.map((value, key)=>{
          return( 
              <option key={key} value={value.id}>{value.brand}</option>
          )
        })
      }
    }
    function handleChange(e){
        const nameInput = e.target.name;
        const value = e.target.value;
        setinput(state =>({...state,[nameInput]:value}))
    }
    function handleChangeSta(e){
      const value = e.target.value;
      setStatus(value)
    }
    function rendersale() {
      if (status == 0 ) {
        return(
          <input type="number" placeholder="0" name='sale' />
        )
      } 
    }
    function handleChangeFile(e){
      // console.log(file)
      setFile(e.target.files)
    }    
    function handleSubmit(e){
      e.preventDefault();
      let errorSubmit ={}
      let flag = true;
      
      if (input.name == undefined) {
        flag = false;
        errorSubmit.name= "Vui long nhap name";
      }
      if (input.price == undefined) {
          flag = false;
          errorSubmit.price= "Vui long nhap price";
      }
      if (input.category ==undefined) {
        flag = false;
        errorSubmit.category= "Vui long chon category";
      }
      if (input.brand ==undefined) {
        flag = false;
        errorSubmit.brand= "Vui long chon brand";
      }
      if (getFile == "") {
            flag = false;
            errorSubmit.file="Vui long gui hinh anh";
      } else {

            if (getFile.length >0 ) {
              Object.keys(getFile).map((key,index)=>{
                console.log(getFile[key])
                console.log(getFile[key]['size'])
                if (getFile[key]['size'] > 1048576 ) {
                  flag = false;
                  errorSubmit.file="File anh qua size";
                }
                console.log(getFile[key]['type'])
                const ret = getFile[key]['type'].replace('image/','');
                const duoi =["png","jpg","jpeg","PNG","JPG"];
                if (!duoi.includes(ret)) {
                  flag = false;
                  errorSubmit.file="khong phai la file hinh anh";
                }   
              })
            }
            if (getFile.length >3) {
              flag = false;
              errorSubmit.file="Khong gui qua 3 hinh anh";
            }
      }
      if (input.company == undefined) {
        flag = false;
        errorSubmit.company= "Vui long nhap Company profile";
      }
      if (input.detail == undefined) {
          flag = false;
          errorSubmit.detail= "Vui long nhap detail";
      }

      if (!flag) {
          setError(errorSubmit);
      }
      if (flag) {
            const userData = JSON.parse(localStorage.getItem("check"))
            console.log("lấy từ local",userData)
            //goi duong dan API
            let url= "http://localhost:8080/laravel/laravel/public/api/user/add-product"
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
            
            // kiem tra du lieu da nhap chua

              let formdata = new FormData();
                formdata.append('name', input.name);
                formdata.append('price',input.price);
                formdata.append('category',input.category);
                formdata.append('brand',input.brand);
                formdata.append('status',status);
                formdata.append('sale',input.sale? input.sale:0);
                formdata.append('company',input.company);
                formdata.append('detail',input.detail);
                
                Object.keys(getFile).map((key,index)=> {
                  formdata.append('file[]',getFile[key]);
                })
              axios.post(url,formdata,config)
              .then((res) =>{
                console.log("post thành công",res)          
              })
      }
    }  
    
  return (
    <div className="signup-form">
        <h2>Create Products!</h2>
        <form enctype="multipart/form-data" action="#" onSubmit={handleSubmit}>
          <input type="text" placeholder="name" name='name' onChange={handleChange}/>
          <input type="text" placeholder="price" name='price' onChange={handleChange} />
          <select name='category' onChange={handleChange}>
            <option value=''>Please choose category</option>
            {rendercategory()}
          </select>
          <select name='brand' onChange={handleChange}>
            <option value=''>Please choose brand</option>
            {renderbrand()}
          </select>
          <select name='status' onChange={handleChangeSta} value={status}>
            <option value={0} >sale</option>
            <option value={1}>new</option>
          </select>
          {rendersale()}
          <input type="text" placeholder="Company profile" name='company' onChange={handleChange} />
          <input type="file" placeholder="file" name='file' multiple onChange={handleChangeFile} />
          <textarea placeholder="detail" name="detail" rows={11} defaultValue={""} onChange={handleChange}/>
          <button type="submit" className="btn btn-default">Signup</button>
        </form>
        <Formerror error={error} />
      </div>
  )
}

export default Addnew;