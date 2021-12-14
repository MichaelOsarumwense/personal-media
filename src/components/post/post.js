import { useRef } from 'react';

function Posts(props) {
	const postRef = useRef();

	function postHandler(event) {
		event.preventDefault();

		const enteredPost = postRef.current.value;

		const userData = {
			description: enteredPost,
		};

		props.createPost(userData);
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
								<p contentEditable="false" className=" w3-padding">
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
								>
									<i className="fa fa-pencil"></i> Post
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
