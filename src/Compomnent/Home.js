import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Home(Total) {
    const [getHome, setHome] = useState("");
    const [getInfo,setInfo] = useState("");
    const user = useContext(UserContext)
    
    
    useEffect(()=>{
      axios.get("http://localhost:8080/laravel/laravel/public/api/product")
      .then(res=>{
        setHome(res.data.data)
        console.log(res.data.data)
      }).catch(error=> console.log(error))
    },[])
  
    function renderProduct() {
      
      if (getHome.length >0) {
        return getHome.map((value,key)=>{
          const image = JSON.parse(value.image)
          // console.log(image)
          return(
            <div key={key} className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">                        
                      <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+value.id_user+"/"+ image[0]} alt="" />
                      <h2>{value.price}</h2>
                      <p>{value.detail}</p>
                      <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                    </div>
                    <div className="product-overlay">
                      <div id={1} className="overlay-content">
                        <h2>{value.price}</h2>
                        <p>{value.detail}</p>
                        <a onClick={AddToCart} id={value.id}  href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                  <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                      <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                      <li><Link to={'/Product-Detail/'+ value.id}  className="fa fa-plus-square" >Add to compare</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
          )
        })
      }
    }
    function AddToCart(e) {
      const id= e.target.id;
      let check =1; 
      let cart={};
      let Totalqty= 0;
      
      let get =  localStorage.getItem("addCart")
      if (get) {
        cart = JSON.parse(get)
        Object.keys(cart).map((key,index)=>{
          if (id==key) {
            cart[key] += 1
            check =2
            // console.log(check,cart[key])
          }
        })
      }
      if (check ==1) {
        cart[id] = 1
      }
      let info = JSON.stringify(cart);
      localStorage.setItem("addCart", info)

      Object.keys(cart).map((key,index)=>{
        Totalqty= Totalqty +cart[key]
      })
      console.log(Totalqty)
      user.Qty(Totalqty)
    }


  return (
    <div className='Home'>
      {/* <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div id="slider-carousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#slider-carousel" data-slide-to={0} className="active" />
                <li data-target="#slider-carousel" data-slide-to={1} />
                <li data-target="#slider-carousel" data-slide-to={2} />
              </ol>
              <div className="carousel-inner">
                <div className="item active">
                  <div className="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>Free E-Commerce Template</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    <button type="button" className="btn btn-default get">Get it now</button>
                  </div>
                  <div className="col-sm-6">
                    <img src="images/home/girl1.jpg" className="girl img-responsive" alt="" />
                    <img src="images/home/pricing.png" className="pricing" alt="" />
                  </div>
                </div>
                <div className="item">
                  <div className="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>100% Responsive Design</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    <button type="button" className="btn btn-default get">Get it now</button>
                  </div>
                  <div className="col-sm-6">
                    <img src="images/home/girl2.jpg" className="girl img-responsive" alt="" />
                    <img src="images/home/pricing.png" className="pricing" alt="" />
                  </div>
                </div>
                <div className="item">
                  <div className="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>Free Ecommerce Template</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    <button type="button" className="btn btn-default get">Get it now</button>
                  </div>
                  <div className="col-sm-6">
                    <img src="images/home/girl3.jpg" className="girl img-responsive" alt="" />
                    <img src="images/home/pricing.png" className="pricing" alt="" />
                  </div>
                </div>
              </div>
              <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                <i className="fa fa-angle-left" />
              </a>
              <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="row">
          <div className="col-sm-9 padding-right">
            <div className="features_items">{/*features_items*/}
              <h2 className="title text-center">Features Items</h2>
              {renderProduct()}
            </div>{/*features_items*/}
            <div className="category-tab">{/*category-tab*/}
              <div className="col-sm-12">
                <ul className="nav nav-tabs">
                  <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                  <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                  <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                  <li><a href="#kids" data-toggle="tab">Kids</a></li>
                  <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                </ul>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade active in" id="tshirt">
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery4.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="blazers">
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery4.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="sunglass">
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery4.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="kids">
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery4.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="poloshirt">
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery4.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{/*/category-tab*/}
            <div className="recommended_items">{/*recommended_items*/}
              <h2 className="title text-center">recommended items</h2>
              <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">	
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/recommend2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/recommend3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">	
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/recommend2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/recommend3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                  <i className="fa fa-angle-left" />
                </a>
                <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                  <i className="fa fa-angle-right" />
                </a>			
              </div>
            </div>{/*/recommended_items*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;