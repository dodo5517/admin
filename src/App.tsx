import React, {useState} from 'react';
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import './App.css';
import './style/css/sideMenu.css'
import './style/css/login.css'
import './style/css/header.css'
import './style/css/category.css'
import './style/css/categoryModal.css'
import './style/css/user.css'


import Login from './components/Login';
import Category from './components/Category';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import User from './components/User';


function App() {
  return (
      <div className="App">
          <Router>
              {/*<Login/>*/}
              <Header/>
              <div className="parent-container">
                  <SideMenu/>
                  <div className="main-content">
                      <Routes>
                          <Route path="/" element={<Category/>}/>
                          <Route path="/admin/category" element={<Category/>}/>
                          <Route path="/admin/user" element={<User/>}/>
                      </Routes>
                  </div>
              </div>
          </Router>
      </div>
);
}

export default App;
