

const followButtons = document.querySelectorAll('.follow-btn');

followButtons.forEach(button => {
  button.addEventListener('click', () => {
    const isFollowing = button.classList.contains('following');

    if (isFollowing) {
      button.classList.remove('following');
      button.textContent = '+ Follow';
      button.setAttribute('aria-pressed', 'false');
    } else {
      button.classList.add('following');
      button.textContent = '✓ Following';
      button.setAttribute('aria-pressed', 'true');
    }
  });
});

const friendPhotoTriggers = document.querySelectorAll(
  '.friend-photo-trigger'
);

const friendLightbox = document.querySelector('#friend-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const friendLightboxClose = document.querySelector('.lightbox-close');

let lastPhotoTrigger = null;
let previousBodyOverflow = '';

function openFriendLightbox(trigger) {
  lastPhotoTrigger = trigger;

  lightboxImage.src = trigger.dataset.fullImage;
  lightboxImage.alt =
    `${trigger.dataset.friendName}'s full profile picture`;

  previousBodyOverflow = document.body.style.overflow;

  friendLightbox.hidden = false;
  document.body.style.overflow = 'hidden';

  friendLightboxClose.focus();
}

function closeFriendLightbox() {
  friendLightbox.hidden = true;
  document.body.style.overflow = previousBodyOverflow;

  lightboxImage.removeAttribute('src');

  if (lastPhotoTrigger) {
    lastPhotoTrigger.focus();
  }
}

friendPhotoTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    openFriendLightbox(trigger);
  });
});

friendLightboxClose.addEventListener(
  'click',
  closeFriendLightbox
);

friendLightbox.addEventListener('click', event => {
  if (event.target === friendLightbox) {
    closeFriendLightbox();
  }
});

document.addEventListener('keydown', event => {
  if (friendLightbox.hidden) return;

  if (event.key === 'Escape') {
    closeFriendLightbox();
  }

  if (event.key === 'Tab') {
    event.preventDefault();
    friendLightboxClose.focus();
  }
});
