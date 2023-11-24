const liElements = document.querySelectorAll("li");
let selected_genres = {};
liElements.forEach((li) => {
  li.addEventListener("click", () => {
    if (Object.keys(selected_genres).length == 6) {
      const warning = document.querySelector(".warning");
      warning.innerHTML = "**Warning: you cannot add more than 6 categories!";
    } else {
      const aText = li.querySelector("a").textContent;
      if (!(aText in selected_genres)) {
        selected_genres[aText] = 1;
        const warning = document.querySelector(".warning");
        warning.innerHTML = "";
        li.style.borderColor = "#df1024";
        li.style.background = "#df1024";
      } else {
        const warning = document.querySelector(".warning");
        warning.innerHTML = "";
        li.style.background = "transparent";
        li.style.borderColor = "white";
        delete selected_genres[aText];
      }
    }
  });
});
const clearall = document.querySelector(".btn1");
clearall.addEventListener("click", () => {
  if (Object.keys(selected_genres).length == 0) {
    const warning = document.querySelector(".warning");
    warning.innerHTML = "**Warning: Nothing to clear!";
  } else {
    const warning = document.querySelector(".warning");
    warning.innerHTML = "";
    liElements.forEach((li) => {
      const aText = li.querySelector("a").textContent;
      if (aText in selected_genres) {
        li.style.borderColor = "white";
        li.style.background = "transparent";
      }
    });
    selected_genres = {};
  }
});

const home = document.querySelector(".leftnav");
home.addEventListener("click", () => {
  window.location.href = "../../";
});

const about = document.querySelector(".rightnav.about");
about.addEventListener("click", () => {
  window.location.href = "../about";
});

const gobtn = document.querySelector(".btn");
gobtn.addEventListener("click", () => {
  if (Object.keys(selected_genres).length == 0) {
    const warning = document.querySelector(".warning");
    warning.innerHTML = "**Warning: You must select atleast one genre!";
  } else {
    localStorage.setItem("selected_genres", JSON.stringify(selected_genres));
    window.location.href = "../result";
  }
});

const customgenres = document.querySelector(".btn2");

customgenres.addEventListener("click", () => {
  const textbox = document.querySelector(".textbox");
  textbox.style.display = "block";
});

const cancelbtn = document.querySelector(".btn4");

cancelbtn.addEventListener("click", () => {
  const textbox = document.querySelector(".textbox");
  textbox.style.display = "none";
  const cgenre = document.querySelector(".textfield");
  cgenre.value = "";
});

const submit = document.querySelector(".btn3");

submit.addEventListener("click", () => {
  const cgenre = document.querySelector(".textfield");
  const warning1 = document.querySelector(".warning1");
  if (cgenre.value == "") {
    warning1.style.display = "block";
  } else {
    warning1.style.display = "none";
    const newLi = document.createElement("li");
    const newLink = document.createElement("a");
    newLink.href = "#";
    newLink.textContent = cgenre.value;
    newLi.appendChild(newLink);
    newLi.style.borderColor = "#df1024";
    newLi.style.background = "#df1024";
    const orilist = document.querySelector(".slide");
    orilist.appendChild(newLi);
    const ulHeight = orilist.scrollHeight;
    orilist.style.height = ulHeight + "1px";
    selected_genres[cgenre.value] = 1;
    const textbox = document.querySelector(".textbox");
    textbox.style.display = "none";
    cgenre.value = "";
  }
});
