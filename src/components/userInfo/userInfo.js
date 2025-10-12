import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import deleteAvatar from '../../utils/handlers/deleteAvatarHandler';
import getAvatar from '../../utils/handlers/getAvatarHandler';
import { getUserHandler } from '../../utils/handlers/getUserHandler';
import updateAvatarHandler from '../../utils/handlers/updateAvatarHandler';
import { defaultAvatar } from '../../utils/windowsHelper';
import defaultImage from '../layout/images/default-avatar.svg';
import LoaderComponent from '../loader/loader';
import ImageModals from '../modal/imageModal';

export function UserInfoLeftColumn(props) {
  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState(defaultImage);
  const [show, setShow] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    clearImageModal();
  };
  const clearImageModal = () => setIsFilePicked(false);

  const updatedAvatarState = () => getAvatar(setAvatar);

  useEffect(() => {
    getUserHandler(setUserData);
    updatedAvatarState();
  }, []);

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const updateImageHandler = () =>
    updateAvatarHandler(setSpinnerLoading, selectedFile, updatedAvatarState, handleClose);
  return (
    <div className="w3-col m3 sticky">
      <LoaderComponent spinnerLoading={spinnerLoading} />
      <div className="w3-card w3-round w3-white">
        <div className="w3-container">
          <Link id="userProfile" to="/update-user">
            <h4 className="w3-center">
              <br />
              <i className="fa fa-edit"></i> Edit Profile
            </h4>
          </Link>
          <p className="w3-center">
            <label htmlFor="image">
              <img id="profileImg" src={avatar} className="w3-circle" alt="Avatar" />
            </label>
          </p>
          <Link to={''} onClick={handleShow}>
            <h4 className="w3-center">Update Image</h4>
            <hr />
          </Link>
          <p id="profileName">
            <i className="fa fa-user fa-fw w3-margin-right w3-text-theme"></i>
            {userData.name}
          </p>
          <p id="profileAddress">
            <i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i>
            {userData.address}
          </p>
          <p id="profileDob">
            <i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i>
            {userData.dob}
          </p>
          <br />
        </div>
      </div>
      <br />
      {/* <!-- Interests --> */}
      <div className="w3-card w3-round w3-white w3-hide-small">
        <div className="w3-container">
          <br />
          <p>Hobbies:</p>
          <p id="profileHobbies">
            <span className="w3-tag w3-small w3-theme-d5">{props.userData.hobbies}</span>
          </p>
          <br />
        </div>
      </div>
      <br />
      {/* <!-- End Left Column --> */}
      <ImageModals
        show={show}
        handleClose={handleClose}
        deleteImageHandler={() => {
          deleteAvatar(defaultAvatar, handleClose, setSpinnerLoading);
        }}
        updateImageHandler={updateImageHandler}
        changeHandler={changeHandler}
        selectedFile={selectedFile}
        isFilePicked={isFilePicked}
        profileImageUrl={avatar}
        clear={clearImageModal}
      />
    </div>
  );
}

export function UserInfoRightColumn(props) {
  return (
    <div className="w3-col m2 w3-hide-small sticky">
      <div className="w3-card w3-round w3-white w3-center">
        <div className="w3-container">
          <br />
          <p>Events:</p>
          <p id="profileEvents">{props.userData.events}</p>
          <br />
        </div>
      </div>
      <br />
      {/* <!-- End Right Column --> */}
    </div>
  );
}
