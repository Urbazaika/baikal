let scrollY = 0;
let lastY = scrollY;

let isScroll = false;

let carouselIt = document.querySelectorAll(".carousel-item");
let indicators = document.querySelector(".indicators");
let indicator = document.querySelectorAll(".indicator");

window.onscroll = (e) => {
	lastY = scrollY;
	scrollY = window.pageYOffset;
	if (scrollY >= 300 && scrollY < 500) {
		carouselIt[0].classList.add("hide");
		carouselIt[1].classList.remove("hide");
		carouselIt[2].classList.add("hide");

		indicators.classList.remove("hide");
		indicator[0].classList.add("full")
		indicator[1].classList.remove("full")
		return;
	}
	if (scrollY >= 500) {
		carouselIt[0].classList.add("hide");
		carouselIt[1].classList.add("hide");
		carouselIt[2].classList.remove("hide");

		indicator[0].classList.remove("full")
		indicator[1].classList.add("full")
		return;
	} else {
		carouselIt[0].classList.remove("hide");
		carouselIt[1].classList.add("hide");
		carouselIt[2].classList.add("hide");

		indicators.classList.add("hide");
		indicator[0].classList.remove("full")
		indicator[1].classList.remove("full")
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
