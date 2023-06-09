const getstarted = document.querySelector(".btn");
getstarted.addEventListener("click", () => {
  window.location.href = "start.html";
});

const about = document.querySelector(".rightnav.about");
about.addEventListener("click", () => {
  window.location.href = "about.html";
});

const home = document.querySelector(".leftnav");
home.addEventListener("click", () => {
  window.location.href = "index.html";
});
