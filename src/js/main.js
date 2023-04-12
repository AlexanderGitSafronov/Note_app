const modalOpen = document.querySelector(".add__task");
const wrapperModal = document.querySelector(".wrapper__modal");
const modal = document.querySelector(".modal");
const wrapperNote = document.querySelector(".wrapper__note");
const getTitleValue = document.querySelector(".title");
const getSubtitleValue = document.querySelector(".subtitle");
const addNoteBtn = document.querySelector(".add__note");

// Показуати модалку
modalOpen.addEventListener("click", () => {
  wrapperModal.classList.add("wrapper__modal_show");
});
// Скрити модалку
wrapperModal.addEventListener("click", () => {
  hideModal();
});
// Скрити модалку
function hideModal() {
  wrapperModal.classList.remove("wrapper__modal_show");
}
// перевірка на пустий інпут
function validateCreateButton() {
  if (getTitleValue.value !== "" && getSubtitleValue.value !== "") {
    addNoteBtn.removeAttribute("disabled");
  } else {
    addNoteBtn.setAttribute("disabled", "disabled");
  }
}

getTitleValue.addEventListener("input", () => {
  validateCreateButton();
});
getSubtitleValue.addEventListener("input", () => {
  validateCreateButton();
});

function handleNoteCreation() {
  hideModal();
  addNote();
  getTitleValue.value = "";
  getSubtitleValue.value = "";
  validateCreateButton();
}

modal.addEventListener("click", (e) => {
  e.stopPropagation();
  // Скрити модалку по кнопці відміни
  if (e.target.classList.contains("cancellation")) {
    hideModal();
  }
  // Добавити нотатку на сторінку по кнопці створити
  if (e.target.classList.contains("add__note")) {
    handleNoteCreation();
  }
});

// Нотатка
function addNote() {
  const note = `<div class="note w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2 relative">
  <div class="p-2 border rounded-lg">
    <div class="delete__note">X</div>
    <div class="title__note"><h2>${getTitleValue.value}</h2></div>
    <div class="subtitle__note break-words">${getSubtitleValue.value}</div>
  </div>
</div>`;
  wrapperNote.insertAdjacentHTML("beforeend", note);
}
