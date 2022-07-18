import {openModal, closeModal} from './pop-up.js';

const AVATAR_HEIGHT = 35;
const AVATAR_WIDTH = 35;

const fullSizePic = document.querySelector('.big-picture');
const closeFullSizePic = fullSizePic.querySelector('.big-picture__cancel');
const commentEl = fullSizePic.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');

const commentCount = fullSizePic.querySelector('.social__comment-count');
commentCount.classList.add('hidden');
const commentLoaderEl = document.querySelector('.comments-loader');
commentLoaderEl.classList.add('hidden');

const createCommentItem = ({avatar, name, message}) => {
  const commentItem = commentEl.cloneNode(true);
  const userPicture = document.createElement('img');
  userPicture.classList.add('.social__picture');
  userPicture.src = avatar;
  userPicture.alt = name;
  userPicture.height = AVATAR_HEIGHT;
  userPicture.width = AVATAR_WIDTH;
  userPicture.textContent = message;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;
  commentItem.append(commentText);

  return commentItem;
};

const clearComments = () => {
  commentsList.innerHTML = '';
};

const displayComments = (comments) => {
  const commentListFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    commentListFragment.append(createCommentItem({avatar, name, message}));
  });
  clearComments();
  commentsList.append(commentListFragment);
};

const displayPost = ({url, likes, comments, description}) => {
  fullSizePic.querySelector('.big-picture__img img').src = url;
  fullSizePic.querySelector('.likes-count').textContent = likes;
  fullSizePic.querySelector('.comments-count').textContent = comments.length;
  fullSizePic.querySelector('.social__caption').textContent = description;
  displayComments(comments);
  openModal(fullSizePic);

  commentCount.classList.add('hidden');
  commentLoaderEl.classList.add('hidden');
  document.body.classList.add('modal-open');

};

closeFullSizePic.addEventListener('click', () => {
  closeModal();
  commentCount.classList.remove('hidden');
  commentLoaderEl.classList.remove('hidden');
  document.body.classList.remove('modal-open');
});

export {fullSizePic, displayPost};
