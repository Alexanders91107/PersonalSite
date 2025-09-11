import React from 'react';
import './css/Posts.css';
import GeneralPost from './Posts-content/generalPost.jsx';
import Post1 from './Posts-content/post1.jsx';

function Posts(){
    const [currentPostIndex, setCurrentPostIndex] = React.useState(0);

    const posts = [
        {
            id: 0,
            title: "Information",
            content: <GeneralPost />
        },
        {
            id: 1,
            title: "Post 1",
            content: <Post1 />
        },
                {
            id: 0,
            title: "Information",
            content: <GeneralPost />
        },
        {
            id: 1,
            title: "Post 1",
            content: <Post1 />
        },
                {
            id: 0,
            title: "Information",
            content: <GeneralPost />
        },
        {
            id: 1,
            title: "Post 1",
            content: <Post1 />
        },
    ];

    return (
        <div className="posts-container">
            <div className = "side-column">
                <div className = "side-column-header"> Posts </div>
                <div className = "posts-list">
                    {posts.map((post) => (
                        <div key={post.id} className="post-item"
                            onClick={() => setCurrentPostIndex(post.id)}
                        >
                            <h2 className="post-title">{post.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className = "main-section">
                    {posts[currentPostIndex].content}
            </div>
        </div>
    );
}

export default Posts;