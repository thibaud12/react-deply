import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
      window.location.reload();
    });
  };

  return (
    
    <div class="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ marginLeft: '20%',marginRight: '20%', marginTop: '20%', textAlign: 'center'}}>
        
        <div class="close" style={{ textAlign: 'right'}}>
        <Link to="/"> 
        <button type="button" class="btn-close"></button>
        </Link>
        </div>

        <div className="loginPage">
        <div class='text'>
         <h6>Connecter vous à votre compte google</h6>
        </div>

        <button type="button" class="btn btn-light"  onClick={signInWithGoogle}>
        <img src="/google.png" alt="Description" width="60" height="60"/>
        </button>
        </div>
    </div>
    
  );
}

export default Login;
