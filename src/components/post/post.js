import { Link } from 'react-router-dom';

function Posts() {
	return (
		<div className="w3-col m7">
			<div className="w3-row-padding">
				<div className="w3-col m12">
					<div className="w3-card w3-round w3-white">
						<form
							action="{{ url_for('new_post', user=active_user.username) }}"
							method="post"
						>
							<div className="w3-container w3-padding">
								<p className="w3-opacity">
									<label htmlFor="postText">What's on your mind now?</label>
								</p>
								<p contenteditable="false" className=" w3-padding">
									<textarea
										id="postText"
										name="post"
										className="postText"
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
			<div className="w3-container w3-card w3-white w3-round w3-margin">
				<br />
				<span id="postDate" className="w3-right w3-opacity">
					{/* {{post.date}} */}
				</span>
				<span id="postUsername">{/* {{post.user_id}} */}</span>
				<br />
				<hr className="w3-clear" />
				<p id="newPost">{/* {{post.post}} */}</p>
				<Link
					id="editButton"
					to="{{ url_for('edit_post', post_id=post._id, user=post.user_id) }}"
					className="w3-button w3-theme-d1 w3-margin-bottom"
				>
					<i className="fa fa-edit"></i> Edit
				</Link>
				<Link
					onclick="document.getElementById('id01').style.display='block'"
					id="delete"
					className="w3-button w3-theme-d1 w3-margin-bottom"
				>
					<i className="fa fa-trash"></i> Delete
				</Link>
				<hr className="w3-clear" />
				{/* <!-- Modal--> */}
				<div id="id01" className="w3-modal">
					<div id="modal" className="w3-modal-content">
						<div className="w3-container">
							<span
								onclick="document.getElementById('id01').style.display='none'"
								className="w3-button w3-display-topright"
							>
								&times;
							</span>
							<p id="deleteWarning"> Are you sure you want to delete your post?</p>
							<p>
								{' '}
								<Link
									id="submitDelete"
									to=""
									type="button"
									className="w3-button w3-theme-d1 w3-margin-bottom"
								>
									Delete
								</Link>
							</p>
						</div>
					</div>
				</div>
				{/* {% endfor %} */}
			</div>
		</div>
	);
}

export default Posts;
