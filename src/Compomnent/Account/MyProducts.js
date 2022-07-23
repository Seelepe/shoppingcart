import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Myproducts(props) {
  const [product,setProduct]=useState("")


  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("check"))
    console.log("lấy từ local",userData)
    //goi duong dan API
    let url= "http://localhost:8080/laravel/laravel/public/api/user/my-product"
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
      setProduct(res.data.data)
      console.log(product)
    })
  },[])


  function renderproduct() {
    return Object.keys(product).map((key,index)=>{
      const image = JSON.parse(product[key]['image'])
      console.log(image)
      
      return(
          <tr>
            <td>{product[key]['id']}</td>
            <td>{product[key]['name']}</td>
            <td><img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+product[key]['id_user']+"/"+ image[0]} alt="" /></td>
            <td>${product[key]['price']}</td>
            <td><Link to={"/Account/Myproducts/EditProduct/" + product[key]['id']} className="btn btn-default">Edit</Link>  <a id={product[key]['id']} onClick={xoa} className="btn btn-default">Delete</a></td>
          </tr>
        )
      })    
  }
  function xoa(e){
    let id = e.target.id
    console.log(id)

    const userData = JSON.parse(localStorage.getItem("check"))
    console.log("lấy từ local",userData)
    //goi duong dan API
    let url= "http://localhost:8080/laravel/laravel/public/api/user/delete-product/"+ id
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
      setProduct(res.data.data)
      console.log(product)
    })
    
  }



  return (
    <div>
      <div>
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          {renderproduct()}
        </table>
      </div>
      <Link to="/Account/Addnew" className="btn btn-default">ADD NEW</Link>
    </div>
    
  )
}

export default Myproducts;