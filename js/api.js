import { addMiniatureFN } from './miniature.js';
import { serverError } from './utils.js';
import { filterDefaultButton, filterRandomButton, filterDiscussedButton, filterDefault, filterRandom, filterDiscussed } from './filters.js';


const getData = () => fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      response.json().then((picturesData) => {
        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
        const picturesArray = addMiniatureFN(picturesData);
        filterDefault(picturesArray);
        filterDefaultButton.addEventListener('click', () => {
          filterDefault(picturesArray);
        });
        filterRandomButton.addEventListener('click', () => {
          filterRandom(picturesArray);
        });
        filterDiscussedButton.addEventListener('click', () => {
          filterDiscussed(picturesArray);
        });
      });
    } else {
      throw new Error;
    }
  }).catch(serverError);

export { getData };
