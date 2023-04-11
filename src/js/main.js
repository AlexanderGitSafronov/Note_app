const modalOpen = document.querySelector(".add__task");
const wrapperModal = document.querySelector(".wrapper__modal");
const modal = document.querySelector(".modal");
const wrapperNote = document.querySelector(".wrapper__note");
let getTitleValue = document.querySelector(".title");
let getSubtitleValue = document.querySelector(".subtitle");
const addNoteBtn = document.querySelector(".add__note");

// Показуати модалку
modalOpen.addEventListener("click", () => {
  wrapperModal.classList.add("wrapper__modal_show");
});
// Скрити модалку
wrapperModal.addEventListener("click", () => {
  wrapperModal.classList.remove("wrapper__modal_show");
});

// перевірка на пустий інпут
function removeDisabledAddNote() {
  if (getTitleValue.value !== "" && getSubtitleValue.value !== "") {
    addNoteBtn.removeAttribute("disabled");
    addNoteBtn.style.background = "rgb(59 130 246)";
  } else {
    addNoteBtn.setAttribute("disabled", "disabled");
    addNoteBtn.style.background = "rgb(156 163 175)";
  }
}

getTitleValue.addEventListener("input", () => {
  removeDisabledAddNote();
});
getSubtitleValue.addEventListener("input", () => {
  removeDisabledAddNote();
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
    removeDisabledAddNote();
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
