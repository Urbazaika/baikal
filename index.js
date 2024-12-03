let scrollY = 0;
let lastY = scrollY;

let isScroll = false;

let carouselIt = document.querySelectorAll(".carousel-item");
let indicators = document.querySelector(".indicators");
let indicator = document.querySelectorAll(".indicator");
let indicatorFull = document.querySelector(".indicator-full");

const indicatorsShowUp = [{ transform: "translateY(-10px) translateY(0)" }];

window.onscroll = (e) => {
	lastY = scrollY;
	scrollY = window.pageYOffset;
	if (scrollY >= 300 && scrollY < 600) {
		carouselIt[0].classList.add("hide");
		carouselIt[1].classList.remove("hide");
		carouselIt[2].classList.add("hide");

		indicators.classList.remove("hide");
		indicators.classList.add("show");
		indicatorFull.style = `transform: translateX(-40px)`;

		spanize();
		return;
	}
	if (scrollY >= 600) {
		carouselIt[0].classList.add("hide");
		carouselIt[1].classList.add("hide");
		carouselIt[2].classList.remove("hide");

		indicatorFull.style = `transform: translateX(0)`;
		return;
	} else {
		carouselIt[0].classList.remove("hide");
		carouselIt[1].classList.add("hide");
		carouselIt[2].classList.add("hide");

		indicators.classList.add("hide");
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

const spanize = () => {
	var spanizeLetters = {
		settings: {
			letters: document.querySelectorAll(".js-spanize"),
		},
		init: function () {
			this.bindEvents();
		},
		bindEvents: function () {
			this.settings.letters.forEach((el) => {
				// var text = el.textContent.trim();
				// var spanizedText = Array.from(text)
				// 	.map((char) => {
				// 		return `<span>${char}</span>`;
				// 	})
				// 	.join("");
				// el.innerHTML = spanizedText;
				var text = el.textContent.trim();
				var spanizedText = "";
				for (let i = 0; i < text.length; i++) {
					spanizedText += `<span>${text[i]}</span>`;
					setTimeout(() => {
						el.innerHTML = spanizedText;
					}, 2000);
				}
			});
		},
	};

	spanizeLetters.init();
};
