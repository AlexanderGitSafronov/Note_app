const modalOpen = document.querySelector(".add__task");
const wrapperModal = document.querySelector(".wrapper__modal");
const modal = document.querySelector(".modal");
const wrapperNote = document.querySelector(".wrapper__note");
let getTitleValue = document.querySelector(".title");
let getSubtitleValue = document.querySelector(".subtitle");

// Показуати модалку
modalOpen.addEventListener("click", () => {
  wrapperModal.classList.add("wrapper__modal_show");
});
// Скрити модалку
wrapperModal.addEventListener("click", () => {
  wrapperModal.classList.remove("wrapper__modal_show");
});

modal.addEventListener("click", (e) => {
  e.stopPropagation();
  // Скрити модалку по кнопці відміни
  if (e.target.classList.contains("cancellation")) {
    wrapperModal.classList.remove("wrapper__modal_show");
  }
  // Добавити нотатку на сторінку по кнопці створити
  if (e.target.classList.contains("add__note")) {
    wrapperModal.classList.remove("wrapper__modal_show");
    addNote();
    getTitleValue.value = "";
    getSubtitleValue.value = "";
  }
});

// Нотатка
function addNote() {
  const note = `<div class="note w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2 ">
  <div class="p-2 border rounded-lg">
    <div class="title__note"><h2>${getTitleValue.value}</h2></div>
    <div class="subtitle__note break-words">${getSubtitleValue.value}</div>
  </div>
</div>`;
  wrapperNote.insertAdjacentHTML("beforeend", note);
}
