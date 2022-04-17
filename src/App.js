import React from "react";
import "./App.css";
import Home from "./components/Home";
import Generator from "./components/Generator";
import SignIn from "./components/SignIn";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App(){
  return(
      <BrowserRouter>
          <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path='/gen' element={<Generator/>}/>
              <Route path='/signin' element={<SignIn/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
