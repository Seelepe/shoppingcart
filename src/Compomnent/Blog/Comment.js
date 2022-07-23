import React,{useState} from 'react';
import axios from 'axios';
import Formerror from '../Member/Formerror';
import {useParams} from 'react-router-dom';

function Comments(props) {
    let params = useParams();
    //console.log(params.id);
    const [text, setText] = useState("")
    const [error, setError] = useState("");
    
    function handleText(e){
      setText(e.target.value)
    }
    function handleSubmit(e){
      e.preventDefault();
      let errorSubmit ={}
      let flag = true;
      let get =  localStorage.getItem("isCheck")
        if(get){
          let check1 = JSON.parse(get)
          //console.log(check1)          
          if(!check1 ){
              flag = false;
              errorSubmit = "Vui long dang nhap de binh luan";     
          } else{
                if ( text == "") {
                  flag = false;
                  errorSubmit = "Vui long nhap binh luan";
                }
          }
          if (!flag) {
            setError(errorSubmit);
          }
          if (flag) {
            const userData = JSON.parse(localStorage.getItem("check"))
            console.log("lấy từ local",userData)
            //goi duong dan API
            let url= "http://localhost:8080/laravel/laravel/public/api/blog/comment/" + params.id
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
            
            // kiem tra comment da nhap chua
            if(text){ 
              const formdata = new FormData();
                formdata.append('id_blog', params.id);
                formdata.append('id_user',userData.data.Auth.id);
                formdata.append('id_comment', props.rely ? props.rely : 0);
                formdata.append('comment',text);
                formdata.append('image_user',userData.data.Auth.avatar);
                formdata.append('name_user',userData.data.Auth.name)
              
              axios.post(url,formdata,config)
              .then((res) =>{
                console.log("post thành công",res)
                props.getCMT(res)
                
              })
            }

          }
        }
    }


  return (
    <div className="replay-box">
        <div className="row">
            <div className="col-sm-12">
                <h2>Leave a replay</h2>
                <div className="text-area">
                    <div className="blank-arrow">
                        <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <form onSubmit={handleSubmit} >
                        <textarea name="message" rows={11} defaultValue={""} onChange={handleText}/>
                        <button type="submit" className="btn btn-primary">post comment</button>
                    </form>
                </div>
                <Formerror error={error} />
            </div>
        </div>
    </div>
  )
}

export default Comments;


// - qua trang Login, lay token va auth dua vao localStorage, de qua trang khac dung thi goi ra 
// - viet ham submit form: 
//   + kiem tra login chua, neu chua thi bao loi vui long login de cmt 
//   + login roi thi kiem tra nhap binh luan chua, chua => loi 
//   + nhap bluan roi thi lam tiep:
//     ++ lay cac tham so cần lay 
//     ++ dua het all vao formdata 
//     + tao file config de set token vao 
//     + tien hanh goi api va truyen