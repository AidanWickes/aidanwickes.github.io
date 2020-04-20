/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function responsiveNav() {
  if (navbar.className === "navbar" || navbar.className === "navbar sticky") {
    navbar.classList.add("responsive");
    document.getElementById("icon").className = "fa fa-times";
  } else {
    navbar.classList.remove("responsive");
    document.getElementById("icon").className = "fa fa-bars";
  }
}
