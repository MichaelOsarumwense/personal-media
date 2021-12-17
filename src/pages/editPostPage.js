import { Form, Button } from 'react-bootstrap';
import HomePageLayout from '../components/layout/homeLayout';
import { useHistory, useParams } from 'react-router-dom';
import { deleteToken, getToken, pageReload, setToken } from '../utils/windowsHelper';

function EditPostPage() {
	const url = process.env.REACT_APP_URL;
	const history = useHistory();
	const returnHome = () => {
		history.replace('/');
		deleteToken('description');
		pageReload();
	};
	const { postId } = useParams();

	async function SinglePostHandler() {
		try {
			const getPost = await fetch(`${url}/posts/${postId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getToken(),
				},
			});

			if (!getPost.ok) {
				return getPost.text().then((result) => Promise.reject(result));
			} else {
				const response = await getPost.json();
				setToken('description', response.description);
			}
		} catch (e) {
			console.log(e);
		}
	}

	SinglePostHandler();

	return (
		<HomePageLayout>
			<Form>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Update post</Form.Label>
					<Form.Control
						defaultValue={getToken('description')}
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
