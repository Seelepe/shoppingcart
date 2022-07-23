import React,{useState} from 'react';

import axios from 'axios';



function Listcomment(props) {
  console.log(props.cmt)

  function renderData(){ 
    if (props.cmt.length > 0) {
      return props.cmt.map((value, i)=>{
        if (value.id_comment ==0) {
          return (
            <React.Fragment key={i}>
              <li className="media">
                <a className="pull-left" href="#">
                  <img className="media-object" src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/"+ value.image_user} alt="" />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li><i className="fa fa-user" />{value.name_user}</li>
                    <li><i className="fa fa-clock-o" /> {value.created_at}</li>
                    <li><i className="fa fa-calendar" /> {value.updated_at}</li>
                  </ul>
                  <p>{value.comment}</p>
                  <a id={value.id} onClick={replay} className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                </div>
              </li>
              {props.cmt.map((value2,j) =>{
                if (value.id ==value2.id_comment) {
                  return(
                    <li key={j} className="media second-media">
                      <a className="pull-left" href="#">
                        <img className="media-object" src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/"+ value2.image_user} alt="" />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li><i className="fa fa-user" />{value2.name_user}</li>
                          <li><i className="fa fa-clock-o" /> {value2.created_at}</li>
                          <li><i className="fa fa-calendar" /> {value2.updated_at}</li>
                        </ul>
                        <p>{value2.comment}</p>
                        <a id={value2.id} onClick={replay} className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                      </div>
                    </li>
                  )
                }
              })}
            </React.Fragment>
          )
        }
      })
    }   
  }
  function replay(e){
    let id = e.target.id
    //console.log(id)
    props.getID(id)
  }


  return (
    <div className="response-area">
        <h2>3 RESPONSES</h2>
        <ul className="media-list">
            {renderData()}
        </ul>					
    </div>
  )
}

export default Listcomment;