/* Javascript Document */

$('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 200,
	gutter: 10,
	fitWidth: true,
});
// layout Masonry after each image loads
$('.grid').imagesLoaded().progress( function() {
  $('.grid').masonry('layout');
});

/*navbar colour change--------------------------------------------------------- */
	$(function() {
   $(window).scroll(function () {
      if ($(this).scrollTop() > 500) {
         $('nav').addClass('darken')
      }
      if ($(this).scrollTop() < 500) {
         $('nav').removeClass('darken')
      }
   });
});

/*page scroll------------------------------------------------------------------ */

jQuery(document).ready(function ($) {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 32
				}, 1000);
				return false;
			}
		}
	});
});

/* modal image ---------------------------------------------------------------- */
// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a cap
var img = document.getElementsByClassName('modalImage');
for (var i = 0; i < img.length; i++) {
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img[i].addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    })
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
