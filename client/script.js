const getstarted = document.querySelector(".btn");
getstarted.addEventListener("click", () => {
  window.location.href = "./pages/genres";
});

const about = document.querySelector(".rightnav.about");
about.addEventListener("click", () => {
  window.location.href = "./pages/about";
});

const home = document.querySelector(".leftnav");
home.addEventListener("click", () => {
  window.location.href = "index.html";
});
