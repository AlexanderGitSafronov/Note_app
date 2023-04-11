const modalOpen = document.querySelector(".add__task");
const wrapperModal = document.querySelector(".wrapper__modal");
const modal = document.querySelector(".modal");

modalOpen.addEventListener("click", () => {
  wrapperModal.classList.add("wrapper__modal_show");
});

wrapperModal.addEventListener("click", (e) => {
  wrapperModal.classList.remove("wrapper__modal_show");
});
modal.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.classList.contains("cancellation")) {
    wrapperModal.classList.remove("wrapper__modal_show");
  }
});
