import { Modal, Button, ButtonGroup } from 'react-bootstrap';

function ImageModals(props) {
  const downloadProfileImage = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    // Set the href attribute to the URL of the profile image
    link.href = props.profileImageUrl;

    // Set the download attribute with the desired filename
    link.download = props.selectedFile.name || 'profile-Image';
    // Append the anchor element to the document body
    document.body.appendChild(link);
    // Click the anchor element to trigger the download
    link.click();
    // Remove the anchor element from the document body
    document.body.removeChild(link);
  };

  const disableDownloadButton = () => {
    let url = props.profileImageUrl.toString();
    if (url.startsWith('blob')) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Modal show={props.show}>
      <Modal.Header closeButton onClick={props.handleClose}>
        <Modal.Title>Update Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body id="imageModal">
        <label htmlFor="image">
          <input
            className="w3-center"
            type="file"
            name="image"
            id="image"
            onChange={props.changeHandler}
          />
          {props.isFilePicked ? (
            <div id="modalDiv">
              <p id="fileName">Filename: {props.selectedFile.name}</p>
              <p>Filetype: {props.selectedFile.type}</p>
              <p>Size in KB: {props.selectedFile.size / 1000}</p>
              <p>lastModifiedDate: {props.selectedFile.lastModifiedDate.toLocaleDateString()}</p>
            </div>
          ) : (
            <p id="imageModalText">click to upload new image </p>
          )}
        </label>
      </Modal.Body>
      {props.isFilePicked ? (
        <Modal.Footer>
          <Button variant="primary" onClick={props.updateImageHandler} id="updateRef">
            Update
          </Button>
          <Button
            variant="primary"
            onClick={props.clear}
            id="clearRef"
            style={{ backgroundColor: '#435761', borderColor: '#fff' }}
          >
            Clear
          </Button>
        </Modal.Footer>
      ) : (
        <ButtonGroup aria-label="Profile Image Actions">
          <Button
            variant="primary"
            onClick={downloadProfileImage}
            disabled={disableDownloadButton()}
          >
            Download Profile Image
          </Button>
          <Button
            style={{ backgroundColor: '#b30f1f', borderColor: '#fff' }}
            onClick={props.deleteImageHandler}
            id="removeRef"
          >
            Remove Profile Photo
          </Button>
        </ButtonGroup>
      )}
    </Modal>
  );
}

export default ImageModals;
