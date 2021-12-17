import { useState } from 'react';
import HomePageLayout from '../components/layout/homeLayout';
import { useHistory, useParams } from 'react-router-dom';
import { SinglePostHandler } from '../utils/handlers/editPostHandler';
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

	SinglePostHandler(postId, setDescription);

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
				history.replace('/');
				setSpinnerLoading(false);
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
