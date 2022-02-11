import { Modal, Button } from 'react-bootstrap';

function ImageModals(props) {
	return (
		<Modal show={props.show}>
			<Modal.Header closeButton onClick={props.handleClose}>
				<Modal.Title>Update Profile Picture</Modal.Title>
			</Modal.Header>
			<Modal.Body id="imageModal">
				<label htmlFor="image">
					<input
						className="w3-center"
						type="file"
						name="image"
						id="image"
						onChange={props.changeHandler}
					/>
					{props.isFilePicked ? (
						<div id="modalDiv">
							<p id="fileName">Filename: {props.selectedFile.name}</p>
							<p>Filetype: {props.selectedFile.type}</p>
							<p>Size in KB: {props.selectedFile.size / 1000}</p>
							<p>
								lastModifiedDate:{' '}
								{props.selectedFile.lastModifiedDate.toLocaleDateString()}
							</p>
						</div>
					) : (
						<p id="imageModalText">click to upload new image </p>
					)}
				</label>
			</Modal.Body>
			{props.isFilePicked ? (
				<Modal.Footer>
					<Button variant="primary" onClick={props.updateImageHandler} id="updateRef">
						Update
					</Button>
					<Button
						variant="primary"
						onClick={props.clear}
						id="clearRef"
						style={{ backgroundColor: '#435761', borderColor: '#fff' }}
					>
						Clear
					</Button>
				</Modal.Footer>
			) : (
				<Button
					style={{ backgroundColor: '#b30f1f', borderColor: '#fff' }}
					onClick={props.deleteImageHandler}
					id="removeRef"
				>
					Remove Profile Photo
				</Button>
			)}
		</Modal>
	);
}

export default ImageModals;
