import React,{Component, useState} from 'react';
import './App.css';
import { UserContext } from './UserContext';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Menuleft from './Layout/Menuleft';


function App(props) {

  const [item, setItem] = useState("")
  
  function Qty(data){
    console.log(data) 
    setItem(data)
  }

  return(
    <UserContext.Provider value={{
      Qty:Qty,
      item: item
    }}>
      <Header/>
      <section>
        <div className='container'>
          <div className='row' >
            {/* {renderHome()} */}
            <Menuleft />
            {props.children}
          </div>
        </div>
      </section>
      <Footer/>
    </UserContext.Provider>
  );
}
export default App;
