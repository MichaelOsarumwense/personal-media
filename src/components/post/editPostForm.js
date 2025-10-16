import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditPostForm(props) {
	const editPostRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const editedPost = editPostRef.current.value;

		const userData = {
			description: editedPost,
		};

		props
			.editedPost(userData)
			.then((result) => {
				// If the post editing is successful, show a success toast
				toast.success('Post edited successfully!', {
					position: toast.POSITION.TOP_CENTER,
				});
				// Call the function to return to the home page or post list page
				props.returnHome();
			})
			.catch((error) => {
				// If there's an error in post editing, show an error toast
				toast.error('Failed to edit post. Please try again.', {
					position: toast.POSITION.TOP_CENTER,
				});
			});
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
				style={{ backgroundColor: '#0d6efd', borderColor: '#fff' }}
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
