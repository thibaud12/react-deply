import React, {useContext} from 'react'
import {UserContext} from "../context/userContext"
import {Link} from "react-router-dom"
import {signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"
import { useState } from "react";


export default function Navbar() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  const {toggleModals} = useContext(UserContext)

  const navigate = useNavigate()

  const logOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch {
      alert("For some reasons we can't deconnect, please check your internet connexion and retry.")
    }
  }

  return (

    <nav className="navbar bg-body-tertiary px-4">

          <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Description" width="60" height="48"/>
          </Link>

          

          {!isAuth ? (
            <Link to="/Login"> 
              <button 
              onClick={() => window.location.href = "/Login"}
              className="btn btn-outline-success">
              Inscription
              </button>
            </Link>
          ) : (
            <>
              <Link to="/CreatePost"> 
                <button 
                onClick={() => window.location.href = "/CreatePost"}
                className="btn btn-success">
                Créer un Post
                </button>
              </Link>

              <Link to="/"> 
                <button 
                onClick={signUserOut}
                className="btn btn-success ms-2">
                Partir...
                </button>
              </Link>
            
          </>
        )}
    </nav>
  )
}