import { useState } from 'react';
import { Link } from 'react-router-dom';
import deletePostHandler from '../../utils/handlers/deletePostHandler';
import LoaderComponent from '../loader/loader';
import Modals from '../modal/modal';

function PostItem(props) {
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const formatDate = (value) => {
		const date = value || 'YYYY-MM-DDT00:00:00.000Z';
		const timeOfDay = parseInt(date.substring(11, 13));
		const amPM = timeOfDay >= 12 ? 'pm' : 'am';
		let dates = `${date.substring(11, 16)} ${amPM} (${date.substring(0, 10)})`;
		return dates;
	};
	const id = String(props.postId);
	const date = formatDate(props.updatedAt);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const editPostUrl = `/edit-post/${props.postId}`;

	return (
		<div>
			<LoaderComponent spinnerLoading={spinnerLoading} />
			<div className="w3-container w3-card w3-white w3-round w3-margin">
				<br />
				<span id="postDate" className="w3-right w3-opacity">
					{date}
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
