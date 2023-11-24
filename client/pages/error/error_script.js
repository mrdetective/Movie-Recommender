const home = document.querySelector(".leftnav");
home.addEventListener("click", () => {
  window.location.href = "../../";
});

const about = document.querySelector(".rightnav");
about.addEventListener("click", () => {
  window.location.href = "../pages/about";
});
