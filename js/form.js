import {escapeButton} from './util.js';

const DESCRIPTION = 20;

const re = /^#[A-Za-zA-Яф-яЁё0-9]{1,19}$/;

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('#upload-file');
const closeEditForm = uploadForm.querySelector('#upload-cancel');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const hashtagsElem = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');

const MessageErrors = {
  INVALID_HASHTAGS: 'Хэш-тег должен начинаться с символа #, содержать только буквы и числа. Максимальная длина одного хэш-тега 20 символов.',
  NOT_UNIQUE_HASHTAGS: 'Один и тот же хэш-тег не может быть использован дважды.',
  INVALID_COUNT_HASHTAGS: 'Нельзя указать больше пяти хэш-тегов.'
};

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
  document.body.classList.remove('modal-open');
  document.addEventListener('keydown', escapeButton);
  uploadImage.value = '';
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

// const checkDescription = () => getStringLength(description.value, DESCRIPTION);
const validateHashtags = (value) => {
  const getHashtags = value.split('').filter(Boolean);
  return getHashtags.every((item) => re.test(item));
};

const checkUniquenessHashtags = (value) => {
  // const hashtags = getHashtags().map((item) => item.toLowerCase());
  // const uniqueHashtags = new Set(hashtags);
  // return hashtags.length === uniqueHashtags.size;
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.length === 0 || hashTags.length === (new Set(hashTags)).size;
};

const checkHashtagsCount = (value) => {
  const hashTags = value.toLowerCase().trim().split(' ');
  return hashTags.length <= DESCRIPTION;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'text__field-wrapper',
  errorClass: 'text__field-wrapper--invalid',
  successClass: 'text__field-wrapper--valid',
  errorTextParent: 'text__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'text__error-message'
});

pristine.addValidator(hashtagsElem, validateHashtags, MessageErrors.INVALID_HASHTAGS);
pristine.addValidator(hashtagsElem, checkUniquenessHashtags, MessageErrors.NOT_UNIQUE_HASHTAGS);
pristine.addValidator(hashtagsElem, checkHashtagsCount, MessageErrors.INVALID_COUNT_HASHTAGS);

const inputEcsKeydown = (evt) => {
  if (escapeButton(evt)) {
    evt.stopPropagation();
  }
};

hashtagsElem.addEventListener('keydown', inputEcsKeydown);
description.addEventListener('keydown', inputEcsKeydown);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadForm.submit();
  }
});

