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

getTitleValue.addEventListener("input", () => {
  validateCreateButton();
});
getSubtitleValue.addEventListener("input", () => {
  validateCreateButton();
});

let localNotes = JSON.parse(localStorage.getItem("notes")) || [];

modal.addEventListener("click", (e) => {
  e.stopPropagation();
  // Скрити модалку по кнопці відміни
  if (e.target.classList.contains("cancellation")) {
    hideModal();
  }
  // Добавити нотатку на сторінку по кнопці створити
  if (e.target.classList.contains("add__note")) {
    handleNoteCreation(
      localNotes.length + 1,
      getTitleValue.value,
      getSubtitleValue.value
    );
  }
});

// Видалення нотатки
wrapperNote.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete__note")) {
    e.target.closest(".note").remove();
  }
});

// Добавляєм нотатку
function pushNote(id, title, subtitle) {
  wrapperNote.innerHTML += getNoteHTML(id,title,subtitle);
}

function handleNoteCreation(id, title, subtitle) {
  localNotes.push({
    id: localNotes.length + 1,
    title: getTitleValue.value,
    subtitle: getSubtitleValue.value,
  });
  localStorage.setItem("notes", JSON.stringify(localNotes));
  hideModal();
  pushNote(id, title, subtitle);
  getTitleValue.value = "";
  getSubtitleValue.value = "";
  validateCreateButton();
}
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
// Вивод нотаток на сторінку
function showNotes() {
  if (localNotes) {
    const notes = localNotes
      .map((item) => getNoteHTML(item.id,item.title,item.subtitle))
      .join("");
    wrapperNote.insertAdjacentHTML("beforeend", notes);
  }
}
showNotes();

// Нотатка HTML
function getNoteHTML(id,title,subtitle) {
  return `<div data-id="${id}" class="note w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2 relative">
  <div class="p-2 border rounded-lg">
  <div class="delete__note">X</div>
  <div class="title__note"><h2>${title}</h2></div>
  <div class="subtitle__note break-words">${subtitle}</div>
  </div>
  </div>`
}