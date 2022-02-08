import { Modal, Button } from 'react-bootstrap';

function ImageModals(props) {
	return (
		<Modal
			show={props.show}
			selectedFile={props.selectedFile}
			isFilePicked={props.isFilePicked}
		>
			<Modal.Header closeButton onClick={props.handleClose}>
				<Modal.Title>Update Profile Picture</Modal.Title>
			</Modal.Header>
			<Modal.Body id="imageModal">
				<label for="image">
					<input
						className="w3-center"
						type="file"
						name="image"
						id="image"
						onChange={props.changeHandler}
					/>
					{props.isFilePicked ? (
						<div id="modalDiv">
							<p>Filename: {props.selectedFile.name}</p>
							<p>Filetype: {props.selectedFile.type}</p>
							<p>Size in KB: {props.selectedFile.size / 1000}</p>
							<p>
								lastModifiedDate:{' '}
								{props.selectedFile.lastModifiedDate.toLocaleDateString()}
							</p>
						</div>
					) : (
						<p id="pp">click to upload new image </p>
					)}
				</label>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={props.updateImageHandler} id="confirmDeleteRef">
					Update
				</Button>
				<Button
					style={{ backgroundColor: '#b30f1f' }}
					onClick={props.deleteImageHandler}
					id="confirmDeleteRef"
				>
					Remove Profile Photo
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ImageModals;
