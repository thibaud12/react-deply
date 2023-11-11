import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';






function Home({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
  
    useEffect(() => {
      const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
  
      getPosts();
    });
  
    const deletePost = async (id) => {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
    };
    


    const imageStyle = {
        width: '272px',
        height: '100px',
        objectFit: 'cover',
        
      };

    

    return (
      <div className="homePage">

      
        {postLists.map((post) => {
          return (
            <div class= "card" style={{ marginLeft: '10%',marginRight: '10%', marginTop: '13%', textAlign: 'center'}}>
            <div className="post">
              <div className="postHeader">
            
              {post.postImage && (
                            <img src={post.postImage} alt="Post Image" class="card-img-top" style={imageStyle} />
                        )}

                   

                <div className="title">
                  <h1> {post.title}</h1>
                </div>
                
              </div>
              <div className="postTextContainer"> {post.postText} </div>
              <h6>@{post.author.name}</h6>
                    
                    <div class="text-body-secondary">

                    {post.timestamp && (
                                <h7>
                                    {formatRelative(post.timestamp.toDate(), new Date(), {
                                        locale: fr, // Utilisation du locale français
                                    })}
                                </h7>
                            )}
                    </div>

                </div>


                <div className="deletePost">
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <button 
                      onClick={() => {
                        deletePost(post.id);
                      }}
                      class="btn btn-outline-danger btn-sm"
                    >
                      Supprimer le post
                     
                    </button>
                  )}
                </div>

              </div>
              
              

    
          );
        })}
         </div>
      
    );
  }
  
  export default Home;