import { useState } from 'react';
import { Link } from 'react-router-dom';
import deletePostHandler from '../../utils/handlers/deletePostHandler';
import LoaderComponent from '../loader/loader';
import Modals from '../modal/modal';

function PostItem(props) {
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const id = String(props.postId);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const editPostUrl = `/edit-post/${props.postId}`;
	var date = new Date(props.createdAt);

	var createdTime = date.toLocaleString();

	return (
		<div>
			<LoaderComponent spinnerLoading={spinnerLoading} />
			<div className="w3-container w3-card w3-white w3-round w3-margin">
				<br />
				<span id="postDate" className="w3-right w3-opacity">
					{createdTime}
				</span>
				<span id="postUsername">{props.name}</span>
				<br />
				<hr className="w3-clear" />
				<br />
				<p id="newPost">{props.description}</p>
				<hr className="w3-clear" />
				<Link
					id="editButton"
					to={editPostUrl}
					className="w3-button w3-theme-d1 w3-margin-bottom"
				>
					<i className="fa fa-edit"></i> Edit
				</Link>
				<Link
					to={''}
					onClick={handleShow}
					id="delete"
					className="w3-button w3-theme-d1 w3-margin-bottom"
				>
					<i className="fa fa-trash"></i> Delete
				</Link>
			</div>
			<Modals
				show={show}
				handleClose={handleClose}
				handler={() => {
					deletePostHandler(id, setSpinnerLoading, handleClose, props.getPost);
				}}
			/>
		</div>
	);
}

export default PostItem;
