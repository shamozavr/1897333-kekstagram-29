import { initUploadForm, setUploadFormSubmit, hidemodal } from './form.js';
import { getData } from './api.js';
initUploadForm();
getData();
setUploadFormSubmit(hidemodal);
