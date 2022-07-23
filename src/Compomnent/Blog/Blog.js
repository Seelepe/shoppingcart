import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Blog() {
  const [getItem, setItem] = useState("");
  useEffect(()=>{
    axios.get("http://localhost:8080/laravel/laravel/public/api/blog")
    .then(res=>{
      setItem(res.data.blog)
    }).catch(error=> console.log(error))
  },[])

  function renderData(){  
        if ( Object.keys(getItem).length > 0){
            return getItem.data.map((value,key)=>{
                return (
                  <div key={key} class="single-blog-post">
                    <h3>{value.title}</h3>
                    <div class="post-meta">
                      <ul>
                        <li><i class="fa fa-user"></i>{value.id_auth}</li>
                        <li><i class="fa fa-clock-o"></i>{value.created_at}</li>
                        <li><i class="fa fa-calendar"></i>{value.updated_at}</li>
                      </ul>
                      <span>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star-half-o"></i>
                      </span>
                    </div>
                    <a href="">
                      <img src={"http://localhost:8080/laravel/laravel/public/upload/Blog/image/" + value.image} alt="" />
                    </a>
                    <p>{value.content}</p>
                    <Link to={"/blog/detail/" + value.id} class="btn btn-primary">Read More</Link>
                  </div>
                )
            })
        }
    }
  return (
    <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              {renderData()}
              <div className="pagination-area">
                <ul className="pagination">
                  <li><a href className="active">1</a></li>
                  <li><a href>2</a></li>
                  <li><a href>3</a></li>
                  <li><a href><i className="fa fa-angle-double-right" /></a></li>
                </ul>
              </div>
            </div>
    </div>    
  );
}
export default Blog