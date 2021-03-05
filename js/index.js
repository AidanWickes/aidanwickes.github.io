let mainNav = document.getElementById("js-menu");
let navIcon = document.getElementById("nav-icon");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
  if (navIcon.className == "fas fa-bars") {
    navIcon.classList.remove("fa-bars");
    navIcon.classList.add("fa-times");
  } else {
    navIcon.classList.remove("fa-times");
    navIcon.classList.add("fa-bars");
  }
});
