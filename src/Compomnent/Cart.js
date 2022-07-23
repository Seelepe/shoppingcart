import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Cart() {
    
    const [getCart,setCart]= useState('');
    const userCon = useContext(UserContext)
    
    const [get123,setGet123]= useState('');
    
    useEffect(()=>{
        //lay du lieu tren local de post
        let get = JSON.parse(localStorage.getItem("addCart"))
        // console.log(get)
    
        axios.post("http://localhost:8080/laravel/laravel/public/api/product/cart",get)
        .then((res)=>{
            //res la ket qua API tra ve, co the dung hoac sai, nen log ra xem    
            setCart(res.data.data)
            console.log(res.data.data)
            setGet123(userCon)
        })
    },[])

    function renderCart() {
        if (getCart.length>0) {
            return getCart.map((value,key)=>{
                const image = JSON.parse(value.image)
                
	              const tong=value.qty* value.price
                return(
                    <tr key={key}>
                      <td class='cart_product'>
                          <a><img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+value.id_user+"/"+ image[0]}/></a>
                      </td>
                      <td class='cart_description'>
                        <h4><a>{value.detail}</a></h4>
                          <p>{value.id}</p>
                      </td> 
                      <td class='cart_price'>
                        <p>{value.price}</p>
                      </td>
                      <td class='cart_quantity'>
                        <div class='cart_quantity_button'>
                          <a onClick={up} id={value.id}  class='cart_quantity_up' > + </a>
                          <input class='cart_quantity_input' type='text' name='quantity' value={value.qty} autocomplete='off' size='2' />
                          <a onClick={down} id={value.id} class='cart_quantity_down' > - </a>
                        </div>
                      </td>
                      <td class='cart_total'>
                        <p class='cart_total_price'>{tong}</p>
                      </td>
                      <td class='cart_delete'>
                        <a onClick={remove} id={value.id} class='cart_quantity_delete' >delete</a>
                      </td>
                    </tr>
                )
            })
        }
    }
    function up(e) {
      
        const id=e.target.id
        // copy ra 1 ban moi 
         const xx = [...getCart]
          xx.map((value,key)=>{
            if (id == value.id) {
              value.qty +=1
            }
          })
          setCart(xx)

          let get = JSON.parse(localStorage.getItem("addCart"))
          Object.keys(get).map((key,index)=>{
            if (id==key) {
              get[key] += 1
              // console.log(get[key])
            }
          })
          let get2 = JSON.stringify(get);
          localStorage.setItem("addCart", get2)
    }
    function down(e) {
      const id=e.target.id     
      // copy ra 1 ban moi 
       const xx = [...getCart]
        xx.map((value,key)=>{
          if (id == value.id) {
            if (value.qty>1) {
              value.qty -=1
            }else{
              if(xx.indexOf(xx[key])!==-1){
                xx.splice(xx.indexOf(xx[key]),1);
              }
            }
          }
        })
        setCart(xx)

        let get = JSON.parse(localStorage.getItem("addCart"))
        Object.keys(get).map((key,index)=>{
          if (id==key) {
            if (get[key] >1) {
              get[key] -= 1
            }else{
              delete get[key]
            }
          }
        })
        let get2 = JSON.stringify(get);
        localStorage.setItem("addCart", get2)
    }
    function remove(e) {
      let id=e.target.id
      // console.log(id)
      const xx = [...getCart]
        xx.map((value,key)=>{
          // console.log(value.id)
          if (id == value.id) {
            if(xx.indexOf(xx[key])!==-1){
              xx.splice(xx.indexOf(xx[key]),1);
            }
          }
        })
        // console.log(xx)
        setCart(xx)
      let get = JSON.parse(localStorage.getItem("addCart"))
        Object.keys(get).map((key,index)=>{
          if (id==key) {
            delete get[key]
          }
        })
        let get2 = JSON.stringify(get);
        localStorage.setItem("addCart", get2)
    }
    function rendertotal() {
      let total =0
      if (getCart.length>0) {
        getCart.map((value,key)=>{
          total = total + (value.price * value.qty)
        })
      }
      
      return(
        <span>
          {total}
        </span>
      )
    }
    
  return (
    <div>
        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li><a href="#">Home</a></li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                    {renderCart()}
                </tbody>
              </table>
            </div>
          </div>
        </section> {/*/#cart_items*/}
        <section id="do_action">
          <div className="container">
            <div className="heading">
              <h3>What would you like to do next?</h3>
              <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="chose_area">
                  <ul className="user_option">
                    <li>
                      <input type="checkbox" />
                      <label>Use Coupon Code</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Use Gift Voucher</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Estimate Shipping &amp; Taxes</label>
                    </li>
                  </ul>
                  <ul className="user_info">
                    <li className="single_field">
                      <label>Country:</label>
                      <select>
                        <option>United States</option>
                        <option>Bangladesh</option>
                        <option>UK</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Ucrane</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field">
                      <label>Region / State:</label>
                      <select>
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>London</option>
                        <option>Dillih</option>
                        <option>Lahore</option>
                        <option>Alaska</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field zip-field">
                      <label>Zip Code:</label>
                      <input type="text" />
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>Get Quotes</a>
                  <a className="btn btn-default check_out" href>Continue</a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="total_area">
                  <ul>
                    <li>Cart Sub Total <span>$59</span></li>
                    <li>Eco Tax <span>$2</span></li>
                    <li>Shipping Cost <span>Free</span></li>
                    <li className="abc">Total {rendertotal()}</li>
                  </ul>
                  <a className="btn btn-default update" href>Update</a>
                  <a className="btn btn-default check_out" href>Check Out</a>
                </div>
              </div>
            </div>
          </div>
        </section>{/*/#do_action*/}
      </div>
  );
}
export default Cart