import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Formerror from '../Member/Formerror';
import {useParams} from 'react-router-dom';

function EditProduct(props) {
    let params = useParams();
    console.log(params.id);
    const [category, setcategory] = useState("");
    const [brand, setbrand] = useState("");
    const [input, setinput] = useState("");
    const [error, setError] = useState({});  
    const [getFile,setFile] = useState("");
    const [data, setdata] = useState("");
    const [getavatar,setAvatar] = useState("");
    const [status,setStatus] = useState(1);
    const [avtarCheckbox,setAvatarcheckbox] = useState([]);
    

    useEffect(()=>{
      axios.get("http://localhost:8080/laravel/laravel/public/api/category-brand")
      .then(resp=>{
        console.log(resp)
          setcategory(resp.data.category)
          setbrand(resp.data.brand)
          
      }).catch()
    },[])
    useEffect(()=>{
      const userData = JSON.parse(localStorage.getItem("check"))
      console.log("lấy từ local",userData)
      //goi duong dan API
      let url= "http://localhost:8080/laravel/laravel/public/api/user/product/"+ params.id
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
  
      axios.get(url,config)
      .then((res) =>{
        console.log("get thành công",res)
        setinput({
          name: res.data.data.name,
          price: res.data.data.price,
          category: res.data.data.id_category,
          brand: res.data.data.id_brand,
          status: res.data.data.status,
          sale: res.data.data.sale,
          company: res.data.data.company_profile,
          detail: res.data.data.detail
        })
        setdata(res.data.data)
        setAvatar(res.data.data.image)
      })
    },[])
    function renderForm() {
      return(
        <form enctype="multipart/form-data" action="#" onSubmit={handleSubmit}>
          <input type="text" value={input.name} name='name' onChange={handleChange}/>
          <input type="text" value={input.price} name='price' onChange={handleChange} />
          <select name='category' value={input.category} onChange={handleChange}>
            <option value=''>Please choose category</option>
            {rendercategory()}
          </select>
          <select name='brand' value={input.brand} onChange={handleChange}>
            <option value=''>Please choose brand</option>
            {renderbrand()}
          </select>
          <select name='status' onChange={handleChange} value={input.status}>
            <option value={0} >sale</option>
            <option value={1}>new</option>
          </select>
          {rendersale()}
          <input type="text" value={input.company} name='company' onChange={handleChange} />
          <input type="file" placeholder="file" name='file' multiple onChange={handleChangeFile} />
          {renderFile()}
          <textarea value={input.detail} name="detail" rows={11} onChange={handleChange}/>
          <button type="submit" className="btn btn-default">Signup</button>
        </form>
      )
    }
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
   
    function rendersale() {
      if (input.status == 0 ) {
        return(
          <input type="number" placeholder="0" name='sale' value={input.sale}/>
        )
      } 
    }
    function handleChangeFile(e){
      // console.log(file)
      setFile(e.target.files)
    } 
    function renderFile() {
      if (getavatar.length >0) {
        // console.log(getavatar)
        return getavatar.map((value,key)=>{
          return(
            <div>
              <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+data.id_user+"/"+ value} alt="" />
              <input type="checkbox" name='check' onChange={handleCheck} value={value} />
            </div>
          )
        })
      }
    }
    function handleCheck(e) {
      const check = e.target.checked;
      const value = e.target.value;
      console.log(check)
      
      if (check){
        setAvatarcheckbox(state =>([...state,value])) 
      } else{
          if(avtarCheckbox.indexOf(value)!==-1){
              avtarCheckbox.splice(avtarCheckbox.indexOf(value),1);
          }
        }
    }
    
    function handleSubmit(e){
      e.preventDefault();
      // console.log(avtarCheckbox)
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
            // if (getFile.length >3) {
            //   flag = false;
            //   errorSubmit.file="Khong gui qua 3 hinh anh";
            // }
      }
      if ((getFile.length + getavatar.length - avtarCheckbox.length) >3) {
        flag = false;
        errorSubmit.file= "Khong gui qua 3 hinh anh";
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
            let url= "http://localhost:8080/laravel/laravel/public/api/user/edit-product/" + params.id;
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
                formdata.append('status',input.status);
                formdata.append('sale',input.sale? input.sale:0);
                formdata.append('company',input.company);
                formdata.append('detail',input.detail);
                
                Object.keys(getFile).map((key,index)=> {
                  formdata.append('file[]',getFile[key]);
                })
                
                avtarCheckbox.map((value,key)=> {
                  formdata.append('avatarCheckBox[]',value);
                })
              axios.post(url,formdata,config)
              .then((respp) =>{
                console.log("post thành công",respp)          
              })
      }
    }
  return (
    <div className="signup-form">
        <h2>Create Products!</h2>
        {renderForm()}
        <Formerror error={error} />
      </div>
  )
}

export default EditProduct;