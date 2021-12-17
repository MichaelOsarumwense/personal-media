import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

function EditPostForm(props) {
	const editPostRef = useRef();
	function submitHandler(event) {
		event.preventDefault();

		const editedPost = editPostRef.current.value;

		const userData = {
			description: editedPost,
		};

		props.editedPost(userData);
	}

	return (
		<Form onSubmit={submitHandler}>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>Update post</Form.Label>
				<Form.Control
					defaultValue={props.descriptions}
					as="textarea"
					style={{ height: '150px' }}
					ref={editPostRef}
				/>
			</Form.Group>
			<Button
				variant="primary"
				type="submit"
				style={{ backgroundColor: '#435761', borderColor: '#fff' }}
			>
				Submit
			</Button>
			<Button
				onClick={() => {
					props.returnHome();
				}}
				variant="primary"
				type="button"
				style={{ backgroundColor: '#435761', borderColor: '#fff' }}
			>
				Cancel
			</Button>
		</Form>
	);
}

export default EditPostForm;
