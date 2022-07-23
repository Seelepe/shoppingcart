import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';


import {useParams} from 'react-router-dom';

function ProductDetail() {
    let params = useParams();
    console.log(params.id);

    const [getItem, setItem] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:8080/laravel/laravel/public/api/product/detail/"+params.id)
        .then(res=>{
            setItem(res.data.data)
            console.log(res.data.data)
        }).catch(error=> console.log(error))
    },[])

    function renderProduct() {
      if (Object.keys(getItem).length>0) {
        const image= JSON.parse(getItem['image'])
        console.log(image)
          return(
            <div className="product-details">{/*product-details*/}
              <div className="col-sm-5">
                <div className="view-product">
                  <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+getItem['id_user']+"/"+ image[0]} alt="" />
                  <a onClick={openPopupbox} ><h3>ZOOM</h3></a>
                  <PopupboxContainer />                
                </div>
                <div id="similar-product" className="carousel slide" data-ride="carousel">
                  {/* Wrapper for slides */}
                  {renderImage()}

                  {/* Controls */}
                  <a className="left item-control" href="#similar-product" data-slide="prev">
                    <i className="fa fa-angle-left" />
                  </a>
                  <a className="right item-control" href="#similar-product" data-slide="next">
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="product-information">{/*/product-information*/}
                  <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                  <h2>{getItem['detail']}</h2>
                  <p>Web ID: {getItem['id']} </p>
                  <img src="images/product-details/rating.png" alt="" />
                  <span>
                    <span>{getItem['price']}</span>
                    <label>Quantity:</label>
                    <input type="text" defaultValue={3} />
                    <button type="button" className="btn btn-fefault cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </span>
                  <p><b>Availability:</b> In Stock</p>
                  <p><b>Condition:</b> New</p>
                  <p><b>Brand:</b> E-SHOPPER</p>
                  <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                </div>{/*/product-information*/}
              </div>
            </div>
          )
      }
    }
    function renderImage() {
      const image= JSON.parse(getItem['image'])
      console.log(image)
      if (image.length >0) {
        return image.map((value,key)=>{
          return(
            <div  key={key} className="carousel-inner">
              <div className="item active">
                <a href><img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+getItem['id_user']+"/"+ value} alt="" /></a>               
              </div>
              <div className="item">
                <a href><img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+getItem['id_user']+"/"+ value} alt="" /></a>
              </div>
              <div className="item">
                <a href><img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+getItem['id_user']+"/"+ value} alt="" /></a>
              </div>
            </div>
          )
        })
      }
    }
    function openPopupbox() {
      const image= JSON.parse(getItem['image'])
      console.log(image)
      const content = <img src={"http://localhost:8080/laravel/laravel/public/upload/user/product/"+getItem['id_user']+"/"+ image[0]} alt="" />
      PopupboxManager.open({
        content,
        config: {
          titleBar: {
            enable: true,
          },
          fadeIn: true,
          fadeInSpeed: 500
        }
      })
    }

  return (
    <div className="col-sm-9 padding-right">
        {renderProduct()}
        <div className="category-tab shop-details-tab">{/*category-tab*/}
          <div className="col-sm-12">
            <ul className="nav nav-tabs">
              <li><a href="#details" data-toggle="tab">Details</a></li>
              <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
              <li><a href="#tag" data-toggle="tab">Tag</a></li>
              <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade" id="details">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="companyprofile">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="tag">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade active in" id="reviews">
              <div className="col-sm-12">
                <ul>
                  <li><a href><i className="fa fa-user" />EUGEN</a></li>
                  <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                  <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p><b>Write Your Review</b></p>
                <form action="#">
                  <span>
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Email Address" />
                  </span>
                  <textarea name defaultValue={""} />
                  <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                  <button type="button" className="btn btn-default pull-right">
                    Submit
                  </button>
                </form>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
  );
}
export default ProductDetail