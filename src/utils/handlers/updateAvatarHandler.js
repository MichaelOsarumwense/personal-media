import { emptyDiv, getToken, hideElement, populateDiv } from '../windowsHelper';
const url = process.env.REACT_APP_URL;

const imageModalTextID = 'modalDiv';
const updateImageButton = 'updateRef';

const updateAvatarHandler = async (
	setSpinnerLoading,
	selectedFile,
	updatedAvatarState,
	handleClose
) => {
	try {
		setSpinnerLoading(true);
		const formData = new FormData();

		formData.append('avatar', selectedFile);

		const result = await fetch(`${url}/users/me/avatar`, {
			headers: {
				Authorization: getToken(),
			},
			method: 'POST',
			body: formData,
		});

		if (!result.ok) {
			const response = await result.json();
			emptyDiv(imageModalTextID);
			hideElement(updateImageButton);
			await setSpinnerLoading(false);
			await populateDiv(imageModalTextID, response.error);
			return Promise.reject(response);
		} else {
			await updatedAvatarState();
			await handleClose();
			await setSpinnerLoading(false);
		}
	} catch (error) {
		setSpinnerLoading(false);
		console.log(error);
	}
};

export default updateAvatarHandler;
