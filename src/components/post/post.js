import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loaderImage from '../layout/images/Blocks-1s-200px.gif';

function Posts(props) {
  const postRef = useRef();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  function postHandler(event) {
    event.preventDefault();

    const enteredPost = postRef.current.value;

    const userData = {
      description: enteredPost,
    };

    // Set isPlacingOrder to true when the button is clicked
    setIsPlacingOrder(true);

    props
      .createPost(userData, props.setSpinnerLoading, props.fetchPostHandler)
      .then((result) => {
        // If the post creation is successful, show a success toast
        toast.success('Post created successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        // If there's an error in post creation, show an error toast
        toast.error('Failed to create post. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .finally(() => {
        // Set isPlacingOrder back to false after the request completes
        setIsPlacingOrder(false);
      });
  }

  return (
    <div className="w3-col m7">
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <form onSubmit={postHandler}>
              <div className="w3-container w3-padding">
                <p className="w3-opacity">
                  <label htmlFor="postText">What's on your mind now?</label>
                </p>
                <p className="w3-padding">
                  <textarea
                    id="postText"
                    name="post"
                    className="postText"
                    ref={postRef}
                    required
                  ></textarea>
                </p>
                <button
                  id="submitPost"
                  type="submit"
                  className="w3-button w3-theme"
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? (
                    <img src={loaderImage} height="20" alt="Loading..." />
                  ) : (
                    <i className="fa fa-pencil"></i>
                  )}{' '}
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default Posts;
