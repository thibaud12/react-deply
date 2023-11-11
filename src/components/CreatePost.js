import "./CreatePost.css";
import React, { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase-config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";







function CreatePost({ isAuth }) {
  
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      postImage: imgUrl,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      timestamp: serverTimestamp(),
    });
    navigate("/");
  };
 
  
  const [imgUrl, setImgUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }

  const imageStyle = {
    width: '200px',
    height: '100px',
    objectFit: 'cover',
    border: '4px solid #256933',
    borderRadius: '10px',
  };

    const inputStyle = {
      width: '146px', // Spécifiez la largeur souhaitée
      height: '38px', // Spécifiez la hauteur souhaitée
      border: '4px solid #256933',
      borderRadius: '10px',
    };

    

  return (
    <div class="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ marginLeft: '10%',marginRight: '10%', marginTop: '13%', textAlign: 'center'}}>
      <div className="createPostPage">
        <div className="cpContainer">


          <h1>Créer un Post</h1>

        
          {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' style={imageStyle} />
          }


          <div className="inputGp" style={{ marginTop: '7%'}}>
              <input type="post" class="form-control" 
                placeholder="Titre"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
          </div>

          <div className="inputGp" style={{ marginTop: '7%'}}>
            <textarea class="form-control"
              placeholder="Post..."
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            />
          </div>


          <div className="FileUpload" style={{ marginTop: '7%'}}>
            <form onSubmit={handleSubmit} >
            <input type='file' style={inputStyle}/>

            <button type="submit" class="btn btn-light">
             <img src="/Upload.png" alt="Description" width="30" height="30"/>
            </button>

            </form>
          </div>



          <div className="submit" style={{ marginTop: '7%'}}></div>
          <button type="button" class="btn btn-success" onClick={createPost}> 
          Poster 😏
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
