const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

scaleSmallerButton.onclick = () => {
  if (Number(scaleValue.value.replace(/%/, '')) > 25) {
    scaleValue.value = `${Number(scaleValue.value.replace(/% ?/, '')) - 25 }%`;
    imgUploadPreview.style.transform = `scale(${Number(scaleValue.value.replace(/%/, ''))}%)`;
  }
};

scaleBiggerButton.onclick = () => {
  if (Number(scaleValue.value.replace(/%/, '')) < 100) {
    scaleValue.value = `${Number(scaleValue.value.replace(/% ?/, '')) + 25 }%`;
    imgUploadPreview.style.transform = `scale(${Number(scaleValue.value.replace(/%/, ''))}%)`;
  }
};

const scaleReset = () => {
  imgUploadPreview.style.transform = 'scale(100%)';
};

export { scaleReset };
