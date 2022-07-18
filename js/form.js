import {getStringLength, escapeButton} from './util.js';

const HASHTAGS = 5;
const DESCRIPTION = 140;

const re = /^#[A-Za-zA-Яф-яЁё0-9]{1,19}$/;
const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('#upload-file');
const closeEditForm = uploadForm.querySelector('#upload-cancel');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const hashtagsElem = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');

const resetForm = () => uploadForm.reset();

uploadImage.addEventListener('change', () => {
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => {
    if (escapeButton(evt)) {
      evt.preventDefault();
      editForm.classList.add('hidden');
    }
  });
});

function onPopupKeyDownEsc(evt) {
  if (escapeButton(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function closeUploadForm() {
  editForm.classList.add('hidden');
  document.body.classList.remove('madal-open');
  document.addEventListener('keydown', escapeButton);
}

closeEditForm.addEventListener('click', () => {
  closeUploadForm();
});

description.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPopupKeyDownEsc);
});

description.addEventListener('blur', () => {
  document.removeEventListener('keydown', onPopupKeyDownEsc);
});

hashtagsElem.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPopupKeyDownEsc);
});

hashtagsElem.addEventListener('blur', () => {
  document.removeEventListener('keydown', onPopupKeyDownEsc);
});

const checkDescription = () => getStringLength(description.value, DESCRIPTION);
const getHashtags = () => hashtagsElem.value.split('').filter(Boolean);
const checkHashtagSymbols = () => getHashtags().every((item) => re.test(item));

const checkUniquenessHashtags = () => {
  const hashtags = getHashtags().map((item) => item.toLowerCase());
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const checkHashtagsCount = () => getHashtags().length <= HASHTAGS;

const pristine = new Pristine(uploadForm, {
  classTo: 'text__field-wrapper',
  errorClass: 'text__field-wrapper--invalid',
  successClass: 'text__field-wrapper--valid',
  errorTextParent: 'text__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'text__error-message'
});

pristine.addValidator(hashtagsElem, checkHashtagSymbols, 'Хэш-тег должен начинаться с символа #, содержать только буквы и числа. Максимальная длина одного хэш-тега 20 символов.');
pristine.addValidator(hashtagsElem, checkUniquenessHashtags, 'Хэш-теги не должны повторяться. Хэштеги нечувствительны к регистру.');
pristine.addValidator(hashtagsElem, checkHashtagsCount, `Можно указать не более ${HASHTAGS} хэш-тегов.`);
pristine.addValidator(description, checkDescription, `Максимальная длина комментария ${DESCRIPTION} символов.`);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadForm.submit();
  }
});

