import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import HomePageLayout from '../components/layout/homeLayout';
import { useHistory, useParams } from 'react-router-dom';
import { deleteToken, getToken, pageReload } from '../utils/windowsHelper';
import { SinglePostHandler } from '../utils/handlers/editPostHandler';

function EditPostPage() {
	const url = process.env.REACT_APP_URL;
	const history = useHistory();

	const [description, setDescription] = useState('');

	const returnHome = () => {
		history.replace('/');
	};
	const { postId } = useParams();
	useEffect(() => {
		SinglePostHandler(postId, setDescription);
	}, []);

	return (
		<HomePageLayout>
			<Form>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Update post</Form.Label>
					<Form.Control
						defaultValue={description}
						as="textarea"
						style={{ height: '150px' }}
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
						returnHome();
					}}
					variant="primary"
					type="button"
					style={{ backgroundColor: '#435761', borderColor: '#fff' }}
				>
					Cancel
				</Button>
			</Form>
		</HomePageLayout>
	);
}

export default EditPostPage;
