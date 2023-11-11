import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";


function PrivateHome({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    }, []);

    return (

        <div className="PrivateHomePage">

            <section class="py-5">
            <div class="container">
                <div class="row gy-4">
                        <div class="col-12 md-12" style={{textAlign: 'center', color : 'white'}}>
                            <h1>Vous revoilà 😏</h1>
                        </div>
                    </div>
                </div>
            </section>

                                    {postLists.map((post) => {
                                    return (
                                                   <div class="card" style={{ marginLeft: '3%',marginRight: '60%', marginTop: '3%', textAlign: 'center'}} >
                                                    <div key={post.id} >
                                                        <div className="postHeader">
                                                            <div className="title">
                                                                <h1>{post.title}</h1>
                                                            </div>
                                                            <div className="deletePost">
                                                                {isAuth && post.author.id === auth.currentUser.uid && (
                                                                    <button
                                                                        onClick={() => {
                                                                            deletePost(post.id);
                                                                        }}
                                                                    >
                                                                        &#128465;
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="postTextContainer">{post.postText}</div>
                                                        <h3>@{post.author.name}</h3>
                                                    </div>
                                                    </div>
                                                );
                                            })}
            </div>

    );
}

export default PrivateHome;











