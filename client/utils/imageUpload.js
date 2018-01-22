import storage from '../config/firebase';

function imageUpload(imageInput, imagePath, successCallBack) {
  // check if the imageInput is empty
  const isDisabled = imageInput.files.length > 0;
  // disable the input if its not
  imageInput.disabled = isDisabled;
  const image = imageInput.files[0];
  // create a storage reference ising the current time as filename
  const storageRef = storage.ref(imagePath);
  // upload the file
  const uploadTask = storageRef.put(image);

  uploadTask.on(
    'state_changed',
    // image upload progress
    () => {
      this.setState({ imageUploadProgress: 'started' });
    },
    // image upload failure
    () => {
      this.setState({ imageUploadProgress: 'failed' });
      // re-enable the upload button
      imageInput.disabled = false;
      // update state to remove warning message
      setTimeout(() => { this.setState({ imageUploadProgress: 'pending' }); }, 5000);
    },
    // image upload success
    () => successCallBack(uploadTask.snapshot.downloadURL)
  );
}

export default imageUpload;
