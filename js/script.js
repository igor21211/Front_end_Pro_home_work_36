const API_END_POINT_POSTS = "https://jsonplaceholder.typicode.com/posts/";
const input = document.querySelector(".id__input");
const btn = document.querySelector(".btn__submit");
const root = document.querySelector(".root");

function getDataById(id, url) {
  fetch(API_END_POINT + id);
  then((response) => response.json())
    .then((data) => renderPost(data))
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
  btnShowComment.addEventListener("click", function () {});
}

btn.addEventListener("click", function () {
  clear();
  const id = input.value;
  if (id < 100 && id >= 1) {
    getDataById(id, API_END_POINT_POSTS);
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
