import {openModal} from './pop-up.js';
import {displayPost} from './fullsize-picture.js';

const displayPosts = (posts) => {

  const picturesBox = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();
  posts.forEach(({url, comments, likes, description}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.addEventListener('click', () => {
      openModal();
      displayPost({url, comments, likes, description});
    });
    picturesFragment.append(pictureElement);
  });
  picturesBox.append(picturesFragment);
};
export {displayPosts};
