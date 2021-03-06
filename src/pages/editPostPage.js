import { useEffect, useState } from 'react';
import HomePageLayout from '../components/layout/homeLayout';
import { useHistory, useParams } from 'react-router-dom';
import { EditPostHandler } from '../utils/handlers/editPostHandler';
import LoaderComponent from '../components/loader/loader';
import EditPostForm from '../components/post/editPostForm';
import { getToken } from '../utils/windowsHelper';

function EditPostPage() {
	const history = useHistory();
	const [descriptions, setDescription] = useState('');
	const [spinnerLoading, setSpinnerLoading] = useState(false);

	const returnHome = () => {
		history.replace('/');
	};
	const { postId } = useParams();

	useEffect(() => {
		EditPostHandler(postId, setDescription, setSpinnerLoading);
		// eslint-disable-next-line
	}, []);

	const url = process.env.REACT_APP_URL;

	async function editPostHandler(data) {
		try {
			setSpinnerLoading(true);
			const editPost = await fetch(`${url}/posts/${postId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getToken(),
				},
				body: JSON.stringify(data),
			});

			if (!editPost.ok) {
				setSpinnerLoading(false);
				return editPost.text().then((result) => Promise.reject(result));
			} else {
				await setSpinnerLoading(false);
				await history.replace('/');
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<HomePageLayout>
			<LoaderComponent spinnerLoading={spinnerLoading} />
			<EditPostForm
				editedPost={editPostHandler}
				descriptions={descriptions}
				returnHome={returnHome}
			/>
		</HomePageLayout>
	);
}

export default EditPostPage;
