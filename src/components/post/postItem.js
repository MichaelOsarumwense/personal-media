import { Link } from 'react-router-dom';

function PostItem(props) {
	return (
		<div className="w3-container w3-card w3-white w3-round w3-margin">
			<br />
			<span id="postDate" className="w3-right w3-opacity">
				{props.createdAt}
			</span>
			<span id="postUsername">{props.owner}</span>
			<br />
			<hr className="w3-clear" />
			<p id="newPost">{props.description}</p>
			<Link id="editButton" to="" className="w3-button w3-theme-d1 w3-margin-bottom">
				<i className="fa fa-edit"></i> Edit
			</Link>
			<Link
				// onClick={}
				to=""
				id="delete"
				className="w3-button w3-theme-d1 w3-margin-bottom"
			>
				<i className="fa fa-trash"></i> Delete
			</Link>
			<hr className="w3-clear" />
		</div>
	);
}

export default PostItem;
