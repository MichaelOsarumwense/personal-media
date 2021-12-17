import { Modal, Button } from 'react-bootstrap';

function Modals(props) {
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to delete this item?</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
				<Button
					style={{ backgroundColor: '#b30f1f' }}
					variant="primary"
					onClick={props.handler}
					id="confirmDeleteRef"
				>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Modals;
