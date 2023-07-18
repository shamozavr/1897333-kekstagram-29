const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

scaleSmallerButton.onclick = () => {
  if (Number(scaleValue.value.replace(/%/, '')) > 25) {
    scaleValue.value = `${Number(scaleValue.value.replace(/% ?/, '')) - 25 }%`;
    imgUploadPreview.style.transform = `scale(${Number(scaleValue.value.replace(/%/, ''))}%)`;
    console.log(Number(scaleValue.value.replace(/%/, '')) / 100);
  }
};

scaleBiggerButton.onclick = () => {
  if (Number(scaleValue.value.replace(/%/, '')) < 100) {
    scaleValue.value = `${Number(scaleValue.value.replace(/% ?/, '')) + 25 }%`;
    imgUploadPreview.style.transform = `scale(${Number(scaleValue.value.replace(/%/, ''))}%)`;
    console.log(Number(scaleValue.value.replace(/%/, '')) / 100);
  }
};

const scaleReset = () => {
  imgUploadPreview.style.transform = 'scale(100%)';
};

export {scaleReset};
