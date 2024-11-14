let scrollY = 0;
let lastY = scrollY;

let isScroll = false;

let carouselIt = document.querySelectorAll(".carousel-item");

window.onscroll = (e) => {
	lastY = scrollY;
	scrollY = window.pageYOffset;
	if (scrollY >= 500 && scrollY < 800) {
		carouselIt[0].classList.add("hide");
		carouselIt[1].classList.remove("hide");
		carouselIt[2].classList.add("hide");
		return;
	}
	if (scrollY >= 800) {
		carouselIt[0].classList.add("hide");
		carouselIt[1].classList.add("hide");
		carouselIt[2].classList.remove("hide");
		return;
	} else {
		carouselIt[0].classList.remove("hide");
		carouselIt[1].classList.add("hide");
		carouselIt[2].classList.add("hide");
	}
	// console.log(scrollY);
	// if (scrollY > 0 && !isScroll) {
	// 	window.scrollTo({
	// 		top: 870,
	// 		behavior: "smooth",
	// 	});
	// 	isScroll = true;
	// }
	// if (screenY == 0) {
	// 	isScroll = false;
	// }
};
