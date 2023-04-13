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


let localNotes = JSON.parse(localStorage.getItem("notes"));
let notesText = [];
if (localStorage.getItem("notes")){
  notesText = localNotes;
}

modal.addEventListener("click", (e) => {
  e.stopPropagation();
  // Скрити модалку по кнопці відміни
  if (e.target.classList.contains("cancellation")) {
    hideModal();
  }
  // Добавити нотатку на сторінку по кнопці створити
  if (e.target.classList.contains("add__note")) {
    notesText.push({
      id: notesText.length + 1,
      title: getTitleValue.value,
      subtitle: getSubtitleValue.value,
    });
    localStorage.setItem("notes", JSON.stringify(notesText));
    localNotes = JSON.parse(localStorage.getItem("notes"));
    handleNoteCreation();
    
  }
});

// Видалення нотатки
wrapperNote.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete__note")) {
    e.target.closest(".note").remove();
  }
});


function handleNoteCreation() {
  hideModal();
  showNotes();
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
function showNotes(){
  if (localStorage.getItem("notes")) {
    while (wrapperNote.firstChild) {
      wrapperNote.removeChild(wrapperNote.firstChild);
    }
    localNotes.forEach((item) => {
      const note = `<div data-id="${item.id}" class="note w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2 relative">
  <div class="p-2 border rounded-lg">
  <div class="delete__note">X</div>
  <div class="title__note"><h2>${item.title}</h2></div>
  <div class="subtitle__note break-words">${item.subtitle}</div>
  </div>
  </div>`;
      wrapperNote.insertAdjacentHTML("beforeend", note);
    });
  }
}
showNotes()


