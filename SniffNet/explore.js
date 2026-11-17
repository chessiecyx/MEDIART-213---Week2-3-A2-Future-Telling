

const exploreFeed = document.querySelector("#explore-feed");
const loadMoreButton = document.querySelector("#load-more");
const endMessage = document.querySelector("#feed-end-message");

const POSTS_PER_LOAD = 8;

const shuffledPosts = [...explorePosts];

for (let i = shuffledPosts.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));

  [shuffledPosts[i], shuffledPosts[j]] =
    [shuffledPosts[j], shuffledPosts[i]];
}

let nextPostIndex = 0;

function makeEl(tag, className = "", text = null) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== null) {
    element.textContent = text;
  }

  return element;
}

function createCommentsSection(post, commentCount) {

  const section = makeEl("div", "comments-section");

  const comments = post.comments.map(comment => ({
    ...comment
  }));

  let expanded = false;

  const commentList = makeEl("div", "comment-list");

  const expandButton = makeEl(
    "button",
    "expand-comments"
  );

  expandButton.type = "button";

  const form = makeEl("form", "comment-form");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Write a little comment...";
  input.maxLength = 250;
  input.required = true;
  input.setAttribute("aria-label", "Write a comment");

  const sendButton = makeEl(
    "button",
    "send-comment",
    "Post"
  );

  sendButton.type = "submit";

  form.append(input, sendButton);

  function renderComments() {
    commentList.replaceChildren();

    const visibleComments = expanded
      ? comments
      : comments.slice(0, 3);

    visibleComments.forEach(comment => {

      const item = makeEl("div", "comment-item");

      const avatar = document.createElement("img");
      avatar.className = "comment-avatar";
      avatar.src = comment.avatar ||
        "assets/avatar/Pineapple.jpg";
      avatar.alt = `${comment.author}'s avatar`;
      avatar.loading = "lazy";

      const body = makeEl("div", "comment-body");

      const author = makeEl(
        "strong",
        "comment-author",
        comment.author
      );

      const text = makeEl(
        "span",
        "comment-text",
        comment.content
      );

      body.append(author, text);
      item.append(avatar, body);
      commentList.append(item);
    });

    expandButton.hidden = comments.length <= 3;

    expandButton.textContent = expanded
      ? "Show less ↑"
      : `View all ${comments.length} comments ↓`;

    commentCount.textContent = `💬 ${comments.length}`;
  }

  expandButton.addEventListener("click", () => {
    expanded = !expanded;
    renderComments();
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    comments.push({
      author: "Pineapple 🍍",
      avatar: "assets/avatar/Pineapple.jpg",
      content: text
    });

    input.value = "";

    expanded = true;
    renderComments();
  });

  section.append(
    commentList,
    expandButton,
    form
  );

  renderComments();

  return section;
}

function createPostCard(post) {

  const card = makeEl("article", "explore-post");
  const fishSticker = document.createElement("img");

  fishSticker.src = "assets/stickers/Fish.png";
  fishSticker.className = "post-fish-sticker";
  fishSticker.alt = "";
  fishSticker.setAttribute("aria-hidden", "true");

  card.append(fishSticker);  

  const header = makeEl("div", "post-header");

  const avatar = document.createElement("img");
  avatar.src = post.avatar;
  avatar.alt = `${post.author}'s avatar`;
  avatar.className = "post-avatar";
  avatar.loading = "lazy";

  const authorInfo = makeEl("div", "author-info");

  const authorName = makeEl(
    "strong",
    "author-name",
    post.author
  );

  const displaySpecies =
    post.species === "Lizard"
      ? "Lizard"
      : post.species;

  const meta = makeEl(
    "div",
    "post-meta",
    `${displaySpecies} · ${post.flag} · ${post.date}`
  );

  authorInfo.append(authorName, meta);

  const badge = makeEl(
    "span",
    "post-badge",
    "✿"
  );

  header.append(avatar, authorInfo, badge);

  const content = makeEl(
    "p",
    "post-content",
    post.content
  );

  card.append(header, content);

  if (post.images && post.images.length > 0) {

    const gallery = makeEl(
      "div",
      post.images.length > 1
        ? "post-gallery two-images"
        : "post-gallery one-image"
    );

    post.images.forEach(imagePath => {

      const img = document.createElement("img");

      img.src = imagePath;
      img.alt = `Photo shared by ${post.author}`;
      img.loading = "lazy";

      gallery.append(img);
    });

    card.append(gallery);
  }

  const actions = makeEl("div", "post-actions");

  let liked = false;

  const likeButton = makeEl(
    "button",
    "post-action like-button",
    `♡ ${post.likes}`
  );

  likeButton.type = "button";
  likeButton.setAttribute("aria-pressed", "false");
  likeButton.setAttribute("aria-label", "Like post");

  likeButton.addEventListener("click", () => {
    liked = !liked;

    likeButton.textContent = liked
      ? `♥ ${post.likes + 1}`
      : `♡ ${post.likes}`;

    likeButton.classList.toggle("liked", liked);

    likeButton.setAttribute(
      "aria-pressed",
      String(liked)
    );
  });

  const commentCount = makeEl(
    "span",
    "post-action comment-count",
    `💬 ${post.comments.length}`
  );

  const shareDisplay = makeEl(
    "span",
    "post-action share-display",
    `↗ ${post.shares}`
  );

  actions.append(
    likeButton,
    commentCount,
    shareDisplay
  );

  const commentsSection = createCommentsSection(
    post,
    commentCount
  );

  card.append(actions, commentsSection);

  return card;
}

function loadMorePosts() {

  const nextBatch = shuffledPosts.slice(
    nextPostIndex,
    nextPostIndex + POSTS_PER_LOAD
  );

  nextBatch.forEach(post => {
    exploreFeed.append(createPostCard(post));
  });

  nextPostIndex += nextBatch.length;

  if (nextPostIndex >= shuffledPosts.length) {
    loadMoreButton.hidden = true;
    endMessage.hidden = false;
  }
}

loadMoreButton.addEventListener(
  "click",
  loadMorePosts
);

loadMorePosts();
