

const posts = [
  {
    id: 'sister',
    date: '2060-11-15 20:46',

    text: "Does anyone know why my sister gets angry all the time? I just wanted to play with my little fish toy, but she got mad and wouldn't let me! I'm so upset!",

    image: 'assets/posts/Sister.jpg',
    likes: 38,
    shares: 4,

    comments: [
      {
        name: 'McDull',
        text: "If you want to play with your toys, then play by yourself! Of course I'd get mad when you wake me up! Who plays with a toy by throwing it at their sister?!"
      },
      {
        name: 'Pineapple',
        text: "You're just picking on me!",
        reply: true
      }
    ]
  },

  {
    id: 'going-out',
    date: '2060-11-12 17:20',

    text: "My humans took me outside today! I had to ride the elevator, which I HATE!! But wow, everything outside was so new and exciting!",

    image: 'assets/posts/Going_Out.jpg',
    likes: 62,
    shares: 9,

    comments: [
      {
        name: 'Ocean',
        text: "Outside is the worst!"
      }
    ]
  },

  {
    id: 'miss-you',
    date: '2060-11-09 22:08',

    text: "I haven't seen my humans come home in such a long, long time. I miss them so much...",

    likes: 91,
    shares: 12,

    comments: [
      {
        name: 'Lamy',
        text: "They're with me and Pico!"
      }
    ]
  },

  {
    id: 'new-treat',
    date: '2060-11-07 14:31',

    text: "I tried a new treat today!!! IT WAS SOOOOO GOOD!!!",

    likes: 47,
    shares: 5,

    comments: [
      {
        name: 'Lamy',
        text: "WHAT FLAVOR?! TELL ME!!!"
      }
    ]
  },

  {
    id: 'dog-downstairs',
    date: '2060-11-04 08:13',

    text: "Can the dog downstairs PLEASE stop barking?! He's going to wake up my sister, and when she gets grumpy, she always smacks me!",

    likes: 55,
    shares: 7,

    comments: [
      {
        name: 'McDull',
        text: "Then maybe YOU should stop waking me up too!"
      }
    ]
  },

  {
    id: 'broken-wand',
    date: '2060-11-01 19:52',

    text: "I really wanna play with my feather wand... But I broke it yesterday, and now I have nothing to play with. So sad...",

    likes: 73,
    shares: 11,

    comments: [
      {
        name: 'McDull',
        text: "I've told you to play with it gently. You just don't listen."
      }
    ]
  }
];

const feed = document.querySelector('#post-feed');

function loadStoredObject(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

const storedLikes = loadStoredObject(
  'sniffnet-pineapple-likes'
);

const storedShares = loadStoredObject(
  'sniffnet-pineapple-shares'
);

function makeElement(tag, className, content) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (content !== undefined) {
    element.textContent = content;
  }

  return element;
}

function renderComments(post, container) {
  container.replaceChildren();

  const allComments = post.comments;

  const visibleCount = 3;

  const commentList = makeElement(
    'div',
    'comment-list'
  );

  function showComments(expanded = false) {
    commentList.replaceChildren();

    const displayedComments = expanded
      ? allComments
      : allComments.slice(0, visibleCount);

    for (const comment of displayedComments) {
      const line = makeElement(
        'p',
        'comment' + (comment.reply ? ' reply' : '')
      );

      const name = makeElement(
        'strong',
        '',
        comment.name + ': '
      );

      line.append(
        name,
        document.createTextNode(comment.text)
      );

      commentList.append(line);
    }

    if (allComments.length > visibleCount) {
      toggleButton.textContent = expanded
        ? 'Show less ↑'
        : `View all ${allComments.length} comments ↓`;
    }
  }

  container.append(commentList);

  let expanded = false;

  const toggleButton = makeElement(
    'button',
    'show-more-comments',
    'View all comments ↓'
  );

  toggleButton.type = 'button';

  if (allComments.length > visibleCount) {
    container.append(toggleButton);

    toggleButton.addEventListener('click', () => {
      expanded = !expanded;
      showComments(expanded);
    });
  }

  showComments();
}

function updateCommentCount() {
  document
    .querySelectorAll('[data-comment-count]')
    .forEach(element => {

      const post = posts.find(
        p => p.id === element.dataset.commentCount
      );

      const count = post.comments.length;

      element.textContent = `💬 ${count}`;
    });
}

for (const post of posts) {
  const card = makeElement('article', 'post-item');
  card.id = `post-${post.id}`;
  const badmintonSticker = document.createElement('img');
  badmintonSticker.src = 'assets/stickers/Badminton.png';
  badmintonSticker.className = 'post-badminton-sticker';
  badmintonSticker.alt = '';
  badmintonSticker.setAttribute('aria-hidden', 'true');

  card.append(badmintonSticker);

  const header = makeElement('div', 'post-header');

  const avatar = document.createElement('img');
  avatar.src = 'assets/avatar/Pineapple.jpg';
  avatar.alt = '';
  avatar.className = 'post-mini-avatar';

  const byline = makeElement('div', 'post-byline');

  byline.append(
    makeElement('strong', '', 'Pineapple 🍍'),
    makeElement(
      'span',
      'post-time',
      post.date + ' · Nanjing'
    )
  );

  header.append(avatar, byline);

  card.append(
    header,
    makeElement('p', 'post-text', post.text)
  );

  if (post.image) {
    const img = document.createElement('img');

    img.src = post.image;
    img.alt = post.text;
    img.className = 'post-image';

    card.append(img);
  }

  const actions = makeElement('div', 'post-actions');

  const liked = !!storedLikes[post.id];

  const likeButton = makeElement(
    'button',
    'action-btn' + (liked ? ' is-active' : ''),
    `${liked ? '♥' : '♡'} ${post.likes + (liked ? 1 : 0)}`
  );

  likeButton.type = 'button';

  likeButton.setAttribute(
    'aria-pressed',
    String(liked)
  );

  likeButton.setAttribute(
    'aria-label',
    'Like post'
  );

  likeButton.addEventListener('click', () => {
    storedLikes[post.id] = !storedLikes[post.id];

    localStorage.setItem(
      'sniffnet-pineapple-likes',
      JSON.stringify(storedLikes)
    );

    likeButton.classList.toggle(
      'is-active',
      storedLikes[post.id]
    );

    likeButton.setAttribute(
      'aria-pressed',
      String(storedLikes[post.id])
    );

    likeButton.textContent =
      `${storedLikes[post.id] ? '♥' : '♡'} ${post.likes + (storedLikes[post.id] ? 1 : 0)}`;
  });   

  const commentCount = post.comments.length;

  const comments = makeElement(
    'button',
    'action-btn',
    `💬 ${commentCount}`
  );

  comments.type = 'button';
  comments.dataset.commentCount = post.id;
  comments.setAttribute('aria-label', 'Show comments');

  const share = makeElement(
    'button',
    'action-btn',
    `↗ ${post.shares + (storedShares[post.id] || 0)}`
  );

  share.type = 'button';
  share.setAttribute('aria-label', 'Share post');

  share.addEventListener('click', async () => {
    const url = new URL(
      `post.html?id=${encodeURIComponent(post.id)}`,
      location.href
    ).href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'SniffNet · Pineapple',
          url
        });
      } else if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(url);
      } else {
        window.prompt('Copy post link:', url);
        return;
      }

      storedShares[post.id] =
        (storedShares[post.id] || 0) + 1;

      localStorage.setItem(
        'sniffnet-pineapple-shares',
        JSON.stringify(storedShares)
      );

      share.textContent =
        `↗ ${post.shares + storedShares[post.id]}`;

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.warn(error);
      }
    }
  });

  actions.append(
    likeButton,
    comments,
    share
  );

  const commentArea = makeElement(
    'div',
    'post-comments'
  );

  commentArea.hidden = false;

  renderComments(post, commentArea);

  card.append(actions, commentArea);
  feed.append(card);
}

const isOnline = true;

const onlineDot = document.querySelector('#online-dot');

onlineDot.classList.toggle(
  'is-online',
  isOnline
);

onlineDot.setAttribute(
  'aria-label',
  isOnline ? 'Online' : 'Offline'
);

const avatarTrigger = document.querySelector(
  '.avatar-preview-trigger'
);

const avatarLightbox = document.querySelector(
  '#avatar-lightbox'
);

const lightboxClose = document.querySelector(
  '.lightbox-close'
);

function openAvatarLightbox() {
  avatarLightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeAvatarLightbox() {
  avatarLightbox.hidden = true;
  document.body.style.overflow = '';
  avatarTrigger.focus();
}

avatarTrigger.addEventListener(
  'click',
  openAvatarLightbox
);

lightboxClose.addEventListener(
  'click',
  closeAvatarLightbox
);

avatarLightbox.addEventListener('click', (event) => {
  if (event.target === avatarLightbox) {
    closeAvatarLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    !avatarLightbox.hidden
  ) {
    closeAvatarLightbox();
  }
});