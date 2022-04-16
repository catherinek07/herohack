import React from "react";
import "./App.css";
import Home from "./components/Home";
import Generator from "./components/Generator";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App(){
  return(
      <BrowserRouter>
          <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path='/gen' element={<Generator/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;