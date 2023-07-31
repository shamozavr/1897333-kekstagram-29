import { initUploadForm, setUploadFormSubmit, hideModal } from './form.js';
import { getData } from './api.js';
initUploadForm();
getData();
setUploadFormSubmit(hideModal);
