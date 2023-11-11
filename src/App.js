import React from 'react';
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal"
import Private from "./pages/Private/Private"
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";
import CreatePost from "./components/CreatePost";
import { useState } from "react";
import Login from "./components/Login.js";
import { Client } from 'appwrite';


const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('654f78657eb5b3866c6f');




function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
      <>
        <SignUpModal />
        <SignInModal />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />          
          <Route path="/CreatePost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/private" element={<Private />} >
          <Route path="/private/private-home" element={<PrivateHome />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;