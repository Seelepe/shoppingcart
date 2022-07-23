import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import Comments from './Comment';
import Listcomment from './Listcomment';


function BlogDetail(props) {
  let params = useParams();
  //console.log(params.id);
  const [data, setData] = useState('');
  const [listcmt, setListcmt] = useState([]);
  const [rely,getRely] = useState('');
  
  const getCMT =(e)=>{
    let get = e.data.data
    let xxx =listcmt.concat(get)
    setListcmt(xxx)

  }
  const getID = (e)=>{ //truyen id tu list sang
    console.log(e)
    //let get=e
    getRely(e)
    
  }
  
    
  
  
  useEffect(()=>{
    axios.get("http://localhost:8080/laravel/laravel/public/api/blog/detail/" + params.id)
    .then(res=>{
      setData(res.data.data)
      setListcmt(res.data.data.comment)
      
    }).catch(error=> console.log(error))
  },[])

  function renderData(){      
    if (Object.keys(data).length > 0){  
      return (
          <div className="single-blog-post">
            <h3>{data.title}</h3>
            <div className="post-meta">
              <ul>
                <li><i className="fa fa-user" />{data.id_auth}</li>
                <li><i className="fa fa-clock-o" />{data.created_at}</li>
                <li><i className="fa fa-calendar" />{data.updated_at}</li>
              </ul>
              {/* <span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span> */}
            </div>
            <a href>
              <img src={"http://localhost:8080/laravel/laravel/public/upload/Blog/image/" + data.image} alt="" />
            </a>
            <p>
              {data.content}
            </p>
            <div className="pager-area">
              <ul className="pager pull-right">
                <li><a href="#">Pre</a></li>
                <li><a href="#">Next</a></li>
              </ul>
            </div>
          </div>
        )
    }    
      
  }
  return (
    <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {renderData()}
        </div>{/*/blog-post-area*/}
        <div className="rating-area">
          <ul className="ratings">
            <li className="rate-this">Rate this item:</li>
            <li>
              <i className="fa fa-star color" />
              <i className="fa fa-star color" />
              <i className="fa fa-star color" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
            </li>
            <li className="color">(6 votes)</li>
          </ul>
          <ul className="tag">
            <li>TAG:</li>
            <li><a className="color" href>Pink <span>/</span></a></li>
            <li><a className="color" href>T-Shirt <span>/</span></a></li>
            <li><a className="color" href>Girls</a></li>
          </ul>
        </div>{/*/rating-area*/}
        <div className="socials-share">
          <a href><img src="images/blog/socials.png" alt="" /></a>
        </div>{/*/socials-share*/}
        {/* <div class="media commnets">
						<a class="pull-left" href="#">
							<img class="media-object" src="images/blog/man-one.jpg" alt="">
						</a>
						<div class="media-body">
							<h4 class="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div class="blog-socials">
								<ul>
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-google-plus"></i></a></li>
								</ul>
								<a class="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div> */}{/*Comments*/}
        <Listcomment cmt={listcmt} getID={getID} />{/*/Response-area*/}
        <Comments getCMT={getCMT} rely={rely} />{/*/Repaly Box*/}
    </div>
  )
}
export default BlogDetail


// - click detail -> nhay sang trang detail (show html dc giong yeu cau)
// - tim lay id 
// - goi api 
// - lay data tu api ra rap vao (chi co 1 bai nen k dung MAP)