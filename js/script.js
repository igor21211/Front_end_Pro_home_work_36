const API_END_POINT_POSTS = "https://jsonplaceholder.typicode.com/posts/";
const input = document.querySelector(".id__input");
const commentsDiv = document.querySelector(".comments__container");
const btn = document.querySelector(".btn__submit");
const root = document.querySelector(".root");

function getPostById(id, url) {
  fetch(url + id)
    .then((response) => response.json())
    .then((data) => renderPost(data))
    .catch((error) => {
      throw error;
    });
}

function getCommentByPostId(id, url) {
  fetch(`${url}${id}/comments`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((d) => renderComment(d));
    })
    .catch((error) => {
      throw error;
    });
}

function clear() {
  root.innerHTML = "";
}

function renderPost(data) {
  if (!data.title) return;
  const divElement = document.createElement("div");
  const btnShowComment = document.createElement("button");
  divElement.classList.add("main__container");
  btnShowComment.textContent = "Show Comment";
  divElement.innerHTML = `
  <h3>${data.title}</h3>
  <p>${data.body}</p>
    `;
  divElement.append(btnShowComment);
  root.append(divElement);
  btnShowComment.addEventListener("click", function () {
    getCommentByPostId(data.id, API_END_POINT_POSTS);
  });
}

btn.addEventListener("click", function () {
  clear();
  const id = input.value;
  if (id <= 100 && id >= 1) {
    getPostById(id, API_END_POINT_POSTS);
  } else {
    showErrorInfo();
  }
});

function showErrorInfo() {
  const pElement = document.createElement("p");
  pElement.textContent = "Error ! pls set numbers between 1 - 100";
  pElement.style.color = "red";
  pElement.style.textAlign = "center";
  root.append(pElement);
}

function renderComment(data) {
  const divElement = document.createElement("div");
  divElement.classList.add("main__container");
  divElement.innerHTML = `
  <h2>Comments</h2>
   <hr>
      <p> Name : ${data.name}</p>
      <p> Email : ${data.email}</p>
      <p>${data.body}</p>
  `;
  root.appendChild(divElement);
}
